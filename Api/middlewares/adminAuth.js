import { verify } from "../utils/jwt.js"

export function adminAuth(req, res, next) {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ error: "Sem token" })
  }

  try {
    const data = verify(token.replace("Bearer ", ""))
    req.admin = data
    next()
  } catch {
    return res.status(403).json({ error: "Token inválido" })
  }
}
