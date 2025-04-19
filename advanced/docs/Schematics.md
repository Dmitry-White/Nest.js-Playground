# Schematics

## Overview

A schematic is a template-based code generator that is a set of instructions for transforming a software project by generating or modifying code.

`Angular Devkit Schematics` were introduced by the Angular team in 2018. However, even though schematics were developed by the Angular team, and despite the word angular being in the "name" - anyone can still use them, in any sense, to generate any type of code, as they are platform independent (able to generate anything whether it's NestJS, React, Vue, etc).

We can utilize these schematics to enforce architectural rules and conventions, making our projects consistent and inter-operative. Or we could create schematics to help us generate commonly-used code - shared services, modules, interfaces, health checks, docker files etc.

For a more real-world example, with the help of schematics, we could reduce the amount of time we might need to setup all the boilerplate for creating a new microservice within our organization by creating a microservice schematic that generates all of the common code / loggers / tools / etc that we might commonly use in our organizations microservices.

## Implementation

In schematics, the virtual file system is represented by a `Tree`. A `Tree` data structure contains a base (or a set of files that already exists), as well as a staging area (which is a list of changes to be applied to that base).

When making modifications, we don't actually change the base itself, but add those modifications to the staging area.

A `Rule` object - defines a function that takes a `Tree`, applies transformations (more on transformations in a moment), and returns a new `Tree`. The main file for a schematic, which is that index.ts file, defines a set of rules that implement the schematic's logic.

A transformation is represented by an `Action` - of which there are four action types: `Create`, `Rename`, `Overwrite`, and `Delete`.

Each schematic runs in a context, represented by a `SchematicContext` object.
