# Onion Architecture

## Overview

`Onion Architecture` is an architectural pattern for designing software applications with a focus on decoupling, maintainability and putting the business logic at the center of the application.

Quite similar to `Hexagonal Architecture` in a sense that they are both technically almost identical, even though they have different names and are presented by different visual representations or diagrams.

## Structure

The inner-most layer is the `Domain Layer`, which contains the domain model and logic.

This layer is surrounded by the `Application Layer`, which contains the application logic.

Then there's an `Infrastructure Layer`, which contains both `User Interface` components, as well as the `Data access` components.
_Caveat: UI and DA being on the same layer doesn't mean this architecture is inherently insecure due to UI seemingly being able to access data directly._

The flow of dependencies follows the inward direction, with the use of the `Dependency Inversion` principle, where outer layers depend on inner layers, but the inner layers remain unaware of those outer layers.

Layers are not meant to group components, but rather emphasize the direction of dependencies.
