import * as Errors from '../errors/index.js'

/**
 * Throws error when ran to ensure we return an
 * error when there is not a method implemented for
 * that route
 */
export default () => (req, res, next) => {
    return next(new Errors.MethodNotImplemented(req.method))
}