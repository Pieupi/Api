import express from "express"

import dashboard from "./routes/dashboard.js"
import downloads from "./routes/downloads.js"
import consultas from "./routes/consultas.js"

import { auth } from "./middlewares/auth.js"
import { rateLimit } from "./middlewares/rateLimit.js"

const app = express()

app.use(express.json())

// Middlewares globais
app.use(rateLimit)
app.use(auth)

// Rotas
app.use("/dashboard", dashboard)
app.use("/download", downloads)
app.use("/consultas", consultas)

app.get("/", (req, res) => {
  res.json({
    status: true,
    name: "NewGen API",
    online: true
  })
})

export default app
