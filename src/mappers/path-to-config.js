import path from 'path'
import fs from 'fs/promises'
import glob from 'glob'
import yml from 'js-yaml'

const is_relative_path = (f) => f.indexOf('/') !== 0

const get_files_matching_pattern = (pattern) =>
  new Promise((res, rej) => {
    glob(pattern, function (err, files) {
      if (err) {
        rej(err)
      } else {
        res(files)
      }
    })
  })

const route_from_path = (dir, path) => path.replace(dir, '')
  .replace('/config.yml', '')
  .split('/')
  .map(segment => segment.indexOf(':') === 0
    ? `{${segment.slice(1)}}`
    : segment
  ).join('/')

const schema_from_body = body => ({
  type: 'object',
  required: Object.keys(body),
  properties: body
})

const get_configs_from_path = async (dir_path) => {
  const config_paths = await get_files_matching_pattern(
    `${dir_path}/**/+(get|post|patch|put|del|head)/config.yml`
    )

  return Promise.all(
    config_paths.map((f) => fs.readFile(f, 'utf8'))
  ).then((files) => {

    return files.map(yml.load)
  }).then(files => files.map((config, i) => ({ config, path: config_paths[i]} )))
    .then(files => files.reduce((acc, { config, path }) => {
      const route_pieces = route_from_path(dir_path, path).split('/')
      const method = route_pieces.pop()
      const route = route_pieces.join('/')

      return {
        ...acc,
        [route]: {
          [method]: {
            operationId: config.name,
            description: config.description,
            responses: (config.output || []).reduce((acc, output) => {
              return {
                ...acc,
                [output.status]: {
                  content: {
                    "application/json": {
                      schema: schema_from_body(output.body)
                    }
                  }
                }
              }
            }, {})
          }
        }
      }
    }, {}))
}

export default (fP, cP) => {
  let file_path = is_relative_path(fP)
    ? // If it is a relative path, we need
    // to ensure that we assume they meant
    // from the directory that they wrote
    // it in
    path.resolve(cP, '..', fP)
    : // If it is not relative, let's return
    // it as is
    fP

  return get_configs_from_path(file_path)
}
