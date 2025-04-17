# Module Builder

Manually creating highly configurable, dynamic modules that expose async methods (be it `registerAsync`, `forRootAsync`) is quite complicated. These methods are widely used when working with official Nest packages such as `@nestjs/typeorm`, `@nestjs/graphql`, et cetera).

Creating custom DynamicModules that accomplish similar things is not very straightforward and involves quite a bit of boilerplate.

This is why Nest exposes a somewhat new class called the `ConfigurableModuleBuilder`, which helps to facilitate and simplify this entire process, and lets users construct a module "blueprint" - all in just a few lines of code. While creating basic configurable modules is a pretty straightforward process, leveraging all the built-in features of the `ConfigurableModuleBuilder` might not be that obvious.
