import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { executeJwtAuthentication, logoutFunction } from "../../api/basicAuthentication";

import { apiClient } from "../../api/apiClient"; 

import { jwtDecode } from "jwt-decode";
import { showToast } from "../SharedComponent/showToast";

//Create Context
export const AuthContext = createContext()

export const useAuth = ()=> useContext(AuthContext) 

export const redirectToLogin= () => {
  window.location.href = "/assetmanagement/";
};

export default function AuthProvider({ children }) {

    const [isAuthenticated,setAuthenticated] = useState(false)
     
    const [jwtToken, setJwtToken] = useState('')
    const [userid,setUserId] = useState('')
    const [username, setUsername] = useState('')
    
    const [loading, setLoading] = useState(true); // 👈 new

      // ✅ Restore auth from localStorage/sessionStorage on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userid");
    const storedUsername = localStorage.getItem("username");
  
    if (storedToken && storedUserId) {
      setJwtToken(storedToken);
      setUserId(storedUserId);
      setUsername(storedUsername);
      setAuthenticated(true);

      // re-attach axios interceptor
      apiClient.interceptors.request.use((config) => {
         
        config.headers.Authorization = storedToken;
        return config;
      });
    }

   
let isRedirecting = false;

const respInterceptor = apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
      const isLoginApi =
        error.config?.url?.includes("/authenticate");

    // 🔴 Allow login() to handle wrong password
    if (isLoginApi) {
      return Promise.reject(error);
    }

    // 🔐 Token expired / unauthorized for protected APIs
    if (error.response?.status === 401) {
      showToast("Authentication required. Please login again to continue.", "error");

       // Optional: clear auth data
      // localStorage.removeItem("token");
      // localStorage.removeItem("userid");
      // localStorage.removeItem("username");

      localStorage.clear()
      sessionStorage.clear();
      // 🚀 Redirect to login
      redirectToLogin();

      return Promise.reject(error);
    }

    // 🌐 Backend down
    if (!error.response) {
      showToast("Server unavailable. Please check your network connection.", "error");
      return Promise.reject(error);
    }
     
    return Promise.reject(error);
  }
);
     
      setLoading(false); // 👈 auth check done

      return ()=> {
        apiClient.interceptors.response.eject(respInterceptor)
      };
  }, []);

    async function login(username,password) {
       
        try{ 
            const resp = await executeJwtAuthentication(username,password)
         
            if(resp.status==200) {
              
                const jwtToken =  resp.data.token
                const decoded = jwtDecode(jwtToken)
                setUserId(decoded.userId)
                setAuthenticated(true)
                setJwtToken('Bearer ' +jwtToken)
                setUsername(decoded.username)
                sessionStorage.setItem('userid',decoded.userId)
                localStorage.setItem('userid',decoded.userId) 

                // ✅ persist in storage
                localStorage.setItem("token", "Bearer " + jwtToken);
                localStorage.setItem("userid", decoded.userId);
                localStorage.setItem("username", decoded.username);

                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization='Bearer ' +jwtToken
                        return config
                    }
                )
               return true
            }
            
            else {
                logout()
                return false
            }
             
        }
        catch(error) {
           // 🚨 Wrong password or unauthorized
            if (error.response && error.response.status === 401) {
              showToast("Invalid credentials. Please verify your username and password.", "error");
            }
            // 🚨 Backend down
            else {
              showToast("Server is currently unreachable. Please try again later.", "error");
            }
            
            setAuthenticated(false);
            setUserId('');
            setJwtToken(null);
            setUsername('');

            sessionStorage.clear();
            localStorage.clear();
            return false;
        }
    }

   async function logout()
    {      
        const result = await logoutFunction(jwtToken)

        showToast("Logout successful. See you soon!", "success");

        setAuthenticated(false)
        setUserId('')
        setJwtToken(null)
        setUsername('')

        sessionStorage.clear()
        localStorage.clear()

        return result
    }

    return(
        <AuthContext.Provider value={ { isAuthenticated, login , logout, jwtToken, userid,username, jwtToken } }>
            {loading ? <div>Loading...</div> : children}
            {/* { children } */}
        </AuthContext.Provider>
    )
}