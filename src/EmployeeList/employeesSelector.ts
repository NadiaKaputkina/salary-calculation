import { WorkersInterface } from './employeesReducer'

export const selectWorkers = (state: any): WorkersInterface => state.workers;