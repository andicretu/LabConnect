import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const baseUrl = process.env.LAB_API_BASE_URL;
const apiKey = process.env.LAB_API_KEY;

if (!baseUrl || !apiKey) {
  throw new Error('Missing LAB_API_BASE_URL or LAB_API_KEY in environment');
}

/**
 * Fetche sample status from the lab API.
 * @param clientCode
 * @param sampleId 
 * @returns The parsed JSON response from the lab
 */
export async function getSampleStatus(
  clientCode: string,
  sampleId: string
): Promise<any> {
  const url = `${baseUrl}/Request/SampleStatus/${clientCode}/${sampleId}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` }
  });
  if (!res.ok) {
    throw new Error(`Lab API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/**
 * Save an object as a JSON file in the data/ folder and returns the filepath.
 * @param clientCode - as part of the filename
 * @param sampleId  - as part of the filename
 * @param data      - object to serialize
 */
export function saveJsonToFile(
  clientCode: string,
  sampleId: string,
  data: unknown
): string {
  const dir = path.resolve(process.cwd(), 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${clientCode}_${sampleId}_${timestamp}.json`;
  const filepath = path.join(dir, filename);

  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  return filepath;
}
