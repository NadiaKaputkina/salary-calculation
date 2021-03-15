export const WORKERS_LOAD = 'WORKERS_LOAD'

export interface EmployeeInterface {
    name: string
    duty: string
    salary: number
    kids: number,
    id: number
}

export interface WorkersInterface {
    workers: EmployeeInterface[]
}

const initialState = {
    workers: []
}

export function workersReducer(state: WorkersInterface = initialState, {type, payload}: any) {
    switch (type) {
        case WORKERS_LOAD:
            return {
                ...state,
                workers: payload
            }
        default:
            return state
    }
}