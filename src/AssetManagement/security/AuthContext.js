
//1: create context
import { createContext, useContext, useState } from "react";
import { createJwtTokenService } from "../api/BasicAuthService";
import { apiClient } from "../api/ApiClient";


export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
    //2: Share some state in context
    //const [number,setNumber]  =useState(10)
    const [isAuthenticated , setAuthenticated] = useState(false)

    const [username,setUsername] = useState('')

    const [token , setToken] = useState(null)
    // function login(username, password) {
    //     if(username==='in28minutes' && password==='dummy'){
    //         setUsername(username)
    //         setAuthenticated(true)
    //         return true
    //     }
    //     else{
    //         setAuthenticated(false)
    //         return false
    //     }
    // }
    async function login(username, password) {

       try{  
            const response = await createJwtTokenService(username, password)
                                   
            if(response.status===200) {
                const jwtToken = 'Bearer '+response.data.token
                setToken(jwtToken)
                setUsername(username)
                setAuthenticated(true)

                apiClient.interceptors.request.use(
                    (config)=> {
                        console.log('Intercepting')
                        config.headers.Authorization=jwtToken
                        return config
                    }
                )
                return true
            }
            else{
                logout()
                return false
            }
        }
        catch(error)
        {
            logout()
            return false
        }
    }

    function logout()
    {
        setAuthenticated(false)
        setUsername(null)
        setToken(null)
    }

    return(
        <AuthContext.Provider value={{  isAuthenticated , username , setUsername, login, logout, token}} >
            {children}
        </AuthContext.Provider>
    )
}
