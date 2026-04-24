import express from "express"

import dashboard from "./routes/dashboard.js"
import downloads from "./routes/downloads.js"
import consultas from "./routes/consultas.js"

import { auth } from "./middlewares/auth.js"
import { rateLimit } from "./middlewares/rateLimit.js"

const app = express()

app.use(express.json())

// protege tudo
app.use(auth)

app.get("/", (req, res) => {
  res.json({
    status: true,
    user: req.user.name,
    plano: req.user.plan,
    uso: `${req.user.used}/${req.user.limit}`
  })
})

export default app
