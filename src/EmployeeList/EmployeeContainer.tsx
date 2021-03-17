import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
    addEmployeeAction,
    deleteEmployeeAction,
    loadEmployeeTotalCountAction, loadEmployeesWithQueryAction,
    search
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
    const employees = useSelector(employeesSelector)
    const [isWorkerModal, setIsAddWorkerModal] = useState(false)
    // const [searchText, setSearchText] = useState(query.get("q") === null ? '' : `${query.get("q")}`)
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
    // const [rowsPerPage, setRowsPerPage] = React.useState(query.get("_page") === null ? 5 : `${query.get("_page")}`);
    // const [page, setPage] = React.useState(query.get("_limit") === null ? 0 : `${query.get("_limit")}`);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory()
    const classes = useStyles();

//TODO move this effect to modal

//     useEffect(() => {
//         dispatch(loadWorkersAction())
//         dispatch(loadWorkersActionWithQuery({
//             q: searchText.q,
//             _page: page,
//             _limit: rowsPerPage
//         }))
//     }, [isWorkerModal])

    // useEffect(() => {
    //     dispatch(loadWorkersActionWithQuery({
    //         q: searchText.q,
    //         _page: page,
    //         _limit: rowsPerPage
    //     }))
    // }, [page, rowsPerPage, searchText])

    // useEffect(() => {
    //     if (searchText.q.length > 0) {
    //         history.push(`employees?q=${searchText.q}&_page=${page}&_limit=${rowsPerPage}`)
    //     } else if (searchText.q.length === 0) {
    //         history.push('employees')
    //     }
    //
    //     dispatch(loadWorkersActionWithQuery({
    //         q: searchText.q,
    //         _page: page,
    //         _limit: rowsPerPage
    //     }))
    //
    //     dispatch(search(searchText.q)).then((res: any) => {
    //         dispatch({
    //             type: WORKERS_LOAD,
    //             payload: res
    //         })
    //     })
    // }, [searchText, rowsPerPage, page])

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

    const handleChangeRowsPerPage = (event: any) => {
        // setRowsPerPage(parseInt(event.target.value, 10));
        // setPage(0);
        // loadEmployee()
    };

    const handleChangePage = (event: any, newPage: any) => {
        // setPage(newPage);
    };

    return (
        <>
            <div
                className={classes.layout}
            >
                <BasicSearchField
                    queryParams={queryParams}
                />
                <EmployeeTable
                    handleDeleteButton={handleDeleteButton}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleChangePage={handleChangePage}
                    employees={employees}
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                    handleChangeQueryProp={handleChangeQueryProp}
                    loadEmployee={loadEmployee}

                />
                {/*<Paginator />*/}
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