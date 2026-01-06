import { videoQueue } from '../queue/index.js';

export async function addVideoJob(videoData) {
  try {
    if (!videoData || !videoData.videoId) {
      throw new Error('videoId is required');
    }

    const job = await videoQueue.add('process-video', {
      videoId: videoData.videoId,
      createdAt: Date.now(),
    });

    console.log(`📥 Job added: ${job.id}`);
    return job;
  } catch (err) {
    console.error('❌ addVideoJob error:', err.message);
    throw err;
  }
}
