
//1: create context
import { createContext, useContext, useState } from "react";


export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
    //2: Share some state in context
    //const [number,setNumber]  =useState(10)
    const [isAuthenticated , setAuthenticated] = useState(false)

    const [username,setUsername] = useState('')

    function login(username, password) {
        if(username==='in28minutes' && password==='dummy'){
            setUsername(username)
            setAuthenticated(true)
            return true
        }
        else{
            setAuthenticated(false)
            return false
        }
    }

    function logout()
    {
        setAuthenticated(false)
        setUsername('')
    }

    return(
        <AuthContext.Provider value={{  isAuthenticated , username , setUsername, login, logout}} >
            {children}
        </AuthContext.Provider>
    )
}
