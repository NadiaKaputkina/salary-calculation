import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
} from 'react-router-dom'
import './App.css';
import './index.css'
import {
    CssBaseline,
} from '@material-ui/core';

import Home from "./app/pages/home/home";
import Employees from "./app/pages/employees/employees";
import ReportCards from "./app/pages/reportCards/reportCards";
import SalaryTables from "./app/pages/salaryTables/salaryTables";
import Reports from "./app/pages/reports/reports";
import NavigationDrawer from "./app/shared/components/navigationDrawer/navigationDrawer";
import ApplicationBar from "./app/shared/components/applicationBar/applicationBar";
import { useAppBarStyles } from "./app/shared/styles/rootStyles";
import Login from "./app/pages/login/login";

export default function App() {
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const classes = useAppBarStyles();
    return (
        <div className={classes.root}>
            <Router>
                <CssBaseline/>
                <ApplicationBar
                    open={open}
                    handleDrawerOpen={handleDrawerOpen}
                />
                <NavigationDrawer
                    open={open}
                    handleDrawerClose={handleDrawerClose}
                />
                <div className={classes.layout}>
                    <Route path="/login" component={Login}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/employees" component={Employees}/>
                    <Route path="/reportCards" component={ReportCards}/>
                    <Route path="/salaryTables" component={SalaryTables}/>
                    <Route path="/reports" component={Reports}/>
                    <Route path="/" render={() => <Redirect to="/home"/>} exact={true}/>
                </div>
            </Router>
        </div>

    );
}
