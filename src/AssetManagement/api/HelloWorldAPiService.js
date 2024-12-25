import axios from "axios";

const apiClient = axios.create(
                {
                    baseURL : 'http://localhost:8080/'
                }
            )
// export function retrieveHelloWorldBean() {
//    return axios.get('http://localhost:8080/company/')
// }


// export const retrieveHelloWorldBean  = () => axios.get('http://localhost:8080/company/')
// export const retrieveHelloWorldBeanPthVariable  = (username) => axios.get(`http://localhost:8080/${username}`)

//Using apiClient
export const retrieveHelloWorldBean  = () => apiClient.get('company/')
export const retrieveHelloWorldBeanPthVariable  = (username) => apiClient.get(`${username}`)



