import dotenv from 'dotenv';
import express from 'express';
import type { Request, Response } from 'express';
import routes from './routes';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
    res.json({status: 'ok'});
});

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});