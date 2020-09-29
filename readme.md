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

 - [Installation](#markdown-header-Installation)
 - [Getting Started](#markdown-header-Getting-Started)
 - [Frontend](#markdown-header-Frontend)
 - [Backend](#markdown-header-Backend)

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
    |   ├── public
    |   |   ├── index.html
    |   |   ├── manifest.json
    |   |   ├── favicon.ico
    |   |   ├── robots.txt
    |   |   ├── logo512.png
    |   |   └── logo192.png
    |   ├── src
    |   |   ├── components
    |   |   ├── containers
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
    |   ├── .prettierignore
    ├── projectName_backend
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

### Root Files 

Te create-fullstack-app generates in the root folder a package.json, a README.md and a config/confgiFSApp.json files. 

The config/configFSApp.json file contains all the options selected when creating the prject, allowing the exposure of the following commands:

```shell
rg component "${EXAMPLE_COMPONENT_NAME}"
```

```shell
rg container "${EXAMPLE_CONTAINER_NAME}"
```

See documentation [here](#Frontend commands)

## Frontend

The environment created uses create-react-app to simplify the creation and maintenance of the client app, automating the dependencies update and webpack configuration to CRA.

### Frontend commands

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

### Options

To configure the project client, the following options are available (one for each group):

  - Styiling system:
    - css
    - sass
    - styled-components (CSS-in-JS)

  - State management:
    - none
    - react-redux
    - react-query

  - Helmet:
    - none
    - react-helmet

  - Routing:
    - none
    - react-routing
  
  - Testing library:
    - mocha and chai
    - jest and enzyme
    - cypress

  - Documentation:
    - none
    - Docz

  - Unit Design 
    - none
    - Storybook

### Getting Started

### Notes

## Backend


### Options

### Getting Started

### Notes
