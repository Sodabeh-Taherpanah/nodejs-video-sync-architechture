node-video-async-architecture
A small, focused example showing how to build an asynchronous video‑processing architecture in Node.js using:

Worker Threads → for CPU‑heavy tasks

BullMQ Job Queue → for background processing

API + Worker separation → clean service boundaries

Non‑blocking async flow → scalable and event‑loop‑safe

This project demonstrates how to offload heavy work using:

a queue (BullMQ)

a worker service

worker threads for CPU isolation

The goal is to show how to avoid blocking the Node.js event loop and how this pattern enables scalable async systems.

Architecture Flow

1. API
   Receives a request (e.g., “process this video”)

Validates input

Pushes a job into the queue

2. Queue
   Stores pending jobs

Ensures they are processed asynchronously

3. Worker
   Listens to the queue

Executes jobs as they arrive

4. Worker Thread
   Handles CPU‑heavy video processing

Keeps the main event loop free and responsive

\*\*Installation

git clone https://github.com/<your-username>/node-video-async-architecture
cd node-video-async-architecture
npm install

Running the System

1. Start Redis (Docker)

docker run -p 6379:6379 redis

2. Start the API

npm run api 3. Start the Worker

npm run worker

\*\* Testing the Async Flow

Send a request using curl or Postman:

bash
curl -X POST http://localhost:3000/process \
 -H "Content-Type: application/json" \
 -d '{"filePath": "sample.mp4"}'
Expected API Response
json
{
"status": "queued",
"jobId": "12345"
}

Expected Worker Output
Code
Job received: 12345
Processing video...
Video processed successfully.

Note
This is a minimal architecture example meant to demonstrate async design patterns.
It is not a production‑ready video processor.
