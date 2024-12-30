
import { useEffect, useState } from "react"
// import { retrieveHelloWorldBean, retrieveHelloWorldBeanPthVariable } from "./api/HelloWorldAPiService";
import { companyurl } from "./api/CompanyApiService";
// import { useAuth } from "./security/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

export default function ListCompanyComponent() {

    let [complist , setCompList] = useState([])

    const {username} = useParams()
    const navigate = useNavigate()
    // const authContext = useAuth()
    // const {username} = authContext.username
    // axios.get('http://localhost:8080/company/')
    //         .then((response)=>   setCompList(response))
    //         .catch((error)=> errorResponse(error) )
    //         .finally(()=> console.log('finally'))

     // Fetch company data inside a useEffect hook
     useEffect(() => {
            
            companyurl()
                .then((response) => {
                   console.log(response.data)
                // Update the state with the response data
                setCompList(response.data);
            })
            .catch((error) => errorResponse(error))
            .finally(() => console.log('finally'));
    }, []); // Empty dependency array means this runs once after the component mounts

        function successfulResponse(response) {
            console.log(response)
        }
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
                {
                    complist.map(([id, description], index) => (
                        <tr key={id || index}>
                                <td>{id} </td>
                                <td>{description} </td>
                                <td><button className="btn btn-primary m-2 " onClick={() => updateCompany(id)} >UPDATE</button> </td>
                            </tr>
                    ))
                }
                    {/* {
                        companies.map(
                            company => (
                                <tr key={company.id}>
                                    <td>{company.id} </td>
                                    <td>{company.description} </td>
                                </tr>
                            )
                        )
                    } */}
                   
                </tbody>

            </table>
            <div>
                <button className="btn btn-success m-3" onClick={addCompany} >Add Company</button>
            </div>
            </div>
        </div>
    )
}
