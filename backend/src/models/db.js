const mongoose = require('mongoose')
const url = process.env.DB_URL

mongoose.connect(url).then(() => {
    console.log("Database connected successfully.")
}).catch((err) => console.log("Error in connecting with databse->", err))