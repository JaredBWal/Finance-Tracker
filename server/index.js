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

app.patch("/editFinanceProduct", async(req, res) => {
    const updated_fields = req.body
    id = updated_fields.id

    const product = await FinanceProductModel.findByIdAndUpdate(id, req.body, {new:true})
    res.json(product)
})


app.delete("/removeFinanceProductWithId/:id", async(req, res) => {
    const productId = req.params.id
    const result = await FinanceProductModel.findByIdAndRemove(productId, {new:true})
    res.json(result)
})


app.listen(3002, () => {
    console.log("SERVER IS UP")
})

