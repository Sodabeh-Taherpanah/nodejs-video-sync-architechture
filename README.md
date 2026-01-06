Here is a small test, focused example showing how to build an asynchronous video‑processing architecture in Node.js using:

- Worker Threads → for CPU‑heavy tasks

- BullMQ Job Queue → for background processing

- API + Worker separation → clean service boundaries

- Non‑blocking async flow → scalable and event‑loop‑safe

This project demonstrates how to offload heavy work using A queue (BullMQ), A worker service, and worker threads for CPU isolation . So, the goal is to show how to avoid blocking the Node.js event loop and how this pattern enables scalable async systems

**Architecture Flow**

1. API
   Receives a request (e.g., “process this video”) then Validates input and Pushes a job into the queue

2. Queue
   Stores pending jobs and ensures they are processed asynchronously

3. Worker
   Listens to the queue and executes jobs as they arrive

4. Worker Thread
   Handles CPU heavy video processing and keeps the main event loop free and responsive

**Clone Repository:**

```
git clone https://github.com/Sodabeh-Taherpanah/nodejs-video-sync-architechture.git

cd node-video-async-architecture
```

**Installation**

`npm install`

Running the System

1. Start Redis (Docker)

`docker run -p 6379:6379 redis`

2. Start the API

`npm run api `

3. Start the Worker

`npm run worker`

**Testing the Async Flow**

`curl -X POST http://localhost:3000/process \
  -H "Content-Type: application/json" \
  -d '{"filePath": "sample.mp4"}`

Expected API Response

`{
"status": "queued",
"jobId": "12345"
}`

Expected Worker logs:

````Job received: 12345
Processing video...
Video processed successfully.```

**Note**

1. This is a minimal architecture example meant to demonstrate async design patterns.

2. This is not a video upload(sample.mp4) , here the API only receives a file path string, because the architecture is designed for background processing, not handling raw video uploads.


````
