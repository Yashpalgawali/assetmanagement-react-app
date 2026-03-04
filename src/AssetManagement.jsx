import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import CompanyComponent from "./Component/CompanyComponent/CompanyComponent";
import HeaderComponent from "./Component/HeaderComponent";
import ViewCompanyComponent from "./Component/CompanyComponent/ViewCompanyComponent";
import DesignationComponent from "./Component/Designation/DesignationComponent";
import ViewDesignationComponent from "./Component/Designation/ViewDesignationComponent";
import LoginComponent from "./Component/LoginComponent";
import ErrorComponent from "./Component/ErrorComponent";
import AuthProvider, { useAuth } from "./Component/Security/authContext";
import WelcomeComponent from "./Component/WelcomeComponent";


function AuthenticatedRoute({ children }){
    const authContext = useAuth()
    const navigate = useNavigate()
    if(authContext.isAuthenticated)
        return children
    return <Navigate to="/login" />
}

export default function AssetManagement() {
    return(
        <>
        <AuthProvider>
            <BrowserRouter basename="/assetmanagement" >
                <HeaderComponent />
                 <Routes>
                
                    <Route path='/company/:id' element={
                            <AuthenticatedRoute>
                                <CompanyComponent />
                            </AuthenticatedRoute> }></Route>
                
                    <Route path='/viewcompanies' element={ 
                          <AuthenticatedRoute>
                            <ViewCompanyComponent />
                         </AuthenticatedRoute> }></Route>
                
                    <Route path='/designation/:id' element={
                          <AuthenticatedRoute>
                            <DesignationComponent /> 
                           </AuthenticatedRoute>
                        }></Route>
                
                    <Route path='/viewdesignations' element={
                        <AuthenticatedRoute><ViewDesignationComponent /> </AuthenticatedRoute> }></Route>
                
                    <Route path='/' element={
                        <AuthenticatedRoute><WelcomeComponent /> </AuthenticatedRoute> }></Route>
                
                    <Route path='/login' element={<LoginComponent /> }></Route>
                    <Route path='*' element={<ErrorComponent /> }></Route>
                </Routes>
             
            </BrowserRouter>
            </AuthProvider>
        </>
    )
}