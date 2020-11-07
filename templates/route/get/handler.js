import { v4 as uuid } from 'uuid'

/**
 *
 */
export default (req, res) => ({
  data: {
    id: uuid(),
  },
  status: 200,
  headers: {
    'X-Joke': 'my life',
  },
})
