/**
 * @typedef {import('express').Request} Req
 */

/**
 * @typedef {import('express').Response} Res
 */

/**
 * @typedef {Object<{ status: number, body: Object<string, *> } } Data
 */

/**
 * @typedef {function(Req, Res): Promise<Data>} Handler
 */


/**
 * @type {function(Handler): import('express').RequestHandler}
 */
export default handler => async (req, res, next) => {
  try {
    const { data, status, headers = {} } = await handler(req, res)
    res.status(status).set(headers).json({ data })
  } catch (e) {
    next(e)
  }
}