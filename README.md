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