const requests = {}

export function rateLimit(req, res, next) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress

  const now = Date.now()
  const windowTime = 10000 // 10s
  const max = 20

  if (!requests[ip]) {
    requests[ip] = []
  }

  requests[ip] = requests[ip].filter(t => now - t < windowTime)

  if (requests[ip].length >= max) {
    return res.status(429).json({
      status: false,
      error: "Muitas requisições"
    })
  }

  requests[ip].push(now)
  next()
}
