import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { executeBasicAuthentication } from "../../api/basicAuthentication";

//Create Context
export const AuthContext = createContext()

export const useAuth = ()=> useContext(AuthContext) 

export default function AuthProvider({ children }) {

    const [isAuthenticated,setAuthenticated] = useState(false)
     
    const [token , setToken ] = useState(null)

    // function login(username,password) {
    //         if(username=="admin" && password=="admin"){
    //                 setAuthenticated(true)
    //                 sessionStorage.setItem('isAuthenticated',true)
    //                 localStorage.setItem(isAuthenticated,true)
    //                 return true
    //         }
    //         else {
    //                 setAuthenticated(false)
    //                 localStorage.setItem('isAuthenticated',false)
    //                 sessionStorage.setItem('isAuthenticated',false)
    //                 return false
    //         }
    // }

    async function login(username,password) {
        const batoken = 'Basic '+ window.btoa(username+':'+password)
        
        try{
            const response = await executeBasicAuthentication(batoken) 
            if(response.status==200){
                    setAuthenticated(true)
                    setToken(batoken)
                    sessionStorage.setItem('isAuthenticated',true)
                    localStorage.setItem(isAuthenticated,true)
                    return true
            }
            else {
                    setAuthenticated(false)
                    setToken(null)
                    localStorage.setItem('isAuthenticated',false)
                    sessionStorage.setItem('isAuthenticated',false)
                    return false
            }
        }
        catch(error) {
            logout()           
            return false
        }
    }

    function logout()
    {
        setAuthenticated(false)
        localStorage.setItem('isAuthenticated',false)
        sessionStorage.setItem('isAuthenticated',false)
        setToken(null)        
    }

    return(
        <AuthContext.Provider value={ { isAuthenticated, login , logout, token } }>
            { children }
        </AuthContext.Provider>
    )
}