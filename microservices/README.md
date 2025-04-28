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
