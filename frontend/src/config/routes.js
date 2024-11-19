import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// landing components
import Main from "../components/Main";
import Login from "../components/children/Login";
import Register from "../components/children/Register";
// manager components
import Manager from "../components/Manager";
import ManagerHome from "../components/children/ManagerHome";
import ManagerEmployeeAll from "../components/children/ManagerEmployeeAll";
import ManagerSchedulesCreate from "../components/children/ManagerSchedulesCreate";
// employee components
import Employee from "../components/Employee.js";
import EmployeeHome from "../components/children/EmployeeHome";

const routes = (
  <Router>
    <Main>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/manager" element={<Manager />}>
          <Route path="employeeAll" element={<ManagerEmployeeAll />} />
          <Route path="schedulesCreate" element={<ManagerSchedulesCreate />} />
          <Route index element={<ManagerHome />} />
        </Route>
        <Route path="/employee" element={<Employee />}>
          <Route index element={<EmployeeHome />}  />
        </Route>
      </Routes>

    </Main>
  </Router>
);

export default routes;