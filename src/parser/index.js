import yml from 'js-yaml'
import fs from 'fs/promises'

const parse_yml = async filePath => {
  const file = await fs.readFile(filePath)
  
  return yml.load(file, {})
}

export const parse = async filePath => {
  const parsed = await parse_yml(filePath)

  return parsed
}