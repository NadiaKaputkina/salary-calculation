import {
    Action, ActionCreator,
    Dispatch
} from "redux";

import { ThunkAction } from "redux-thunk";
import * as api from "../api/workers";
import { EMPLOYEES_LOAD_COUNT, EMPLOYEES_LOAD_SUCCESS } from "./employeesReducer";
import { snackShowAction } from "../Snackbar/snackAction";

export const loadEmployeeTotalCountAction: any = () => {
    return async (dispatch: any): Promise<number | undefined> => {
        try {
            const response = await api.loadEmployees()
            const res = await response.json()
            if (res.length > 0) {
                dispatch({
                    type: EMPLOYEES_LOAD_COUNT,
                    payload: res.length
                })
                return parseInt(res.length)
            }

        } catch (e) {
            console.log('e', e)
        }
    }
}

export const loadEmployeesWithQueryAction: ActionCreator<ThunkAction<Promise<Action>, any, void, any>> = (payload: any) => {


    return async (dispatch: Dispatch<Action>): Promise<any> => {
        try {
            const response1 = await api.loadWorkersWithQuery(payload)
            const res1 = await response1.json()

            const response2 =await api.loadTotalCountWithQuery(payload)
            const res2 = await response2.json()
            if (res1.length > 0) {
                dispatch({
                    type: EMPLOYEES_LOAD_SUCCESS,
                    payload: {items: res1, totalCount: res2.length}
                })
            }
        } catch (e) {
            console.log('e', e)
        }
    }
}

export const addEmployeeAction: ActionCreator<ThunkAction<Promise<Action>, any, void, any>> = (payload: any) => {
    return async (): Promise<any> => {
        const data = {
            name: payload.name,
            duty: payload.duty,
            salary: payload.salary,
            kids: payload.kids
        }
        try {
            const response = await api.addEmployee(data)
            const res = await response.json()
        } catch (e) {
        }
    }
}

export const deleteEmployeeAction: ActionCreator<ThunkAction<Promise<Action>, any, void, any>> = (payload: any) => {
    return async (dispatch): Promise<any> => {
        const data = {
            id: payload
        }
        try {
            const response = await api.deleteEmployee(data)
            const res = await response.json()
            console.log('response', response)
            if (response.status === 200) {
                dispatch(loadEmployeeTotalCountAction())
            }
        } catch (e) {
            console.log('e', e)
        }
    }
}

export const search: any = (payload: any) => {
    return async (dispatch: any): Promise<any> => {
        const data = {
            query: payload
        }

        try {
            const response = await api.loadTotalCountWithQuery(data.query)
            const res = await response.json()
            return res.length
        } catch (e) {
            console.log('e', e)
        }
    }
}
