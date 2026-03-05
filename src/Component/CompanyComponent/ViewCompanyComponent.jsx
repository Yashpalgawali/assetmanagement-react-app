import { useEffect, useState } from "react" 
import { getAllCompaniesList } from "../../api/CompanyApiClient"

import {Button} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ViewCompanyComponent() {

    const [companyList, setCompanyList] = useState([])
    
    const navigate = useNavigate()

    useEffect(()=> {
        getAllCompaniesList().then((response) => {
            setCompanyList(response.data)
        })        
    },[])

    function updateCompany(id){
        navigate(`/company/${id}`)
    }

    return(
        <div className="container">
        <h1>View Company</h1>
        <table className="table table-striped table-hover mt-5 " width="100%">
        <thead>
            <th>Sr</th>
            <th>Company Name</th>
            <th>Action</th>
        </thead>
        <tbody>
        {
            companyList.map((company,index)=>(
                <tr key={company.comp_id}>
                    <td>{index+1}</td>
                    <td>{company.comp_name}</td>
                    <td><Button variant="contained" onClick={()=>updateCompany(company.comp_id)}>Update</Button> </td>
                </tr>
            ))
        }
        </tbody>
        </table>
       </div>
    )
}