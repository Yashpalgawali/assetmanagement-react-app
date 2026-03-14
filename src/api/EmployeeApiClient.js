import { apiClient } from "./apiClient";

export const saveEmployee = (employee) => apiClient.post(`employee/`,employee)

export const getAllEmployeesList = () => apiClient.get(`employee/`)

export const retrieveEmployeeById = (empId) => apiClient.get(`employee/${empId}`)

export const updateEmployee = (employee) => apiClient.put(`employee/`, employee)

export const getAllAssignedAssets =()=> apiClient.get(`employee/viewassignedassets`)

export const getAllAssignedAssetsByEmpId =(empid)=> apiClient.get(`employee/getassignedassetsbyempid/${empid}`)
