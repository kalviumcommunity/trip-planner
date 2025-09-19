import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const PLANS_FILE = path.join(DATA_DIR, 'plans.json');

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(PLANS_FILE);
  } catch (_) {
    await fs.writeFile(PLANS_FILE, JSON.stringify({ plans: [] }, null, 2), 'utf-8');
  }
}

export async function readPlans() {
  await ensureDataFile();
  const raw = await fs.readFile(PLANS_FILE, 'utf-8');
  const data = JSON.parse(raw || '{}');
  return Array.isArray(data.plans) ? data.plans : [];
}

export async function writePlans(plans) {
  await ensureDataFile();
  const data = { plans };
  await fs.writeFile(PLANS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function addPlan(plan) {
  const plans = await readPlans();
  plans.push(plan);
  await writePlans(plans);
  return plan;
}
