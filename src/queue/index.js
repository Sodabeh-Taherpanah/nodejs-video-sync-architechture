import { Queue } from 'bullmq';
import { connection } from '../config/redis.js';

export const videoQueue = new Queue('video-jobs', {
  connection,
});
