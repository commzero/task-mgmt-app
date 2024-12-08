
# TaskManagement

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.4.

## Overview

TaskManagement is a feature-rich Angular application designed to streamline task organization and management. The application provides a Kanban-style task board, user authentication, and task management functionalities. It is optimized for performance, responsive design, and accessibility.

## Features

- **User Authentication**: Secure login functionality with route protection using Auth Guard.
  - **Test Credentials**:
    - Username: `taskAdmin`
    - Password: `taskAdmin`
- **Kanban Task Board**: Tasks are organized into three categories:
  - **Pending**: Tasks yet to be started.
  - **In Progress**: Tasks currently being worked on.
  - **Completed**: Tasks that are finished.
- **Task Management**:
  - Add new tasks with relevant details.
  - Edit existing tasks to update information.
  - Delete tasks with a confirmation prompt.
- **Drag-and-Drop**: Intuitive drag-and-drop functionality for moving tasks between columns.
- **Search and Filter**: Quickly locate tasks by searching through task titles and descriptions.
- **Responsive Design**: Optimized for desktop and mobile views with a dark theme for better accessibility.
- **Unit Tested**: Comprehensive unit testing ensures application reliability and quality.

## Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project, run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running Unit Tests

This application has been unit tested to ensure stability and reliability. To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running End-to-End Tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Note: Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
