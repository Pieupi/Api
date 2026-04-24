
import fs from "fs"

const DB_PATH = "./api/database/users.json"

export function auth(req, res, next) {
  const key = req.query.apikey

  if (!key) {
    return res.status(401).json({
      status: false,
      error: "API KEY obrigatória"
    })
  }

  const users = JSON.parse(fs.readFileSync(DB_PATH))
  const user = users.find(u => u.apikey === key)

  if (!user) {
    return res.status(403).json({
      status: false,
      error: "API KEY inválida"
    })
  }

  if (user.used >= user.limit) {
    return res.status(429).json({
      status: false,
      error: "Limite atingido"
    })
  }

  // aumenta uso
  user.used += 1

  // salva
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2))

  // injeta user na req
  req.user = user

  next()
}
