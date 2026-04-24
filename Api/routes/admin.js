import express from "express"
import fs from "fs"
import { sign } from "../utils/jwt.js"
import { adminAuth } from "../middlewares/adminAuth.js"
import { nanoid } from "nanoid"

const router = express.Router()
const DB = "./api/database/users.json"

// login simples (troca depois por algo melhor)
router.post("/login", (req, res) => {
  const { user, pass } = req.body

  if (user === "admin" && pass === "123") {
    return res.json({ token: sign({ user }) })
  }

  res.status(401).json({ error: "Login inválido" })
})

// listar usuários
router.get("/users", adminAuth, (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB))
  res.json(data)
})

// criar key
router.post("/create", adminAuth, (req, res) => {
  const { name, plan, limit } = req.body
  const users = JSON.parse(fs.readFileSync(DB))

  const newUser = {
    name,
    apikey: nanoid(10),
    plan,
    limit,
    used: 0
  }

  users.push(newUser)
  fs.writeFileSync(DB, JSON.stringify(users, null, 2))

  res.json(newUser)
})

// deletar
router.delete("/delete/:key", adminAuth, (req, res) => {
  let users = JSON.parse(fs.readFileSync(DB))
  users = users.filter(u => u.apikey !== req.params.key)

  fs.writeFileSync(DB, JSON.stringify(users, null, 2))
  res.json({ ok: true })
})

export default router
