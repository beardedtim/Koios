const started = Date.now();

export default async (_, __) => ({
  data: {
    uptime: Date.now() - started + "ms",
  },
  status: 200,
});
