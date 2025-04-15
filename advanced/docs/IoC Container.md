# IoC Container

`Inversion of Control (IoC)` container allows introspection of all the registered providers and controllers.

Accessing IoC works by traversing an applications module graoph and providers by analysing their metadata (often added via decorators).

To facilitate access to IoC, Nest.js provides a module known as the `Discovery Module`.

This module, among other useful things, gives access to `InstanceWrapper` - an internal Nest.js wrapper class that represents all controllers, providers, enhancers and anything that gets registered in Nest.js IoC.

A typical process of using IoC container is as follows:

- Create a decorator (manually or via `SetMetadata` helper) that sets some metadata on an object (class, methods, etc);
- Use reflection (manually or via `Reflector` class) to introspect object's metadata and find target objects;
- Apply actions on a target object;
