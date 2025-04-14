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

## Dependencies

There are 2 types of dependencies in Nest.js.

- Implicit
- Explicit

Implicit dependencies are dependencies that the framework is in charge of reading metadata and retrieving object references of.
Under the hood implicit dependency syntax is a syntactic sugar of the explicit version that uses `@Inject` decorator.

Example:

```typescript
constructor(
  private readonly coffeesService: CoffeesService,
) {}
```

equivalent to:

```typescript
constructor(
  @Inject(CoffeesService)
  private readonly coffeesService: CoffeesService,
) {}
```

When the TS compiler transpiles the TS files into JS files, it leaves some additional metadata behind that allows the framework to use reflection to analyse everything at runtime.

For author-time code at `./src/coffees/coffees.controller.ts`:

```typescript
constructor(
  private readonly coffeesService: CoffeesService,
) {}
```

The run-time traspiled code at `./dist/coffees/coffees.controller.js` is:

```javascript
...
exports.CoffeesController = CoffeesController = __decorate(
  [
    (0, common_1.Controller)('coffees'),
    __metadata('design:paramtypes', [coffees_service_1.CoffeesService]),
  ],
  CoffeesController,
);
```

Due to `design:paramtypes` metadata, it's not required to use inject decorator and explicit pass the token.

For dependencies that can't be referenced by their classes, an explicit dependency via `@Inject` decorator is required (e.g. via Symbol & Interface).

For author-time code at `./src/coffees/coffees.service.ts`:

```typescript
constructor(
    @Inject(COFFEES_DATA_SOURCE)
    private readonly coffeesDataSource: ICoffeesDataSource,
) {}
```

The run-time traspiled code at `./dist/coffees/coffees.service.js` is:

```javascript
...
exports.CoffeesService = CoffeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(coffees_constants_1.COFFEES_DATA_SOURCE)),
    __metadata("design:paramtypes", [Object])
], CoffeesService);
```

In case of an explicit dependency, e.g. dependency for a TS interface via Symbol token, instead of having the actual interface reference/metadata in the transpiled code, there's an Object reference since TS interfaces don't exist in JS as they are wiped out during the transpilation process and there's nothing to reference for the framework DI.

That's the reason why for other types of providers, be it a value or factory providers, explicit `@Inject` decorator is required.
