# NestJS Advanced Concepts

![Advanced Concepts Cat](./cat.png)

## Common Errors:

### Debug Mode

```
NEST_DEBUG=true npm run start:dev
```

Information:

- Yellow - host class of the dependency being injected;
- Blue - name of the injected dependency or its injection token;
- Purple - module in which the dependency is being searched for;

`InternalCoreModule` is an internal framework module that gets automatically imported into every module providing access to classes such as Reflector, ModuleRef, etc.

### Interface Injection

TypeScript doesn't leave any metadata about interfaces. Every interface is represented by Nest.js as an object in a produced JS file that can't provide the framework with any information to report.
Thefore TS interfaces can't and shouldn't be used as provider tokens, instead as a best practice, Symbol tokens should be used to inject providers based on some interfaces.

### Circular Dependency

Circular dependencies can arise when two providers depend on each other or TS files depend on each other, whether that's exported variables, constants, function, etc.

Tracking circular dependencies can be very tedious and generally difficult to uncover where they're actually coming from.
Tools like [Madge](https://www.npmjs.com/package/madge) generate a visual graph of module dependencies finding circular dependencies and providing other useful information about the entire app.

To analyse a built app:

```
npx madge dist/main.js --circular

OR

npm run graph:analyse
```

To generate a visual graph (via [GraphViz](https://www.graphviz.org), installed separately, `gvpr` should be in PATH) for a built app:

```
npx madge dist/main.js --image graph.png

OR

npm run graph:visualise
```
