mongoose = require('mongoose')

const FinanceProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    annual_occurrence: {
        type: Number,
        required: true,
    }
})


const FinanceProduceModel = mongoose.model("finance_products", FinanceProductsSchema)

modeule.exports = FinanceProduceModel