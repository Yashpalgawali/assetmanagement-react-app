import $ from 'jquery'; // jQuery is required for DataTables to work
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality

import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllEmployeesList } from "../../api/EmployeeApiClient";
import { useEffect, useRef, useState } from "react";

import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ViewEmployeeComponent() {
 
    const navigate = useNavigate()
    const [empList , setEmpList] = useState([])
    const [deptList , setDeptList] = useState([])

    const tableRef= useRef(null)

    useEffect(() => {
        getAllEmployeesList().then((response) => {
            setEmpList(response.data)
        }).catch((error) => {    
            console.log('Error while fetching Employees List ',error)
        })
    }, [])

    useEffect(()=> {
        if(tableRef.current && empList.length>0) {
            $(tableRef.current).DataTable();
        }
    },[empList])

    return(
        <div className="container">
            <Typography variant="h4" gutterBottom>
                View Employees  <Button variant="contained" color="primary" style={{float : 'right'}} onClick={() => navigate(`/employee/-1`)}>Add Employee</Button>
            </Typography>
            <table ref={tableRef} className="table table-striped table-hover">
                <thead>
                    <tr>
                    <th>Sr </th>
                    <th>Employee Name</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Designation</th>
                    <th>Department</th>
                    <th>Company</th>
                    <th>Actions</th>
                    </tr>
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
                            <td style={{  }} >
                                <Button variant="contained" color="success" onClick={() => navigate(`/employee/${emp.emp_id}`)}><EditIcon /> Edit</Button>

                                <Button variant="contained" color="secondary" onClick={() => navigate(`/viewassignedassets/${emp.emp_id}`)}><VisibilityIcon /> View</Button>
                                
                            </td>
                        </tr>
                     )
                )}
                </tbody>
                
            </table>             
        </div>
    
       
    )
} 