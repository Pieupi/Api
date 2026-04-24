import jwt from "jsonwebtoken"
const SECRET = "supersecret" // depois joga em ENV

export function sign(data) {
  return jwt.sign(data, SECRET, { expiresIn: "1d" })
}

export function verify(token) {
  return jwt.verify(token, SECRET)
}
