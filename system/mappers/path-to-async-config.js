import path from 'path'
import fs from 'fs/promises'
import glob from 'glob'
import yml from 'js-yaml'
import R from 'ramda'

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

const route_from_path = (dir, path) =>
  path
    .replace(dir, '')
    .replace('/config.yml', '')
    .split('/')
    .map((segment) =>
      segment.indexOf(':') === 0 ? `{${segment.slice(1)}}` : segment
    )
    .join('/')

const job_schema_from_confgi = ({ input } = {}) => {
  if (!input) {
    return
  }

  const { body } = input
  const description = body.description

  delete body.description

  return {
    description,
    ...body
  }
}

const get_configs_from_path = async (dir_path) => {

  const config_paths = await get_files_matching_pattern(
    `${dir_path}/**/config.yml`
  )

  return Promise.all(config_paths.map((f) => fs.readFile(f, 'utf8')))
    .then((files) => {
      return files.map(yml.load)
    })
    .then((files) =>
      files.map((config, i) => ({ config, path: config_paths[i] }))
    )
    .then((files) =>
      files.reduce((acc, { config = {}, path }) => {
        const channel_pieces = route_from_path(dir_path, path).split('/')

        channel_pieces.shift()
        
        const channel = channel_pieces.join('/')
        const jobSchema = job_schema_from_confgi(config)

        return {
          ...acc,
          [channel]: {
            subscribe: {
              tags: config.tags.map(tag => ({ name: tag })),
              operationId: config.name,
              description: config.description,
              summary: config.summary,
              message: {
                payload: {
                  type: 'object',
                  required: ['type', 'payload'],
                  properties: {
                    type: {
                      type: 'string'
                    },
                    payload: {
                      type: 'object',
                      properties: jobSchema
                    }
                  }
                }
              }
            }
          }
        }
      }, {})
    )
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
