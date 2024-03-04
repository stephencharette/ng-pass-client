This is a project to practice Angular concepts.

# NgPass

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.2.

## Learning objectives
- [X] Basic Overview: Angular - [Introduction to Angular concepts](https://angular.io/guide/architecture)
 - Event binding is when application can respond to user input in the envionrmnet by updating application data, while property binding is when you can interpolate application data values into the HTML
 - Angular supports two-way-binding meaning that changes in the DOM also reflect in the application data
 - Angular templates can use pipes to to display dates or locals to the user, pipes are handy for transforming data. There are predefined pipes in angular but you can also create your own.
 - Services are classes that are preceded with the `@Injector` decorator.
- [X] Modules (for encapsulated functionality)
- Documentation: Angular - [Introduction to modules](https://angular.io/guide/architecture-modules)
    - NgModules consolidate components, directives, pipes into cohesive blocks of functionality, each focused on a feature areaa, pplication business domain, workflow, or common collection of utilities.
    - Declarations: the pipes, components, and directives that belong to this module
    - Exports: the subset of the declariations of this module that are visible and usable within component templates of other modules
    - Imports: other modules whose exported classes are needed by component templates declared within this module
    - Providers: creators of services from this module that contributes to the global collection of services; become accessible by all parts of the application
    - Bootstrap: the main application view for this module, only the `root` module should set the bootstrap property.
- [X] Custom Directives (Attribute/Structural)
- TODO: custom directive example: prevent certain characters
- Example of built in directive: https://angular.io/guide/built-in-directives#built-in-structural-directives
- Attribute Directive: [Angular - Attribute directives](https://angular.io/guide/attribute-directives)
- Structural Directive: [Angular - Structural directives](https://angular.io/guide/structural-directives)
- Example of custom directive: [Getting Started with Custom Structural Directives in Angular - This Dot Labs](https://www.thisdot.co/blog/getting-started-with-custom-structural-directives-in-angular)
- [X] Custom Pipes
- Documentation: [Angular - Transforming Data Using Pipes](https://angular.io/guide/pipes)
- Example of custom pipe: [Angular - Creating pipes for custom data transformations](https://angular.io/guide/pipes-custom-data-trans)
- [X] Services
- Creating service(s) to create a separation of concerns.
- Components should focus on presenting data (and binding to the model) whereas a service focuses on data retrieval, manipulation, business logic. Services also are reusable across many components (reusable code).
- Documentation: [Angular - Introduction to services and dependency injection](https://angular.io/guide/architecture-services)
- [ ] Forms
- Understand the difference between template and reactive forms. When to use which?
- Documentation: [Angular Forms Guide: Template Driven and Reactive Forms (angular-university.io)](https://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/)
- [ ] Routing
 - What this is and how it impacts a Single Page Application (SPA)? (Dynamically loading content with full page refreshes). Angular can also be configured to render server-side (SSR) (also known as Angular Universal). Pros/cons of SSR vs SPA.
 - Documentation: [Angular - Angular Routing](https://angular.io/guide/routing-overview)
- [ ] Route Guards
- Understanding route guards and how they can be used with authorization for page access (based on roles).
- Documentation: https://angular.io/guide/router#preventing-unauthorized-access
- [ ] Change Detection
- How changes are detected and one-way and two-way model binding.
- Documentation: [Angular - Angular change detection and runtime optimization](https://angular.io/guide/change-detection)
- [ ] RxJS
- Understanding reactive programming and how/when it is useful to employ in an Angular app.
- Documentation: [RxJS](https://rxjs.dev/) and [Angular - The RxJS library](https://angular.io/guide/rx-library)
- Understanding the various actions that can be performed: pipe, map, takeUntil, etc.
- [ ] Component interaction (parent/child)
- When to extract components into smaller components (for encapsulation and reusability). Knowing when to use @Input and @Output variables to allow component interaction. ViewChild too [Angular - ViewChild](https://angular.io/api/core/ViewChild).

## Backend server
This is the client to the [ng-pass-server](https://github.com/stephencharette/ng-pass-server) .NET solution to encrypt secrets. Run this solution along side this angular project.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
