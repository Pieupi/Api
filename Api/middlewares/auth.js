import fs from "fs"

const DB = "./api/database/users.json"

export function auth(req, res, next) {
  const key = req.query.apikey
  if (!key) return res.status(401).json({ error: "API key obrigatória" })

  const users = JSON.parse(fs.readFileSync(DB))
  const user = users.find(u => u.apikey === key)

  if (!user) return res.status(403).json({ error: "Key inválida" })
  if (user.used >= user.limit)
    return res.status(429).json({ error: "Limite atingido" })

  user.used++
  fs.writeFileSync(DB, JSON.stringify(users, null, 2))

  req.user = user
  next()
}
