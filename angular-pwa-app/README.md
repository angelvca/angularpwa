Profe le voy a dejar las instrucciones uqe ya tenía por predeterminado el documento, pero el proceso para inciar mi proyecto es primero instalar todo con:

    npm install

Después hay que construir el proyecto para que se inicie el service worker y el manifest con el siguinete código:

    ng build --configuration production

Por último, solo queda iniciar el proyecto con:

    http-server -c-1 dist/angular-pwa-app/browser -p 8080

Y hay que abrir el que dice:

    http://127.0.0.1:8080/ 

Porque en el otro no agarra el service worker, pero con ese funciona bien.

Además, cabe mencionar que esta conectado con la base de datos de mock.api, entonces espero que le funcione como a mi me funciono.


# AngularPwaApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
