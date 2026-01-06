import { Worker } from 'node:worker_threads';

const MAX_WORKERS = 4;
const idleWorkers = [];
const busyWorkers = new Set();
const pendingJobs = [];

function createWorker() {
  const worker = new Worker(new URL('./videoWorker.js', import.meta.url));

  worker.on('message', (result) => {
    worker._resolve(result);
    busyWorkers.delete(worker);
    idleWorkers.push(worker);
    queueMicrotask(scheduleNext);
  });

  worker.on('error', (err) => {
    worker._reject(err);
    busyWorkers.delete(worker);
    idleWorkers.push(worker);
    queueMicrotask(scheduleNext);
  });

  return worker;
}

for (let i = 0; i < MAX_WORKERS; i++) {
  idleWorkers.push(createWorker());
}

/**
 * Run a CPU-heavy task inside the worker pool.
 * Returns a Promise (microtask).
 */
export function runInPool(payload) {
  return new Promise((resolve, reject) => {
    pendingJobs.push({ payload, resolve, reject });
    queueMicrotask(scheduleNext);
  });
}

function scheduleNext() {
  if (idleWorkers.length === 0 || pendingJobs.length === 0) return;

  const worker = idleWorkers.pop();
  const job = pendingJobs.shift();

  busyWorkers.add(worker);
  worker._resolve = job.resolve;
  worker._reject = job.reject;

  worker.postMessage(job.payload);
}
