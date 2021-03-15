import {
    Action, ActionCreator,
    Dispatch
} from "redux";

import { ThunkAction } from "redux-thunk";
import * as api from "../../api/workers";
import { WORKERS_LOAD } from "./employeesReducer";
import { snackShowAction } from "../../Snackbar/snackAction";

export const loadWorkersAction: ActionCreator<ThunkAction<Promise<Action>, any, void, any>> = () => {
    return async (dispatch: Dispatch<Action>): Promise<any> => {
        try {
            const response = await api.loadWorkers()
            const res = await response.json()
            if (res.length > 0) {
                dispatch({
                    type: WORKERS_LOAD,
                    payload: res
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
            if(response.status === 200){
                dispatch(loadWorkersAction())
            }
        }catch (e) {
            console.log('e', e)
        }
    }
}
