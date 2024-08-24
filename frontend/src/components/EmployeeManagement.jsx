import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import { GetAllEmployees } from "../api";
import AddEmployee from "./AddEmployee";


function EmployeeManagement() {
  const [showModal, setShowModal] = useState(false);
  const [employeeObj, setEmployeeObj] = useState(null);
  const [employeesData, setEmployeesData] = useState({
    employees: [],
    pagination: {
      currentPage: 1,
      pageSize: 5,
      totalEmployees: 0,
      totalPages: 0,
    },
  });

  const fetchEmployees = async (search = "", page = 1, limit = 5) => {
    try {
      const data = await GetAllEmployees(search, page, limit);
      setEmployeesData(data);
    } catch (err) {
      alert("Error", err);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    fetchEmployees(e.target.value);
  };

  const handleUpdateEmployee = async (emp) => {
    setEmployeeObj(emp);
    setShowModal(true);
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3">
      <h1>Employee Management App</h1>
      <div className="w-100 d-flex justify-content-center">
        <div className="w-80 border bg-light p-3" style={{ width: "80%" }}>
          <div className="d-flex justify-content-between mb-3">
            <button onClick={() => setShowModal(true)} className="btn btn-primary">Add</button>
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search Employees..."
              className="form-control w-50"
            />
          </div>
          <EmployeeTable 
            employees={employeesData.employees}
            pagination={employeesData.pagination}
            fetchEmployees={fetchEmployees}
            handleUpdateEmployee={handleUpdateEmployee}
          />
          <AddEmployee
            fetchEmployees={fetchEmployees}
            showModal={showModal}
            setShowModal={setShowModal}
            employeeObj={employeeObj}
          />
        </div>
      </div>
    </div>
  );
}

export default EmployeeManagement;
