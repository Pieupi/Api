import express from "express"
import { success, error } from "../utils/response.js"

const router = express.Router()

router.get("/cep", (req, res) => {
  const { cep } = req.query

  if (!cep) return error(res, "Informe o CEP")

  return success(res, {
    cep,
    cidade: "Exemplo",
    estado: "BR"
  })
})

export default router
