const express = require("express")
const fetch = require("node-fetch")

const app = express()

app.use(express.json())

app.post("/pix", async (req,res)=>{

const {valor} = req.body

const pagamento = await fetch("https://api.asaas.com/v3/payments",{

method:"POST",

headers:{
"Content-Type":"application/json",
"access_token":"SUA_API_KEY"
},

body: JSON.stringify({

billingType:"PIX",
value: valor,
description:"Plano AliePlay",

})

})

const dados = await pagamento.json()

res.json({

url:dados.invoiceUrl

})

})

app.listen(3000)