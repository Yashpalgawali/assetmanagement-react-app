import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";

//Create Context
export const AuthContext = createContext()

export const useAuth = ()=> useContext(AuthContext) 

export default function AuthProvider({ children }) {

    const [isAuthenticated,setAuthenticated] = useState(false)
     
    function login(username,password) {
            if(username=="admin" && password=="admin"){
                    setAuthenticated(true)
                    sessionStorage.setItem('isAuthenticated',true)
                    localStorage.setItem(isAuthenticated,true)
                    return true
            }
            else {
                    setAuthenticated(false)
                    localStorage.setItem('isAuthenticated',false)
                    sessionStorage.setItem('isAuthenticated',false)
                    return false
            }
    }
    function logout()
    {
        setAuthenticated(false)
        return <Navigate to="/login" />
    }
    return(
        <AuthContext.Provider value={ { isAuthenticated, login , logout}}>
            {children}
        </AuthContext.Provider>
    )
}