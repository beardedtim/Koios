import { v4 as uuid } from 'uuid'

/**
 * @type {import('../../../../src/middleware/route').Handler}
 */
export default (req, res) => ({
  data: {
    id: uuid(),
    name: req.body.name,
  },
  status: 201,
  headers: {
    'X-Joke': 'my life',
  },
})
