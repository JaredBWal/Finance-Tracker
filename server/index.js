const express = require('express')
const mongoose = require('mongoose')

const app = express()
mongoose.connect('mongodb+srv://jaredbwal:u5YMHzl6ZuohuYir@cluster0.8nbdcsh.mongodb.net/financeTrackerDatabase?retryWrites=true&w=majority')



app.get("/getFinanceProducts")

app.listen(3002, () => {
    console.log("SERVER IS UP")
})

