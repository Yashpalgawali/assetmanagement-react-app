 import './AssetManagement.css';
import { BrowserRouter, Navigate, Route, Routes  } from 'react-router-dom';
import  FooterComponent  from './FooterComponent';
import  HeaderComponent  from './HeaderComponent';
import  ListCompanyComponent  from './ListCompanyComponent';
import  LoginComponent  from './LoginComponent';
import  LogoutComponent  from './LogoutComponent';
import  ErrorComponent  from './ErrorComponent';
import  WelcomeComponent  from './WelcomeComponent';
import AuthProvider, { useAuth } from './security/AuthContext';
import CompanyComponent from './CompanyComponent';
import AssetTypeComponent from './AssetTypeComponent';
import ListAssetTypeComponent from './ListAssetTypeComponent';
import DepartmentComponent from './DepartmentComponent';
import ViewDepartmentComponent from './ViewDepartmentComponent';


function AuthenticatedRoute({ children}){

    const authContext = useAuth()
    if(authContext.isAuthenticated)
        return children

    return <Navigate to="/"></Navigate>

}


export default function AssetManagement() {

    return(
        <div className="AssetManagement">
            <AuthProvider >
                <BrowserRouter>
                <HeaderComponent />
                <Routes>                
                    <Route path='/' element={ <LoginComponent /> }></Route>
                    <Route path='/login' element={ <LoginComponent /> }></Route> 
                    
                    <Route path='/companies' element={ 
                            <AuthenticatedRoute>
                                <ListCompanyComponent /> 
                            </AuthenticatedRoute>
                            }></Route> 
                            {/* <Route path='/company' element={ 
                            <AuthenticatedRoute>
                                <CompanyComponent /> 
                            </AuthenticatedRoute>
                            }></Route>  */}

                            <Route path='/company/:paramid' element={ 
                            <AuthenticatedRoute>
                                <CompanyComponent /> 
                            </AuthenticatedRoute>
                            }></Route> 
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute> 
                                <WelcomeComponent /> </AuthenticatedRoute>
                            }></Route> 
                            <Route path='/assettype' element={ 
                                <AuthenticatedRoute>
                                    <ListAssetTypeComponent /> 
                                </AuthenticatedRoute>
                        }></Route>
                        
                        <Route path='/assettype/:id' element={ 
                                <AuthenticatedRoute>
                                    <AssetTypeComponent /> 
                                </AuthenticatedRoute>
                        }></Route>
                          <Route path='/department' element={ 
                                <AuthenticatedRoute>
                                    <ViewDepartmentComponent /> 
                                </AuthenticatedRoute>
                        }></Route>

                        <Route path='/department/:id' element={ 
                                <AuthenticatedRoute>
                                    <DepartmentComponent /> 
                                </AuthenticatedRoute>
                        }></Route>

                          <Route path='/assettype' element={ 
                                <AuthenticatedRoute>
                                    <ListAssetTypeComponent /> 
                                </AuthenticatedRoute>
                        }></Route>
                        <Route path='/logout' element={ 
                                <AuthenticatedRoute>
                                    <LogoutComponent /> 
                                </AuthenticatedRoute>
                        }></Route>
                     
                    <Route path='*' element={<ErrorComponent />}></Route>
                </Routes>
                <FooterComponent />
                </BrowserRouter> 
            </AuthProvider>
        </div>
    )
}

