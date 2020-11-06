const started = Date.now()

export default async (req, res) => ({
  data: {
    uptime: Date.now() - started + 'ms'
  },
  status: 200
})