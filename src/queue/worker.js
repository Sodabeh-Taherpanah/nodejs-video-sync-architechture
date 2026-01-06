import { Worker as BullWorker } from 'bullmq';
import { connection } from '../config/redis.js';
import { runInPool } from '../workers/pool.js';

export const videoJobWorker = new BullWorker(
  'video-jobs',
  async (job) => {
    // put the job in the pool
    const result = await runInPool(job.data);
    return result;
  },
  { connection }
);

videoJobWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

videoJobWorker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});
