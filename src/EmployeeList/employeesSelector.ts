import { EmployeeStateType } from "./employeesReducer";

export const employeesSelector = (state: any): EmployeeStateType => state.employees.items;
export const employeesTotalCountSelector = (state: any): number => state.employees.totalCount;