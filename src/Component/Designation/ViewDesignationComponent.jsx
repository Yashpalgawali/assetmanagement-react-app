import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewDesignationComponent() {

    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{

    },[])

    function updateDesignation(id) {
        navigate(`/designation/${id}`)
    }

    return(
        <div className="container">
            <Typography variant="h4">View Designations</Typography>
            <table className="table table-striped table-hover">
                <thead>
                    <th>Sr No</th>
                    <th>Designation</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}