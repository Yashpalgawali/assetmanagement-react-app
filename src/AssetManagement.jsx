import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompanyComponent from "./Component/CompanyComponent/CompanyComponent";
import HeaderComponent from "./Component/HeaderComponent";
import ViewCompanyComponent from "./Component/CompanyComponent/ViewCompanyComponent";
import DesignationComponent from "./Component/Designation/DesignationComponent";
import ViewDesignationComponent from "./Component/Designation/ViewDesignationComponent";
import LoginComponent from "./Component/LoginComponent";

export default function AssetManagement() {
    return(
        <>
            <BrowserRouter basename="/assetmanagement" >
                <HeaderComponent />
                <Routes>
                    <Route path='/company/:id' element={<CompanyComponent /> }></Route>
                </Routes>
                <Routes>
                    <Route path='/viewcompanies' element={ <ViewCompanyComponent />}></Route>
                </Routes>
                <Routes>
                    <Route path='/designation/:id' element={<DesignationComponent /> }></Route>
                </Routes>
                <Routes>
                    <Route path='/viewdesignations' element={<ViewDesignationComponent /> }></Route>
                </Routes>
                 <Routes>
                    <Route path='/' element={<LoginComponent /> }></Route>
                </Routes>
             
            </BrowserRouter>
        </>
    )
}