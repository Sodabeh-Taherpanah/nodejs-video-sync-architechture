node-video-async-architecture
A minimal, example demonstrating how to design asynchronous video processing architecture in Node.js using:

1. Worker Threads for CPU heavy tasks

2. Job Queues for background processing

3. Decoupled API + Worker model

4. Clean async flow suitable for scalable systems

It means that, this repo demonstrates how to offload heavy work using: a queue (BullMQ), a worker service and worker threads for CPU isolation and How to avoid blocking the Node.js event loop and with this approach we can easily build scalable async systems in Node.js.

This project is intentionally small and focused.Its goal is to show architecture

Flow is : API

1. Receives a request (e.g., “process this video”), validates input, and pushes a job into the queue.

2. The Queue stores pending jobs and ensures they are processed asynchronously.

3. The _Worker_ Listens to the queue and executes jobs.

4. The _ Worker Thread _ Handles CPU‑heavy video processing without blocking the event loop.

Installation :
git clone https://github.com/<your-username>/node-video-async-architecture cd node-video-async-architecture
npm install

Start Api: npm run api
Start the Worker: npm run worker

For testing Async flow

- Send a video processing request with curl or postman:

curl -X POST http://localhost:3000/process \ -H "Content-Type: application/json" \ -d '{"filePath": "sample.mp4"}'

Expected response can be like it :

{ "status": "queued", "jobId": "12345" }

- Check worker log like:
  Job received: 12345
  Processing video...
  Video processed successfully.

\*\*Note:

This is a minimal architecture example, not a production ready video processor.
