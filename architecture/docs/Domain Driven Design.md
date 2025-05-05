# Domain Driven Design

## Overview

`Domain Driven Design` (also known as `DDD`) is a software development technique that concentrates on the domain model and domain logic.

It follows the concept called `Ubiquitous Language`:
the structure and language of the code should match that of the business domain.

`DDD` is about creating a language that connects the implementation to the business experts and their knowledge, so essentially words and phrases from the domain are directly used in the codebase. `DDD` can be used to construct a rich model of the domain, describing all the objects and interactions between them using a language that is understood by both the business experts and the developers.

`DDD` is a set of principles and patterns that can be applied to any software project.

## Strategic Design Process

`Strategic Design Process` is the process to identify the core domain and the sub domains, and to define the bounded contexts and the contents maps in the system.

It includes:

- Domain Storytelling
- Event Storming
- Context Mapping

## Tactical Design Process

`Tactical Design Process` is the process that uses a set of building blocks to construct the domain model.

It includes:

- Entities
- Value Objects
- Aggregates
- Repositories
- Services
- Factories
- Events

### Building Blocks

`Entities` are objects that have a unique identifier and a lifecycle. They are immutable and can be modified over time.
`Entities` have a conceptual identity, meaning that even if their attributes change, they are still the same entity.
`Entities` are not equal to each other, even if they have the same attributes.

`Value Objects` are immutable and don't have a unique identifier.
`Value Objects` are equal to each other if they have the same attributes.

`Aggregates` are a cluster of objects that are treated as a single unit. They insure that all the objects within it are always in a valid and consistent state.
`Aggregate` represents a transactional consistency boundary, meaning that changes to the objects within should be made in a single transaction. Any modification to the state of one `Entity` within the `Aggregate` should be done within the contents of the aggregate itself.

`Repositories` are used to persist and retrieve `Aggregates`. They provide and abstraction over the data acess layer, and allow us to work with `Aggregates` without having to worry about the underlying data access implementation.

`Services` are used to encapsulate domain logic that doesn't belong to any particular `Entity` or `Value Object`. Usage should be restricted and reviewed as the heavy use of services could be a sign of an `Anemic Domain Model`.
`Anemic Domain Model` is an anti-pattern where the domain model doesn't contain any domain logic and is essentially just a bunch of getters and setters.

`Factories` are used to encapsulate the creation of complex objects. They are useful in scenarios where the creation of objects involves complex validation, initialisation, or the coordination of multiple steps.
`Factories` help us to keep the domain model clean and focused on business logic, while offloading the responsibility of object creation to dedicated factory classes.

`Events` are used to communicate and capture specific information about actions or domain model changes that have happended in the past. Play a crucial role in enabling loose coupling, scalability, and eventual consistency in distributed systems.
There are generally 2 types of events: `Domain Events` and `Integration Events`.
