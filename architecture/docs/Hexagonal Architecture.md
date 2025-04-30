# Hexagonal Architecture

`Hexagonal Architecture`, also known as `Ports and Adapters Architecture`, is a software design pattern that aims to create a highly decoupled and testable application by emphasizing the separation of concerns between the core business logic and external concerns such as databases, user interfaces, and frameworks.

The key concept in Hexagonal Architecture is the use of "ports" and "adapters" (hence the Ports/Adapters name).

`Ports` are interfaces that represent the entry points into the core application.

`Adapters` implement the interfaces (or ports) defined by the core domain. They serve as the bridge between the core application and the external concerns.

Some benefits of Hexagonal Architecture are:

- `Decoupling`: This architecture promotes loose coupling between the core domain and external concerns, allowing changes to occur in one area without affecting others.
- `Testability`: By defining clear interfaces (ports) for interactions, it becomes easier to test the core domain in isolation without relying on external systems.
- `Flexibility`: Hexagonal Architecture allows for the replacement or modification of external concerns (adapters) without impacting the core domain, making it more adaptable to different technology stacks.
- `Isolation of Core Domain`: The core domain is the focal point of the application, enabling developers to focus on expressing business logic without being influenced by external factors.
- `Domain-Centric Design`: This architectural pattern encourages a strong focus on the core domain and the business rules, leading to a more expressive and maintainable domain model.
