const fetch = require("node-fetch")
const fs = require("fs")
const clientesFile = "../banco/clientes.json"
const API_KEY = "$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjEyOTFmNmVmLTZmYzgtNDhlYy05YTVmLWJiZGYyODkxZGQwOTo6JGFhY2hfMTI5MGNiYWUtNjIwNS00M2U2LTg4ZWYtYjlkYTdhY2Y1YjI5"

async function criarPix(nome,whatsapp,valor){
const resp = await fetch("https://www.asaas.com/api/v3/payments",{
method:"POST",
headers:{
"Content-Type":"application/json",
"access_token":API_KEY
},
body:JSON.stringify({
billingType:"PIX",
value:valor,
description:"Plano AliePlay",
externalReference:whatsapp
})
})
const dados = await resp.json()
return dados.invoiceUrl
}

function webhook(evento){
if(evento.event === "PAYMENT_RECEIVED"){
const cliente = {
nome:evento.payment.customerName,
whatsapp:evento.payment.externalReference,
plano:evento.payment.description,
login:"user"+Date.now(),
senha:Math.random().toString(36).slice(-6)
}
let clientes = []
if(fs.existsSync(clientesFile)) clientes = JSON.parse(fs.readFileSync(clientesFile))
clientes.push(cliente)
fs.writeFileSync(clientesFile,JSON.stringify(clientes,null,2))

// Enviar WhatsApp automático (usando link direto)
const numero = cliente.whatsapp.replace(/\D/g,'')
console.log(`https://api.whatsapp.com/send?phone=${numero}&text=Olá ${cliente.nome}, seu login IPTV: ${cliente.login}, senha: ${cliente.senha}`)
}
}

module.exports = {criarPix,webhook}