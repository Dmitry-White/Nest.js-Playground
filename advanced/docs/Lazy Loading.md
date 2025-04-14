# Lazy Loading

## Overview

By default, normal modules are eagerly loaded, which means that as soon as the application loads, so do all the application's modules, whether or not they are immediately necessary.

For monolithic applications, where startup latecy is irrelevant, eager loading makes sense in terms of simplicity and usability.

For applications running in a serverless environment, or having little to no startup latency or cold start, eager loading might not be ideal.

## Use Cases

`Lazy Loading` can help decrease bootstrap time by loading only the modules required by a specific use case.

`Deferred Modules Registration`, a subtype of Lazy Loading, can further help to speed up the bootstrap time by loading selected modules asynchronously.

Use Cases:

- Serverless
- Worker/Thread/Process
- Cron Job
- Webhook
- Dynamic Providers (selection of providers based on input);
- etc.

### Features

Lazy loaded modules are cached upon the first lazy module loader load method invocation. Consecutive attempts to load it will be faster and return a cached instance instead of loading the module all over again - due to less I/O ops to retrieve files from disk that are generally slower than process memory access.

_Do note that `Lifecycle Hooks` methods are not invoked in lazy loaded modules and services._
