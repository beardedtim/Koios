# Koios

## Overview

`Koios` is a tool that allows you to quickly create HTTP Servers in Node.
It is opinionated in all the right ways and flexible to allow you to have
the API you need to solve your problems.

## Scripts

There are some CLI scripts you can use to make it easier to create
resources and handlers:

- **Create a Route**
  - Command: `yarn create-route --help`
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