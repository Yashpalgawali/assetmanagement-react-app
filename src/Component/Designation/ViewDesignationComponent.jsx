import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDesignations } from "../../api/DesignationApiClient";

export default function ViewDesignationComponent() {

    const [designationList,setDesignationList] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        getAllDesignations().then((response)=> {
            setDesignationList(response.data)
        })
    },[])

    function updateDesignation(id) {
        navigate(`/designation/${id}`)
    }
    function addDesignation() {
        navigate(`/designation/-1`)
    }

    return(
        <div className="container">
            <Typography variant="h4">View Designations <Button variant="contained" style={{ float:"right"}} onClick={addDesignation}>Add Designation</Button> </Typography>
            <table className="table table-striped table-hover">
                 <thead>
                    <th>Sr</th>
                    <th>Designation Name</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    {
                        designationList.map((desig,index) => (
                        <tr key={desig.desig_id}>
                            <td>{index+1}</td>
                            <td>{desig.desig_name}</td>
                            <td><Button variant="contained"  onClick={()=>updateDesignation(desig.desig_id)}>Update</Button></td>
                        </tr>
                      ))
                    }
                </tbody>
            </table>
        </div>
    )
}