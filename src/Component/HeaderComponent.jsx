import { Link } from "react-router-dom";
import { useAuth } from "./Security/authContext";

export default function HeaderComponent() {

    const authContext = useAuth()

    const isAuthenticated = authContext.isAuthenticated
    
    function logout()
    {
        authContext.logout()        
    }

    return(
        <>
        <header className="border-bottom border-light border-5 p-2 ">
        <div className="container-fluid">
            <div className="row">
                <nav className="navbar navbar-expand-lg">
                    {/* <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://www.in28minutes.com">in28minutes</a> */}
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                        
                       {isAuthenticated &&  <li className="nav-item fs-5">                           
                             <Link className="nav-link" to="/company/-1">Add Company</Link>
                        </li> }
                        {isAuthenticated && <li className="nav-item fs-5">                          
                             <Link className="nav-link" to="/viewcompanies">Companies</Link>
                        </li> }
                        {isAuthenticated && <li className="nav-item fs-5">                           
                             <Link className="nav-link" to="/designation/-1">Add Designation</Link>
                        </li> }
                        {isAuthenticated && <li className="nav-item fs-5">                           
                             <Link className="nav-link" to="/viewdesignations">Designations</Link>
                        </li> }
                        {!isAuthenticated && <li className="nav-item fs-5">                           
                             <Link className="nav-link" to="/login">Login</Link>
                        </li> }
                        {isAuthenticated && <li className="nav-item fs-5">                           
                             <Link className="nav-link" to="/login" onClick={logout}>Logout</Link>
                        </li> }
                      </ul>
                    </div>                   
                </nav>
            </div>
        </div>
    </header>
        </>
    )
}