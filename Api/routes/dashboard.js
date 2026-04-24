import express from "express"
const router = express.Router()

router.get("/", (req, res) => {
  res.json({
    api: "NewGen API",
    status: "online",
    endpoints: [
      "/download",
      "/consultas"
    ]
  })
})

export default router
