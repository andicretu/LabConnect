import express from 'express';
import type { Request, Response } from 'express';
import { getSampleStatus, saveJsonToFile } from '../services/labService';

const router = express.Router();

// Sample status endpoint
// GET /api/sample-status/:clientCode/:sampleId
router.get('/sample-status/:clientCode/:sampleId', async (req: Request, res: Response) => {
  const { clientCode, sampleId } = req.params;
  if (!clientCode || !sampleId) {
    return res.status(400).json({ success: false, error: 'clientCode and sampleId are required' });
  }
  try {
    const data = await getSampleStatus(clientCode, sampleId);
    const filePath = saveJsonToFile(clientCode, sampleId, data);
    res.json({ success: true, filename: filePath });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
