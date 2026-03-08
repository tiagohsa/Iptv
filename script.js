async function pagar(valor,idNome,idWhatsapp){
const nome = document.getElementById(idNome).value
const whatsapp = document.getElementById(idWhatsapp).value

if(!nome || !whatsapp){
alert("Preencha nome e WhatsApp")
return
}

const res = await fetch("http://localhost:3000/criar-pix",{
method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify({nome,whatsapp,valor})
})

const dados = await res.json()

window.location.href = dados.urlPix
}