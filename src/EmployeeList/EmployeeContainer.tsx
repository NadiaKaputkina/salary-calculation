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
import { HeaderCellIdsType, OrderType } from "./ui/SortTableCell";

const defaultQueryParams: queryParamsType = {
    q: '',
    page: 1,
    limit: 5,
    sort: null,
    order: null
}

function prepareStartQueryParams(): queryParamsType {

    const query = new URLSearchParams(useLocation().search);

    // return Object.keys(defaultQueryParams).reduce((obj: keyof defaultQueryParams, key) => {
    //         obj[key] = query.get(key) === null ? defaultQueryParams[key] : parseInt(query.get(key) as string)
    //     return obj
    // }, {})

    return {
        q: query.get("q") || defaultQueryParams.q,
        page: query.get("page") === null ? defaultQueryParams.page : parseInt(query.get("page") as string),
        limit: query.get("limit") === null ? defaultQueryParams.limit : parseInt(query.get("page") as string),
        sort: query.get("sort") === null ? defaultQueryParams.sort : query.get("sort") as string,
        order: query.get("order") === null ? defaultQueryParams.order : query.get("order") as string,
    }
}

const useStyles = makeStyles((theme) => ({
    layout: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

const EmployeeContainer = () => {

    let startQueryParams: queryParamsType = prepareStartQueryParams();

    const dispatch = useDispatch()
    const employees = useSelector(employeesSelector)
    const [isWorkerModal, setIsAddWorkerModal] = useState(false)
    const [queryParams, setQueryParams] = useState<queryParamsType>(startQueryParams)
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

    const handleRequestSort = useCallback((name: HeaderCellIdsType, order: OrderType) => {
        return (e: React.MouseEvent<unknown>): any => {
            let currentQueryParams = {...queryParams}

            switch (order) {
                case null:
                    currentQueryParams.order = 'asc'
                    currentQueryParams.sort = name
                    break;
                case 'asc':
                    currentQueryParams.order = 'desc'
                    currentQueryParams.sort = name
                    break;
                case 'desc':
                    currentQueryParams.order = null
                    currentQueryParams.sort = null
                    break;
            }

            setQueryParams(currentQueryParams);
        }
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
    }, [queryParams])

    useEffect(() => {
        loadEmployee()

        replaceUrl()
    }, []);

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