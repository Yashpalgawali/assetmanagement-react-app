import { useEffect, useState } from "react" 
import { getAllCompaniesList } from "../../api/CompanyApiClient"

import {Button, Typography} from "@mui/material";
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
        <Typography variant="h4" gutterBottom >View Companies <Button variant="contained" style={{float : 'right'}} color="primary" onClick={()=>updateCompany(-1)}>Add Company</Button> </Typography>
        <table className="table table-striped table-hover mt-5 " width="100%">
        <thead>
            <tr>
                <th>Sr</th>
                <th>Company Name</th>
                <th>Action</th>
            </tr>
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