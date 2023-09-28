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


const FinanceProductModel = mongoose.model("finance_products", FinanceProductsSchema)

module.exports = FinanceProductModel