import express from 'express';
import { videoQueue } from '../queue/index.js';

const app = express();
app.use(express.json());

app.post('/process-video', async (req, res) => {
  const job = await videoQueue.add('video-job', { file: req.body.file });
  res.json({ jobId: job.id });
});

app.listen(3000, () => console.log('API running,  port 3000'));

export default app;
