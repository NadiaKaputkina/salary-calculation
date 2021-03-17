import { WorkersInterface } from './employeesReducer'

export const selectWorkers = (state: any): WorkersInterface => state.workers;
export const selectWorkersQuery = (state: any): WorkersInterface => state.workerQuery;