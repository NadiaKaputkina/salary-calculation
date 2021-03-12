import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
} from 'react-router-dom'
import './App.css';
import './index.css'
import Home from "./pages/home/home";
import Employees from "./pages/employees/employees";
import ReportCards from "./pages/reportCards/reportCards";
import SalaryTables from "./pages/salaryTables/salaryTables";
import Reports from "./pages/reports/reports";
import LoginPage from "./Security/login/LoginPage";
import RegistrationPage from "./Security/registration/RegistrationPage";

export default function App() {

    return (
        <Router>
            <Route path="/login" component={LoginPage}/>
            <Route path="/registration" component={RegistrationPage}/>
            <Route path="/home" component={Home}/>
            <Route path="/employees" component={Employees}/>
            <Route path="/reportCards" component={ReportCards}/>
            <Route path="/salaryTables" component={SalaryTables}/>
            <Route path="/reports" component={Reports}/>
            <Route path="/" render={() => <Redirect to="/login"/>} exact={true}/>
        </Router>
    )
}
