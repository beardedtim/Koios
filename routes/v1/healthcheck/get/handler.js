const start = Date.now()

/**
 * @type {import('../../../../system/middleware/route').Handler}
 */
export default (req, res) => ({
  data: {
    uptime: Date.now() - start + 'ms',
  },
  status: 200,
})
