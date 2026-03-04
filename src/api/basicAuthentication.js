import { apiClient } from "./apiClient"

export const executeBasicAuthentication = (token) => apiClient.post(`authenticate`,{
    headers: {
        Authorization : token
    }
})