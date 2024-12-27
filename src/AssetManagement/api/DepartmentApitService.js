import { apiClient } from "./ApiClient";

export const getAlldepartments = () => apiClient.get('department/')

export const getDepartmentByDeptId = (deptid) => apiClient.get(`department/${deptid}`)

export const saveDepartment = (department) => apiClient.post(`department/`,department)

export const updateDepartment = (department) => apiClient.put(`department/`,department)

export const getDepartmentByCompanyId = (companyid) => apiClient.get(`department/company/${companyid}`)