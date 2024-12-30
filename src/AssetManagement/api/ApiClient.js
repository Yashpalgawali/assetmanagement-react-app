import axios from "axios";

export const apiClient = axios.create(
    {
        //baseURL : 'http://localhost:8989/'
          baseURL : 'http://localhost:8080/'
    }
)