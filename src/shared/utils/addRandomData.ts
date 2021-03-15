import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import * as api from "../../api/workers";
import { loadWorkersAction } from "../../pages/employees/employeesAction";

export const addRandomEmployeeAction = () => {
    const data = [
        {
            "name": "Игорь",
            "duty": "Программист",
            "salary": 500,
            "kids": 3,
        },
        {
            "name": "Петя",
            "duty": "Программист",
            "salary": 500,
            "kids": 3,
        },
        {
            "name": "Саша",
            "duty": "Программист",
            "salary": 500,
            "kids": 3,
        },
        {
            "name": "Света",
            "duty": "Программист",
            "salary": 500,
            "kids": 3,
        },
        {
            "name": "Лена",
            "duty": "Программист",
            "salary": 500,
            "kids": 3,
        },
        {
            "name": "Оля",
            "duty": "Программист",
            "salary": 500,
            "kids": 3,
        },
        {
            "name": "Егор",
            "duty": "Программист",
            "salary": 500,
            "kids": 3,
        },

    ]
    return async (dispatch: any): Promise<any> => {
        const promises = data.map((element: any) => {
                return dispatch(addEmplAction(element))
            }
        )
        await Promise.all(promises)
        dispatch(loadWorkersAction())
    }
}

const addEmplAction: ActionCreator<ThunkAction<Promise<Action>, any, void, any>> = (payload: any) => {
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