# Worker Threads

Worker Threads help to offload CPU-intensive tasks - away from the Event Loop - so that they can be executed parallelly, in a non-blocking manner. Although they do not help much with I/O (or input/output) intensive work, since the Node.js built-in asynchronous I/O operations are much more efficient themselves.

Each worker thread has its own isolated V8 environment, context, event loop, event queue, etc. However, they can share memory. They can do so by transferring ArrayBuffer instances or sharing SharedArrayBuffer instances with one another. Also, a worker and parent can communicate with each other through a messaging channel.

Note that in Node.js it’s important to differentiate between CPU-intensive, long-running, event-loop blocking operations, and I/O (input/output) operations (such as HTTP requests, querying the database, etc).
