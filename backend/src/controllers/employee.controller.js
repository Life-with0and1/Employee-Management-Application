const employeeModel = require("../models/employee.model.js");

const addEmployee = async (req, res) => {
    try {
        const body = req.body;
        body.avatar = req.file ? req.file.path : null;
        const existingEmployee = await employeeModel.findOne({ email: body.email });
        if (existingEmployee) {
            return res.status(400).json({ message: "Email already exists.", success: false });
        }
        await employeeModel.create(body);
        res.status(201).json({ message: "Employee added.", success: true });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists.", success: false });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};


const getEmployees = async (req, res) => {
    try {
        let {page, limit, search} = req.query
        page = parseInt(page) || 1
        limit = parseInt(limit) || 5
        const skip = (page - 1) * limit
        let searchCriteria = {}
        if (search) {
            searchCriteria = {
                name: {
                    $regex: search,
                    $options: 'i'
                }
            }
        }
        const total = await employeeModel.countDocuments(searchCriteria)
        const emp = await employeeModel.find(searchCriteria)
            .skip(skip)
            .limit(limit)
            .sort({ updated: -1 })
        const totalPages = Math.ceil(total / limit)
        res.status(200).json({
            data: {
                employees: emp,
                pagination: {
                    total,
                    currentPage: page,
                    totalPages,
                    pageSize: limit
                }
            }, success: true
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false })
    }
}

const getEmployeeById = async (req, res) => {
    try {
        const id = req.params.id;
        const emp = await employeeModel.findOne({ _id: id });
        res.status(200)
            .json({
                message: 'Employee Details',
                success: true,
                data: emp
            });
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        })
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        await employeeModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Employee deleted.", success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { name, phone, email, salary, department } = req.body
        const id = req.params.id
        let updatedData = {
            name, phone, email, salary, department, updatedAt: new Date()
        }
        if (req.file) updatedData.avatar = req.file.path
        const data = await employeeModel.findByIdAndUpdate(id, updatedData, { new: true })
        res.status(201).json({ message: "Employee updated.", data, success: true })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false })
    }
}

module.exports = {
    addEmployee,
    getEmployees,
    getEmployeeById,
    deleteEmployee,
    updateEmployee
}