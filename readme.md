# Javascript Full-Stack Client 

## Introduction

This is a Javascript Fullstack CLI to quickly create and manage Javascript-based SPAs and servers.

## The Goal of JS-fullstack CLI

The JS-fullstack CLI creates, manages, builds and test your javascript app. It is based on the [create-react-app](https://www.npmjs.com/package/create-react-app) devTool and uses templating to customise the frontend folder structure.

The backend is based on NodeJS with either [express](https://www.npmjs.com/package/express) or [Koa](https://www.npmjs.com/package/koa) as frameworks.

## Requirements

Requires node v7.6.0 or higher for ES2015 and async function support.

To use the CLI, the following packages are required: [npx](https://www.npmjs.com/package/npx), [create-react-app](https://www.npmjs.com/package/create-react-app), [npm](https://www.npmjs.com/package/npm).

## Installation

To make the package available in the shell as standalone command, it requires a global installation

```shell
npm install -g js-fullstack-boilerplate
```

# Getting Started - Local Development

When called, the package prepares and pre-compiles the required folder structure and file structure to develop a React-based frontend and a NodeJS backend.

The command starts a questionnaire that selects the available options for the frontend (styling system, state management, testing library, React helmet, routing, Storybook, Docz) and backend (express, koa).

The following command prompts the start of the creation of a fullstack app in the current directory:

```shell
create-fullstack-app <"app-name">
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

## Frontend

The environment created uses [WebPack](https://webpack.github.io/) to pack the application, and [npm](https://www.npmjs.com/)/[yarn](https://yarnpkg.com/en/) script to automatize the process.

### Options

### Getting Started

### Notes

## Backend

### Options

### Getting Started

### Notes
