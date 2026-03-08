const express = require("express")
const cors = require("cors")
const pagamentos = require("./pagamentos")

const app = express()
app.use(cors())
app.use(express.json())

app.post("/criar-pix", async (req,res)=>{
const {nome, whatsapp, valor} = req.body
try{
const url = await pagamentos.criarPix(nome,whatsapp,valor)
res.json({urlPix:url})
}catch(e){
console.log(e)
res.status(500).send("Erro ao criar Pix")
}
})

app.post("/webhook", async (req,res)=>{
pagamentos.webhook(req.body)
res.sendStatus(200)
})

app.listen(3000,()=>console.log("Backend rodando na porta 3000"))