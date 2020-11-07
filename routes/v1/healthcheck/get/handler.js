const start = Date.now()
/**
 * 
 */
export default (req, res) => ({
  data: {
    uptime: Date.now() - start + 'ms',
  },
  status: 200,
})
