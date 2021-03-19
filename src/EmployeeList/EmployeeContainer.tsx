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

export type queryParamsType = {
    q: string,
    page: number,
    limit: number
}

function prepareDefaultQueryParams(): queryParamsType {

    const query = new URLSearchParams(useLocation().search);

    // const page = query.get("page");

    return {
        q: query.get("q") || '',
        // page: typeof page === null ? 1 : typeof query.get("page") === 'string'? parseInt(query.get("page")): query.get("page"),
        page: typeof query.get("page") === null ? parseInt(query.get("page") as string) : 1,
        limit: typeof query.get("limit") === null ? parseInt(query.get("page") as string) : 5
    }
}

const useStyles = makeStyles((theme) => ({
    layout: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

const EmployeeContainer = () => {

    let defaultQueryParam: queryParamsType = prepareDefaultQueryParams();

    function cleanQuery(urlQuery: string | null) {
        if (typeof urlQuery === null) {
            return 1
        } else if (typeof urlQuery === 'string') {
            return parseInt(urlQuery)
        } else {
            return urlQuery
        }
    }

    const dispatch = useDispatch()
    const employees = useSelector(employeesSelector)
    const [isWorkerModal, setIsAddWorkerModal] = useState(false)
    const [queryParams, setQueryParams] = useState<queryParamsType>(defaultQueryParam)
    const [employee, setEmployee] = useState({
        name: '',
        duty: '',
        salary: 0,
        kids: 0
    })
    const [needLoading, setNeedLoading] = useState(true);
    const [employeeCount, setEmployeeCount] = useState()
    const [isSearched, setIsSearched] = useState(false)
    const history = useHistory()
    const classes = useStyles();


    const loadEmployee = useCallback(
        () => {
            dispatch(loadEmployeesWithQueryAction(queryParams))

            // dispatch(loadEmployeeTotalCountAction()).then((res: any) => {
            //     setEmployeeCount(res)
            // }).then(() => {
            //     dispatch(loadEmployeesWithQueryAction(queryParams))
            //     dispatch(search(queryParams.q)).then((res: any) => {
            //         setEmployeeCount(res)
            //         if (queryParams.page !== null && (queryParams.page > (res / (queryParams.limit === null ? 5 : typeof queryParams.limit === 'string' ? parseInt(queryParams.limit) : queryParams.limit)))) {
            //             setQueryParams({...queryParams, 'page': 0})
            //         }
            //     })
            //
            //
            // }).then(() => {
            //     history.push(`/employees?q=${queryParams.q}&page=${queryParams.page + 1}&limit=${queryParams.limit}`)
            // })

        },
        [queryParams],
    );

    const replaceUrl = useCallback(() => {
        let newUrl = `/employees`;
        const newSearchParams = new URLSearchParams();

        if (JSON.stringify(defaultQueryParam) !== JSON.stringify(queryParams)) {
            (Object.keys(queryParams) as Array<keyof queryParamsType>)
                .forEach((key) => {
                    if (queryParams[key] !== defaultQueryParam[key]) {
                        newSearchParams.append(key, queryParams[key] as string)
                    }
                })
            newUrl += '?' + newSearchParams.toString()
            // return history.push(`/employees?q=${queryParams.q}&page=${queryParams.page}&limit=${queryParams.limit}`)
        }

        history.push(newUrl)
    }, [queryParams, defaultQueryParam])

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
                    needLoading={needLoading}

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