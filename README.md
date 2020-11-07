# Koios

## Overview

`Koios` is a tool that allows you to quickly create HTTP Servers in Node.
It is opinionated in all the right ways and flexible to allow you to have
the API you need to solve your problems.

It helps you build [OpenAPI](https://swagger.io/specification/) Compliant APIs
that are validated both on the incoming body but the outgoing ones as well.

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

- **Start the System in Development Mode**
  - Command: `yarn dev`
  - Ex:
  ```shell
  yarn dev
  ```

- **Create a Variable Route**
  - Command: `yarn create-route --flags route/:var/path/:bar`
  -- Ex:
  ```shell
  yarn create-route \
    --routes-dir /my/routes/path \
    --templates-dir /my/templates/path \
    --version 1 \
    --method get \
    route/path/:var
  ```