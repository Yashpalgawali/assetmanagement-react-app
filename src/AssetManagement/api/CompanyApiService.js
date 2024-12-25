import axios from "axios";

const apiClient = axios.create({
    baseURL : 'http://localhost:8080/'
})

//export const companyurl  = () => axios.get('http://localhost:8080/company/')

export const companyurl  = () => apiClient.get('company/')

export const saveCompany = (company) => apiClient.post('company/',company)

export const updateCompany = (company) => apiClient.put('company/',company)

export const getCompanyById = (id) => apiClient.get(`company/${id}`)