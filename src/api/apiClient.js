import axios from "axios";

// export const apiClient = axios.create({
//     baseURL : 'http://192.168.0.219:8081/assetmanagementrest/'
//  }) 

export const apiClient = axios.create({
    baseURL : 'http://localhost:8989/assetmanagementrest/'
}) 