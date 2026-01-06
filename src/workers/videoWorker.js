import { parentPort } from 'node:worker_threads';

parentPort.on('message', async (payload) => {
  console.log('Worker received job:', payload);
  const result = await heavyCpuTask(payload);
  parentPort.postMessage(result);
});

async function heavyCpuTask(payload) {
  console.log('Starting heavy task for:', payload);
  const start = Date.now();
  while (Date.now() - start < 200) {} // we add 200ms busy loop

  return {
    ok: true,
    processedAt: new Date().toISOString(),
    input: payload,
  };
}
