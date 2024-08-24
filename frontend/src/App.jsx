import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EmployeeManagement from "./components/EmployeeManagement";
import EmployeeDetails from "./components/EmployeeDetails";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer />
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Navigate to="employee" />} />
            <Route path="/employee" element={<EmployeeManagement />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
