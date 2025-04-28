# NestJS Microservices

![Microservices Cat](./cat.png)

## Useful Framework Commands

To create a lib to be shared in a monorepo setup between apps:

```bash
nest g lib <LIB_NAME>
```

To create an app in a monorepo setup:

```bash
nest g app <APP_NAME>
```

To launch an app from root of the monorepo:

```bash
npm run start:dev -- <APP_NAME>
```

This command also converts a regular Nest.js single-app repo setup into a monorepo setup with apps under `./apps`.
This monorepo setup works based on:

- Nest.js Config file for Nest.js CLI commands app scoping;
- TS Config file for import aliases (used with libs);

## NATs

Lightweight, high performance, open source message broker for distributed systems, cloud native apps, and microservices architectures.

It provides a simple yet powerful API that allows to easily build distrubuted systems.

The NATs server is written in Go, but client available in other languages as well. It's easy to setup and it natively supports

NATs supports the following delivery options:

- At Most Once:
  - Message is delivered zero or once;
  - Message may be lost;
- At Least Once:
  - Message delivered at least once;
  - Messages may be duplicated but not lost;

In NATs, when subscribers register themselves to retrieve message from a publisher, the `1-to-N` fanout pattern of messaging ensures that any message sent by a publisher reaches all subscribers that have registered.

NATs also provides a feature named `Queue`, which allows subscribers to register themselves as part of a queue, forming a `Queue Group`.

To enable `Request-Response` nessage type (NATs provides this dual channel setup out-of-the-box), Nest uses (creates if not supported by the underlying technology) 2 logical channels:

- Request Channel (responsible for transferring data)
- Response Channel (waits for incoming responses)
