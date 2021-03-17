import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
    addEmployeeAction,
    deleteEmployeeAction,
    loadWorkersAction, loadWorkersActionWithQuery,
    search
} from "./employeesAction";
import { selectWorkers, selectWorkersQuery } from "./employeesSelector";
import { addRandomEmployeeAction } from "../shared/utils/addRandomData";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { WORKERS_LOAD } from "./employeesReducer";
import EmployeeModal from "./modal/EmployeeModal";
import EmployeeTable from "./ui/EmployeeTable";
import TableActionButtons from "./ui/TableActionButtons";
import BasicSearchField from "./ui/BasicSearchField";
import { makeStyles } from "@material-ui/core";
import Paginator from "./ui/Paginator";

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
    const workers = useSelector(selectWorkers)
    const workersQuery = useSelector(selectWorkersQuery)
    console.log('workers', workers)
    const [isWorkerModal, setIsAddWorkerModal] = useState(false)
    const [searchText, setSearchText] = useState(query.get("q") === null ? '' : `${query.get("q")}`)
    const [employee, setEmployee] = useState({
        name: '',
        duty: '',
        salary: 0,
        kids: 0
    })
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const history = useHistory()
    const classes = useStyles();

    useEffect(() => {
        dispatch(loadWorkersAction())
        dispatch(loadWorkersActionWithQuery({
            _page: page,
            _limit: rowsPerPage
        }))
    }, [isWorkerModal])
    useEffect(() => {
        dispatch(loadWorkersActionWithQuery({
            _page: page,
            _limit: rowsPerPage
        }))
    },[page, rowsPerPage])

    useEffect(() => {
        if (searchText.length > 0) {
            history.push(`employees?q=${searchText}`)
        } else if (searchText.length === 0) {
            history.push('employees')
        }

        dispatch(search(searchText)).then((res: any) => {
            dispatch({
                type: WORKERS_LOAD,
                payload: res
            })
        })
    }, [searchText])

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

    const handleDeleteButton = (id: number) => (event: any) => {

        dispatch(deleteEmployeeAction(id))
    }

    const handleAddRandomEmployeeButton = () => {

        dispatch(addRandomEmployeeAction())
    }

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        dispatch(loadWorkersActionWithQuery({
            _page: page,
            _limit: rowsPerPage
        }))
    };

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    return (
        <>
            <div
            className={classes.layout}
            >
                <BasicSearchField
                    {...{setSearchText}}
                />
                <EmployeeTable
                    setSearchText={setSearchText}
                    handleDeleteButton={handleDeleteButton}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleChangePage={handleChangePage}
                    page={page}
                    workers={workers}
                />
                <Paginator />
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