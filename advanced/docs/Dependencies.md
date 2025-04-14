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
