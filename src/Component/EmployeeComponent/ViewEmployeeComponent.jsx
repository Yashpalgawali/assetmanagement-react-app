import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllEmployeesList } from "../../api/EmployeeApiClient";
import { useEffect, useState } from "react";

export default function ViewEmployeeComponent() {
 
    const navigate = useNavigate()
    const [empList , setEmpList] = useState([])
    const [deptList , setDeptList] = useState([])

    useEffect(() => {
        getAllEmployeesList().then((response) => {
            setEmpList(response.data)
        }).catch((error) => {    
            console.log('Error while fetching Employees List ',error)
        })
    }, [])

    return(
        <div className="container">
            <Typography variant="h4" gutterBottom>
                View Employees  <Button variant="contained" color="primary" onClick={() => navigate(`/employee/-1`)}>Add Employee</Button>
            </Typography>
            <table className="table table-striped table-hover">
                <thead>
                    <th>Sr </th>
                    <th>Employee Name</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Designation</th>
                    <th>Department</th>
                    <th>Company</th>
                    <th>Actions</th>
                </thead>    
                <tbody>
                {
                    empList && empList.map((emp, index) => (
                        <tr key={emp.emp_id}>
                            <td>{index + 1}</td>
                            <td>{emp.emp_name}</td>
                            <td>{emp.emp_contact}</td>
                            <td>{emp.emp_email}</td>
                            <td>{emp.designation.desig_name}</td>
                            <td>{emp.department.dept_name}</td>
                            <td>{emp.department.company.comp_name}</td>
                            <td><Button variant="contained" color="primary" onClick={() => navigate(`/employee/${emp.emp_id}`)}>Edit</Button></td>
                        </tr>
                     )
                )}
                </tbody>
                
            </table>             
        </div>
    
       
    )
} 