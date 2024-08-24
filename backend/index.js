const express = require('express')
const { Router } = require('./src/routes/employee.route.js')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000
require('./src/models/db')
const cors= require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api/employee",Router)

app.listen((PORT), () => {
    console.log("Server running at port:", PORT)
}) 