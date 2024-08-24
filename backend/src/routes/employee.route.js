const express = require('express')
const { addEmployee, getEmployees, deleteEmployee, updateEmployee, getEmployeeById } = require('../controllers/employee.controller')
const { cloudinaryUploader } = require('../middlewares/fileUploader.middleware')
const Router = express.Router()

Router.post("/add", cloudinaryUploader.single('avatar'), addEmployee)

Router.get("/get", getEmployees)

Router.get("/get/:id", getEmployeeById)

Router.delete("/delete/:id", deleteEmployee)

Router.put("/update/:id", cloudinaryUploader.single('avatar'), updateEmployee)


module.exports = {
    Router
}