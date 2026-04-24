const API_KEYS = ["123456", "abcdef"]

export function auth(req, res, next) {
  const key = req.query.apikey

  if (!key || !API_KEYS.includes(key)) {
    return res.status(401).json({
      status: false,
      error: "API KEY inválida"
    })
  }

  next()
}
