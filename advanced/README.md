# NestJS Advanced Concepts

![Advanced Concepts Cat](./cat.png)

## Debugging Common Errors:

```
NEST_DEBUG=true npm run start:dev
```

Information:

- Yellow - host class of the dependency being injected;
- Blue - name of the injected dependency or its injection token;
- Purple - module in which the dependency is being searched for;

`InternalCoreModule` is an internal framework module that gets automatically imported into every module providing access to classes such as Reflector, ModuleRef, etc.
