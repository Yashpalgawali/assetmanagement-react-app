import $ from "jquery";


import { useEffect, useState } from "react" 
import { getAllCompaniesList } from "../../api/CompanyApiClient"

import {Box, Button, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";

import EditIcon from '@mui/icons-material/Edit';

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
        <Box>
        <Typography variant="h4" gutterBottom >View Companies <Button variant="contained" style={{float : 'right'}} color="primary" onClick={()=>navigate(`/company/-1`)}>Add Company</Button> </Typography>
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
                    <td><Button variant="contained" onClick={()=>navigate(`/company/${company.comp_id}`)}><EditIcon /> Update</Button> </td>
                </tr>
            ))
        }
        </tbody>
        </table>
       </Box>
    )
}