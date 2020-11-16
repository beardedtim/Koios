# Koios

## Overview

`Koios` is a tool that allows you to quickly create HTTP Servers in Node.
It is opinionated in all the right ways and flexible to allow you to have
the API you need to solve your problems.

It helps you build [OpenAPI](https://swagger.io/specification/) Compliant APIs
that are validated both on the incoming body and the outgoing ones as well.
It enforces a contract-based development where the engineer builds the configuration,
describes the inputs and ouputs of the function/HTTP request, and then doesn't allow
a request to return a 2xx HTTP response until the handler passes that configuration.

## Quick Start

```shell
# Clone this repo
git clone git@github.com:beardedtim/Koios.git
# Install deps
yarn
# Create local .env File
cp .env.example .env
# Start System in Development Mode
yarn dev
```

- Go to the [swagger docs](http://localhost:5050/api-docs) and see what routes are available

## Usage

- **Create a Route**
  - Command: `yarn create-route --flags route/path`
  - Ex:
  ```shell
  yarn create-route \
    --routes-dir /my/routes/path \
    --templates-dir /my/templates/path \
    --version 1 \
    --method get \
    route/path
  ```
  - Notes:
    - The path is passed through to `express` as a string. Any value that
    express understands can be used as the path and will be parsed by express
      - This means that URL Parameters are built using express syntax: `foo/:bar`

- **Start the System in Development Mode**
  - Command: `yarn dev`
  - Ex:
  ```shell
  yarn dev
  ```

## Concepts

_**Sub-Systems**_

The complete project is housed inside of the folder `system` and is made up of multiple
`sub-systems` such as `server` or `router`. These `sub-systems` are ways to isolate
functionality similar to a plugin architecture. Please try to house like-minded things with
each other inside of the sub-system they pertain to.

At the core of it, a `sub-system` is a hash of the following data that the system as whole
uses to interact with that `sub-system`'s domian:

```js
{
  name: 'Sub-System_Name',
  create: (projectConfig, configPath, projectMeta) => 
    { /** Whatever return value here is used as the sub-system "value" **/ },
  init: sub_systems =>
    { /** Do whatever work you need on startup after creating all sub-systems **/ }
}
```

You can use the `system/utils/create_sub_system` handler in order to use the Mappers, Parsers, and Server
in the dynamic creation of your sub-system. Please reference `system/server.js` for an example.