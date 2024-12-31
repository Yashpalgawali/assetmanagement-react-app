
import { useEffect, useState } from "react"
// import { retrieveHelloWorldBean, retrieveHelloWorldBeanPthVariable } from "./api/HelloWorldAPiService";
import {  getAllCompaniesApi } from "./api/CompanyApiService";
// import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ListCompanyComponent() {

    let [complist , setCompList] = useState([])
    
    const navigate = useNavigate()

     // Fetch company data inside a useEffect hook
    useEffect(() => {
            
        getAllCompaniesApi()
                .then((response) => {
                   console.log(response.data)
                // Update the state with the response data
                setCompList(response.data);
            })
            .catch((error) => errorResponse(error))
            // .finally(() => console.log('finally'));
    }, []); // Empty dependency array means this runs once after the component mounts

       
        function errorResponse(error) {
            console.log(error)
        }

    function updateCompany(id){
        navigate(`/company/${id}`)
    }

function addCompany(){

    navigate(`/company/-1`)
}
    return(
        <div className="container"> 
           <h1>Asset Management </h1>
                Company List
            <div>
            <table className='table table-striped table-hover '>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>UPDATE</th>
                    </tr>
                </thead>
                <tbody>
                {/* {
                    complist.map(([id, description], index) => (
                        <tr key={id || index}>
                                <td>{id} </td>
                                <td>{description} </td>
                                <td><button className="btn btn-primary m-2 " onClick={() => updateCompany(id)} >UPDATE</button> </td>
                            </tr>
                    ))
                } */}
                {
                    complist.map(
                        company => (
                            <tr key={company.id} >
                                <td>{company.id} </td>
                                <td>{company.name} </td>
                                <td><button className="btn btn-primary m-2 " onClick={() => updateCompany(company.id)} >UPDATE</button> </td>
                            </tr>
                        )
                    )
                }
                   
                </tbody>

            </table>
            <div>
                <button className="btn btn-success m-3" onClick={addCompany} >Add Company</button>
            </div>
            </div>
        </div>
    )
}

