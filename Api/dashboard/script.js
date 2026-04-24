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


let token = ""

async function login(){
  const user = document.getElementById("user").value
  const pass = document.getElementById("pass").value

  const res = await fetch("/admin/login", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({user, pass})
  })

  const data = await res.json()

  token = data.token
  document.getElementById("painel").style.display = "block"
  loadUsers()
}

async function loadUsers(){
  const res = await fetch("/admin/users", {
    headers:{ Authorization: "Bearer " + token }
  })

  const data = await res.json()
  document.getElementById("lista").innerText = JSON.stringify(data, null, 2)
}

async function criar(){
  await fetch("/admin/create", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:"Bearer "+token
    },
    body: JSON.stringify({
      name:"Novo",
      plan:"free",
      limit:50
    })
  })

  loadUsers()
}
