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
import { prepareUrl, queryParamsType } from "../helpers/urlHelpers";
import { HeaderCellIds, Order } from "./ui/SortTableCell";

function prepareDefaultQueryParams(): queryParamsType {

    const query = new URLSearchParams(useLocation().search);


    return {
        q: query.get("q") || '',
        page: typeof query.get("page") === null ? parseInt(query.get("page") as string) : 1,
        limit: typeof query.get("limit") === null ? parseInt(query.get("page") as string) : 5,
        sort: typeof query.get("sort") === null ? query.get("sort") as string : 'asc',
        order: typeof query.get("order") === null ? query.get("order") as string : 'name',
    }
}

const useStyles = makeStyles((theme) => ({
    layout: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

const EmployeeContainer = () => {

    let defaultQueryParams: queryParamsType = prepareDefaultQueryParams();

    const dispatch = useDispatch()
    const employees = useSelector(employeesSelector)
    const [isWorkerModal, setIsAddWorkerModal] = useState(false)
    const [queryParams, setQueryParams] = useState<queryParamsType>(defaultQueryParams)
    const [employee, setEmployee] = useState({
        name: '',
        duty: '',
        salary: 0,
        kids: 0
    })
    const [employeeCount, setEmployeeCount] = useState()
    const [isSearched, setIsSearched] = useState(false)
    const history = useHistory()
    const classes = useStyles();


    const handleRequestSort = useCallback((event: React.MouseEvent<unknown>, name: HeaderCellIds) => {
        const isSameCell = queryParams.order === name
        let currentQueryParams = {...queryParams}

        if (isSameCell) {

            const isAsc = queryParams.sort === 'asc'
            currentQueryParams.sort = isAsc ? 'desc' : 'asc'
        }
        if (!isSameCell) {

            currentQueryParams.order = name
        }

        setQueryParams(currentQueryParams);
    }, [queryParams])

    const loadEmployee = useCallback(
        () => {
            dispatch(loadEmployeesWithQueryAction(queryParams))
        },
        [queryParams],
    );

    const replaceUrl = useCallback(() => {

        let newUrl = prepareUrl('/employees', queryParams, defaultQueryParams)
        history.push(newUrl)
    }, [queryParams, defaultQueryParams])

    useEffect(() => {
        loadEmployee()

        replaceUrl()
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

        setQueryParams({...queryParams, [prop]: parseInt(event.target.value)});
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
                    history={history}
                    isSearched={isSearched}
                    setIsSearched={setIsSearched}
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                    employeeCount={employeeCount}
                    setEmployeeCount={setEmployeeCount}
                />
                <EmployeeTable
                    replaceUrl={replaceUrl}
                    history={history}
                    isSearched={isSearched}
                    handleDeleteButton={handleDeleteButton}
                    employees={employees}
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                    handleChangeQueryProp={handleChangeQueryProp}
                    loadEmployee={loadEmployee}
                    employeeCount={employeeCount}
                    handleRequestSort={handleRequestSort}

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