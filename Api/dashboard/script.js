const API = "https://seu-site.vercel.app/?apikey=123456"

fetch(API)
  .then(res => res.json())
  .then(data => {
    document.getElementById("status").innerText = data.status ? "Online" : "Offline"
    document.getElementById("user").innerText = data.user
    document.getElementById("plan").innerText = data.plano
    document.getElementById("usage").innerText = data.uso
  })
  .catch(() => {
    document.getElementById("status").innerText = "Erro"
  })
