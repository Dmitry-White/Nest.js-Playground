# Setup

Folder Structure:

- Application
- Domain
- Infrastructure
- Presenters

Other Components:

- Value Objects
- Ports & Adapters

## Application

Contains the application services, facades, handlers and other application specific components which all represent the application layer.
It will communicate with the Data Access components, Message Brokers and other External Systems through "interfaces" called `Ports`.

## Domain

Contains the domain models, value objects, domain events and other domain specific components which all represent the domain layer.

## Infrastructure

Contians the Domain Access components, Message Brokers, and other External Systems which represent the infrastructure layer.
It will implement the interfaces (aka `Ports`) defined by the application layer.

## Presenters

Contains controllers, gateways and other user-facing components or APIs.
Sometimes this folder is also called the user-interface folder, sometimes - just interface. In this case, "presenters" serves a self-explanatory umbrella term.

## Value Objects

An immutable side-effect-free object that represents a descriptive aspect of the domain with no conceptual identity and originates from Domain Driven Design (DDD).
Two value objects are equal when they have the same value, not necessarily being the same object.

## Ports & Adapters

Ports define the contract for interactions with the external world.
Adapters implement these contracts and serve as a bridge between the application layer and the external systems.
