import express from "express"

import dashboard from "./routes/dashboard.js"
import downloads from "./routes/downloads.js"
import consultas from "./routes/consultas.js"
import { auth } from "./middlewares/auth.js"
import admin from "./routes/admin.js"
import media from "./routes/media.js"

import { auth } from "./middlewares/auth.js"
import { rateLimit } from "./middlewares/rateLimit.js"

const app = express()

app.use(express.json())

// protege tudo

/ rotas admin (sem apikey)
app.use("/admin", admin)

// rotas públicas protegidas por apikey
app.use("/media", auth, media)

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
