# Koios

# Scripts

There are some CLI scripts you can use to make it easier to create
resources and handlers

- Create a Route
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