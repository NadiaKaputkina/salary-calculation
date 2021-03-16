import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
    addEmployeeAction,
    deleteEmployeeAction,
    loadWorkersAction,
    search
} from "./employeesAction";
import { selectWorkers } from "./employeesSelector";
import { addRandomEmployeeAction } from "../shared/utils/addRandomData";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { WORKERS_LOAD } from "./employeesReducer";
import EmployeeModal from "./modal/EmployeeModal";
import EmployeeTable from "./ui/EmployeeTable";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const EmployeeContainer = () => {

    let query = useQuery();

    const dispatch = useDispatch()
    const workers = useSelector(selectWorkers)
    const [isWorkerModal, setIsAddWorkerModal] = useState(false)
    const [searchText, setSearchText] = useState(query.get("q") === null ? '' : `${query.get("q")}`)
    const [employee, setEmployee] = useState({
        name: '',
        duty: '',
        salary: 0,
        kids: 0
    })
    const history = useHistory()

    useEffect(() => {
        dispatch(loadWorkersAction())
    }, [isWorkerModal])

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

    return (
        <>
            <EmployeeTable
                setSearchText={setSearchText}
                handleDeleteButton={handleDeleteButton}
                handleAddEmployeeButton={handleAddEmployeeButton}
                handleAddRandomEmployeeButton={handleAddRandomEmployeeButton}
                workers={workers}
            />
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