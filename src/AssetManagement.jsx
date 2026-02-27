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
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path="/company/-1" element={<CompanyComponent /> }></Route>
                </Routes>
                <Routes>
                    <Route path="/viewcompanies" element={ <ViewCompanyComponent />}></Route>
                </Routes>
                <Routes>
                    <Route path="/designation/-1" element={<DesignationComponent /> }></Route>
                </Routes>
                <Routes>
                    <Route path="/viewdesignations" element={<ViewDesignationComponent /> }></Route>
                </Routes>
              <LoginComponent />
            </BrowserRouter>
        </>
    )
}