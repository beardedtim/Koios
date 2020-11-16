export default () => (req, res, next) => {
    // Let's remove some non-needed headers that
    // might hurt is in the future
    res.removeHeader('X-Powered-By')
    res.removeHeader('Server')

    return next()
}