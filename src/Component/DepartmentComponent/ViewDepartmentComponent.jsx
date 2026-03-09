import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDepartments } from "../../api/DepartmentApiClient";

export default function ViewDepartmentComponent() {
    const [deptList, setDeptList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        //call api to get all departments and set deptList
        getAllDepartments       ().then((response) => {
            setDeptList(response.data);
        }).catch((error) => {
            console.log('Error while fetching departments ', error);
        })  
    }   , [])
    
     
    return(
        <div className="container">
            <Typography variant="h4" gutterBottom>
                View Departments <Button variant="contained" onClick={()=>navigate('/department/-1')} >Add Department</Button>   
            </Typography>
            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Department Name</th>                        
                        <th>Company</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {deptList.map((dept,index) => (
                        <tr key={dept.dept_id}>
                            <td>{index+1}</td>
                            <td>{dept.dept_name}</td>
                            <td>{dept.company.comp_name}</td>
                            <td>
                                <Button variant="contained" onClick={()=>navigate(`/department/${dept.dept_id}`)} >Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}       