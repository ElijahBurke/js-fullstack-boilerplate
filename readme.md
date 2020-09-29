# Javascript Full-Stack Client

## Introduction

This is a Javascript Fullstack CLI to quickly create and manage Javascript-based SPAs and servers.

## The Goal of JS-fullstack CLI

The JS-fullstack CLI creates, manages, builds and test your javascript app. It is based on the [create-react-app](https://www.npmjs.com/package/create-react-app) devTool and uses templating to customise the frontend folder structure.

The backend is based on NodeJS with either [express](https://www.npmjs.com/package/express) or [Koa](https://www.npmjs.com/package/koa) as frameworks.

## Requirements

Requires node v7.6.0 or higher for ES2015 and async function support.

To use the CLI, the following packages are required: [npx](https://www.npmjs.com/package/npx), [create-react-app](https://www.npmjs.com/package/create-react-app), [npm](https://www.npmjs.com/package/npm).

# Table of Contents

- [Installation](#Installation)
- [Getting Started](#Getting-Started---Local-Development)
- [Frontend](#Frontend)
- [Backend](#Backend)

## Installation

To make the package available in the shell as standalone command, it requires a global installation

```shell
npm install -g js-fullstack-boilerplate
```

## Getting Started - Local Development

When called, the package prepares and pre-compiles the required folder structure and file structure to develop a React-based frontend and a NodeJS backend.

The command starts a questionnaire that selects the available options for the frontend (styling system, state management, testing library, React helmet, routing, Storybook, Docz) and backend (express, koa).

The following command prompts the start of the creation of a fullstack app in the current directory:

```shell
create-fullstack-app "${EXAMPLE_PROJECT_REPO}"
```

The general folder structure it exposes:

```bash
└── projectName
    ├── config
    |   └── configFSApp.json
    ├── projectName_client
    ├── projectName_backend
    ├── README.md
    └── package.json
```

### Root Files

The create-fullstack-app generates in the root folder a package.json, a README.md and a config/confgiFSApp.json files.
The package exposes two commands that can be used to generate prepulated React components and containers following the selected options.

The config/configFSApp.json file contains all the options selected when creating the project, allowing the exposure of the two commands:

```shell
rg component "${EXAMPLE_COMPONENT_NAME}"
```

```shell
rg container "${EXAMPLE_CONTAINER_NAME}"
```

See documentation [here](#Frontend-commands)

# Frontend

The environment created uses create-react-app to simplify the creation and maintenance of the client app, automating the dependencies update and webpack configuration to CRA.

### Frontend commands

From projectName_client run `shell npm start` to start the client.

After the directory generation, the following commands allow the automatic creation and population of React components and containers, with all the required files for the options selected.

```shell
rg component "${EXAMPLE_COMPONENT_NAME}"
```

to generate react components in the client/src/components and in client/src/containers/containerExample.

And:

```shell
rg container "${EXAMPLE_CONTAINER_NAME}"
```

to generate a container in client/src/containers.

These two commands will generate components and containers in the current shell directory, if it fullfills all the requirements.

Components requirements: current directory to be src/components or src/containers/containerExample
i.e. a component can be generated only inside the components folder or the folder of an existing container in src/containers/ContainerName

Containers requirements: containers can only be generated in the src/containers folder.

### Folder Structure

```bash
└── projectName_client
    ├── public
    |   |   ├── index.html
    |   |   ├── manifest.json
    |   |   ├── favicon.ico
    |   |   ├── robots.txt
    |   |   ├── logo512.png
    |   |   └── logo192.png
    |   ├── src
    |   |   ├── components
    |   |   |   └── componentExample
    |   |   |       ├── index.js
    |   |   |       ├── index.style.js / index.css / index.scss
    |   |   |       ├── index.test.js / test/index.test.js
    |   |   |       ├── index.mdx
    |   |   |       └── index.stories.js
    |   |   ├── containers
    |   |   |   └── containerExample
    |   |   |       ├── (generation Option) componentChildOfContainerExample
    |   |   |       ├── index.js
    |   |   |       ├── index.style.js / index.css / index.scss
    |   |   |       ├── index.test.js / test/index.test.js
    |   |   |       ├── index.mdx
    |   |   |       └── index.stories.js
    |   |   ├── utils
    |   |   ├── App.js
    |   |   ├── App.css
    |   |   ├── index.js
    |   |   └── index.css
    |   ├── husky.config.js
    |   ├── prettier.config.js
    |   ├── package.json
    |   ├── README.md
    |   ├── .env
    |   └── .prettierignore
```

### Options

To configure the project client, the following options are available (one for each group):

#### Styling system

Depending on the choosen option, calling `shell rg component/container "${name}" ` will autmatically generate an index.css, index.scss or index.style.js file in the component folder.

| Option            | Package                                              | Version   |
| ----------------- | ---------------------------------------------------- | --------- |
| css               | -                                                    | -         |
| sass              | [node-sass](https://www.npmjs.com/package/node-sass) | "^4.14.1" |
| styled-components | [styled-components](https://styled-components.com/)  | "^5.2.0"  |

#### State Management

- By selecting react-redux:

  - root index.js will be prepoulated with the required Provider and store for redux.
  - Containers created with `rg container "${name}" ` will include the connect function and mapStateToProps and mapDispatchToProps connections.

- By selecting react-query:
  - root index.js will be populated with ReactQueryCacheProvider and QueryChace
  - Containers created with `rg container "${name}" ` will have index.js prepoulated with methods useQuery, useMutation, useQueryCache.
  - in utils directory an ApiService.js file will be created to add all the api calls (connected to containers already).

| Option      | Package                                                            | Version   |
| ----------- | ------------------------------------------------------------------ | --------- |
| none        | -                                                                  | -         |
| react-redux | [react-redux](https://react-redux.js.org/)                         | "^7.2.1"  |
| react-query | [react-query](https://github.com/tannerlinsley/react-query#readme) | "^2.23.0" |

##### Extra dependencies installed

- React Redux:
  - [redux](https://redux.js.org/), version: "^4.0.5"
  - [thunk](https://www.npmjs.com/package/redux-thunk), version "^2.3.0"

#### Helmet

- By selecting Helmet:
  - App.js will be prepopulated with a general <Helmet> tag.
  - Components and containers will be prepopualted with a general <Helmet> tag.

| Option       | Package                                            | Version  |
| ------------ | -------------------------------------------------- | -------- |
| none         | -                                                  | -        |
| react-helmet | [react-helmet](github.com/nfl/react-helmet#readme) | "^6.1.0" |

#### Routing

- By selecting Routing:
  - App.js will be prepopulated with react-router and react-router-dom methods and example <Route> tags will be added.

| Option        | Package                                                              | Version  |
| ------------- | -------------------------------------------------------------------- | -------- |
| none          | -                                                                    | -        |
| react-routing | [react-router](https://github.com/ReactTraining/react-router#readme) | "^5.2.0" |

##### Extra dependencies installed

- [react-router-dom](github.com/ReactTraining/react-router#readme), version: "^5.2.0"

#### Testing Library

- By selecting one of the libraries:
  - a test file in the form of index.test.js will be added to the component/container directory
  - config files will be added to src

| Option  | Package                                                                                               | Version   |
| ------- | ----------------------------------------------------------------------------------------------------- | --------- |
| Mocha   | [mocha](https://mochajs.org/)                                                                         | "^8.1.3"  |
| Jest    | [jest](https://jestjs.io/)                                                                            | "^26.4.2" |
| Cypress | [cypress](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements) | "^5.3.0"  |

##### Extra dependencies installed

- Mocha:
  - [Chai](chaijs.com), version: "^4.2.0"
- Jest:
  - [Enzyme](), version: "^3.11.0"
  - [enzyme-adapter-react-16](enzymejs.github.io/enzyme/), version: "^1.15.5"

#### Documentation

- By selecting Docz:
  - Each container and component directory will include with a prepopulated index.mdx file.
  - package.json will include scripts to visualise (docz:dev), and build (docz:build) documentation.

| Option | Package                        | Version  |
| ------ | ------------------------------ | -------- |
| none   | -                              | -        |
| Docz   | [docz](https://www.docz.site/) | "^2.3.1" |

#### Single Unit Design

- By selecting Storybook:
  - Each container and component directory will include with a prepopulated index.stories.js file.
  - package.json will include scripts to run storybook (npm run storybook)

| Option    | Package                                                                   | Version   |
| --------- | ------------------------------------------------------------------------- | --------- |
| none      | -                                                                         | -         |
| Storybook | [storybook](https://github.com/storybookjs/storybook/tree/master/lib/cli) | "^6.0.22" |

# Backend

The Environment created uses NodeJS and a framework of choice between [ExpressJS](https://expressjs.com/) and [Koa.js](https://koajs.com/) for the backend basics of the fullstack app.

The database connected to the backend can be selected between MongoDB and Mongoose or postgreSQL and Sequelize.

From projectName_backend run `shell nodemon` to start the backend.

If using sequelize, the database needs to be created before running the backend.

### Folder Structure

The backend is created using the MVC structure and the directory structure is as follows:

```bash
└── projectName_backend
    |   ├── controllers
    |   |   ├── index.js
    |   |   └── controller.js
    |   ├── models
    |   |   ├── index.js
    |   |   └── model.js
    |   ├── routers
    |   |   ├── index.js
    |   |   └── router.js
    |   ├── index.js
    |   ├── config.js
    |   ├── package.json
    |   └── README.md
    ├── README.md
    └── package.json
```

### Options

The backend can be customised using either Koa.js or ExpressJS.

The root index.js file is automatically prepopulated with the correct scripts to run the backend (PORT: 3001) with `shell nodemon` from the fullstack_backend directory.

#### Backend

| Framework | Package                           | Version  |
| --------- | --------------------------------- | -------- |
| express   | [express](https://expressjs.com/) | "^4.14.1 |
| koa       | [koa](https://koajs.com/)         | "^2.3.0" |

##### Additional Dependencies

- [nodemon](nodemon.io), version: "^2.0.4"
- express:
  - [cors](github.com/expressjs/cors#readme), version: "^2.8.5"
- koa:
  - [koa-bodyparser](github.com/koajs/body-parser), version: "^4.2.0"
  - [@koa/cors](github.com/koajs/cors), version: "^3.1.0"
  - [koa-router](github.com/koajs/router), version: "^7.2.1"
  - [koa-static](github.com/koajs/static#readme), version: "^4.0.1"

#### Database

| Framework  | Package                            | Version   |
| ---------- | ---------------------------------- | --------- |
| MongoDb    | [Mongoose](https://expressjs.com/) | "^5.9.24" |
| postgreSQL | [Sequelize](https://koajs.com/)    | "^4.37.7" |

##### Additional Dependencies

- postgreSQL:
  - [pg](github.com/brianc/node-postgres), version: "^7.14.0
