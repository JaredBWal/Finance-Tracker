const express = require('express')
const mongoose = require('mongoose')
const FinanceProductModel = require('./models/FinanceProducts')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())


mongoose.connect('mongodb+srv://jaredbwal:'+ process.env.FINANCE_PASS +'@cluster0.8nbdcsh.mongodb.net/financeTrackerDatabase?retryWrites=true&w=majority')



app.get("/getFinanceProducts", async(req, res) => {
    const products = await FinanceProductModel.find({})
    res.json(products)
})

app.post("/createFinanceProduct", async(req, res) => {
    const product = req.body
    const newProduct = new FinanceProductModel(product)
    await newProduct.save()
    res.json(product)

})

app.listen(3002, () => {
    console.log("SERVER IS UP")
})

