# Sub-Trees

# Overview

Every Nest.js application has at least one module, a root module.
The root module is the starting point Nest.js uses to build application graph, which is the internal data structure Nest.js uses to resolve module and provider relationships and dependencies. In this directed graph, in which edges have a direction, every module is effectively represented as a single node. Importing another module or node instructs the framework to create an edge between these two points in the graph.

Although this graph is statically scoped and doesn't get recreated over time, meaning that only a single instance spans the entire application's lifecycle, it is possible that it may contain modules or nodes that register non-statically-scoped providers - specifically, `Request Scoped` providers.

Request-scope providers get instanciated dynamically upon receiving a signal, e.g. HTTP request, CronJob invocation, etc. In reaction to this signal, Nest.js constructs a so-called dependency injection sub-tree that's associated with the given signal.

## ModuleRef

`ModuleRef` is the way to manually construct and manage custom dependency injection sub-trees.

What the ModuleRef.resolve method does under the hood is that it internally constructs a dedicated depenency injection sub-tree where the target service in the argument for the method is the root node of that sub-tree. This sub-tree has its own unique context identifier that represents that tree.

One of the ways to use these sub-trees and avoid making everything request scoped is to use events.

`@nestjs/event-emitter` package is built on top of Node.js EventEmitter using Observables. Event subscribers can't be request scoped by definition, since Nest.js can't really track down what service controller triggered the event, as that would be against loose coupling capabilities the events provide.

Therefore, `ModuleRef` is an ideal choice for cases where request scoped capabilities must co-exist with loose coupling.
