export const EMPLOYEES_LOAD_SUCCESS = 'EMPLOYEES_LOAD_SUCCESS'
export const EMPLOYEES_LOAD_COUNT = 'EMPLOYEES_LOAD_COUNT'

export interface EmployeeInterface {
    name: string
    duty: string
    salary: number
    kids: number,
    id: number
}

export type EmployeeStateType = {
    items: EmployeeInterface[],
    totalCount: number
}

const initialState: EmployeeStateType = {
    items: [],
    totalCount: 0
}

export function employeesReducer(state: EmployeeStateType = initialState, {type, payload}: any) {
    switch (type) {
        case EMPLOYEES_LOAD_SUCCESS:
            return {
                items: payload,
                totalCount: state.totalCount
            }

        case EMPLOYEES_LOAD_COUNT:
            return {
                ...state,
                totalCount: payload
            }

        default:
            return state
    }
}