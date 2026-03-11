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
import { ToastContainer } from "react-toastify";
import AssetTypeComponent from "./Component/AssetTypeComponent/AssetTypeComponent";
import ViewAssetTypeComponent from "./Component/AssetTypeComponent/ViewAssetTypeComponent";
import AssetComponent from "./Component/AssetComponent/AssetComponent";
import ViewAssetsComponent from "./Component/AssetComponent/ViewAssetsComponent";
import DepartmentComponent from "./Component/DepartmentComponent/DepartmentComponent";
import ViewDepartmentComponent from "./Component/DepartmentComponent/ViewDepartmentComponent";
import ViewEmployeeComponent from "./Component/EmployeeComponent/ViewEmployeeComponent";
import EmployeeComponent from "./Component/EmployeeComponent/EmployeeComponent";
import DashboardLayout from "./Component/Layout/DashboardLayout";



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
                 <ToastContainer position="top-center" autoClose={3000} />
                 <Routes>
                    <Route path="/dashboard" element={<DashboardLayout />} />
                
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
                    <Route path='/assettype/:id' element={
                          <AuthenticatedRoute>
                            <AssetTypeComponent /> 
                           </AuthenticatedRoute>
                        }></Route>
                    <Route path='/viewassettypes' element={
                        <AuthenticatedRoute><ViewAssetTypeComponent /> </AuthenticatedRoute> }></Route>
                
                    <Route path='/asset/:id' element={
                          <AuthenticatedRoute>
                            <AssetComponent />
                           </AuthenticatedRoute>
                        }></Route>

                   <Route path='/viewassets' element={
                        <AuthenticatedRoute><ViewAssetsComponent /> </AuthenticatedRoute> }>
                    </Route>

                     <Route path='/department/:id' element={
                          <AuthenticatedRoute>
                            <DepartmentComponent />
                           </AuthenticatedRoute>
                        }></Route>

                   <Route path='/viewdepartments' element={
                        <AuthenticatedRoute><ViewDepartmentComponent /> </AuthenticatedRoute> }>
                    </Route>

                     <Route path='/employee/:id' element={
                          <AuthenticatedRoute>
                            <EmployeeComponent />
                           </AuthenticatedRoute>
                        }></Route>

                   <Route path='/viewemployees' element={
                        <AuthenticatedRoute><ViewEmployeeComponent /> </AuthenticatedRoute> }>
                    </Route>
                 
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