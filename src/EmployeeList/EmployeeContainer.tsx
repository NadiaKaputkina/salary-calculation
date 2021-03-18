import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
    addEmployeeAction,
    deleteEmployeeAction,
    loadEmployeeTotalCountAction,
    loadEmployeesWithQueryAction,
} from "./employeesAction";
import { employeesSelector } from "./employeesSelector";
import { addRandomEmployeeAction } from "../shared/utils/addRandomData";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import EmployeeModal from "./modal/EmployeeModal";
import EmployeeTable from "./ui/EmployeeTable";
import TableActionButtons from "./ui/TableActionButtons";
import BasicSearchField from "./ui/BasicSearchField";
import { makeStyles } from "@material-ui/core";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const useStyles = makeStyles((theme) => ({
    layout: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

const EmployeeContainer = () => {

    let query = useQuery();

    const dispatch = useDispatch()
    const employees = useSelector(employeesSelector)
    const [isWorkerModal, setIsAddWorkerModal] = useState(false)
    const [queryParams, setQueryParams] = useState({
        q: query.get("q") === null ? '' : `${query.get("q")}`,
        page: query.get("page") === null ? 0 : `${query.get("page")}`,
        limit: query.get("limit") === null ? 5 : `${query.get("limit")}`,
    })
    const [employee, setEmployee] = useState({
        name: '',
        duty: '',
        salary: 0,
        kids: 0
    })
    const [isLoading, setIsLoading] = useState(true);
    const [employeeCount, setEmployeeCount] = useState(10)
    const [isSearched, setIsSearched] = useState(false)
    const history = useHistory()
    const classes = useStyles();


    const loadEmployee = useCallback(
        () => {
            console.log('queryParams', queryParams)
            dispatch(loadEmployeesWithQueryAction(queryParams))
            dispatch(loadEmployeeTotalCountAction())
        },
        [queryParams],
    );

    useEffect(() => {
        loadEmployee()
    }, [queryParams]);

     const handleAddEmployeeButton = () => {
        setIsAddWorkerModal(true)
    }
    const handleCloseAddWorkerModal = () => {
        setIsAddWorkerModal(false)
    }
    const handleAddWorkerModal = () => {
        dispatch(addEmployeeAction(employee))
        setIsAddWorkerModal(false)
    }
    const handleChange = (prop: string) => (event: any) => {
        setEmployee({...employee, [prop]: event.target.value});
    };

    const handleChangeQueryProp = (prop: string) => (event: any) => {
        setQueryParams({...queryParams, [prop]: event.target.value});
    };


    const handleDeleteButton = (id: number) => (event: any) => {

        dispatch(deleteEmployeeAction(id))
    }

    const handleAddRandomEmployeeButton = () => {

        dispatch(addRandomEmployeeAction())
    }

    return (
        <>
            <div
                className={classes.layout}
            >
                <BasicSearchField
                    isSearched={isSearched}
                    setIsSearched={setIsSearched}
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                    employeeCount={employeeCount}
                    setEmployeeCount={setEmployeeCount}
                />
                <EmployeeTable
                    isSearched={isSearched}
                    handleDeleteButton={handleDeleteButton}
                    employees={employees}
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                    handleChangeQueryProp={handleChangeQueryProp}
                    loadEmployee={loadEmployee}
                    employeeCount={employeeCount}

                />
                <TableActionButtons
                    handleAddEmployeeButton={handleAddEmployeeButton}
                    handleAddRandomEmployeeButton={handleAddRandomEmployeeButton}
                />
            </div>
            <EmployeeModal
                {...{
                    isWorkerModal,
                    handleCloseAddWorkerModal,
                    handleChange,
                    handleAddWorkerModal
                }}
            />
        </>
    )
}

export default EmployeeContainer