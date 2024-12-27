import { apiClient } from "./ApiClient";


export const createJwtTokenService  = (username,password) => apiClient.post(`/authenticate`,{username,password})
//export const createJwtTokenService  = (object) => apiClient.post(`/authenticate`,{object})

// export const createJwtTokenService  = (token) => apiClient.post(`/authenticate`,{
//     headers : {
//         Authorization : token
//     }
// })
