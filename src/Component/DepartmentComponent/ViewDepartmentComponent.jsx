import $ from 'jquery'; // jQuery is required for DataTables to work
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality

import { Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDepartments } from "../../api/DepartmentApiClient";
import { toast } from "react-toastify";

import EditIcon from '@mui/icons-material/Edit';

export default function ViewDepartmentComponent() {
    const [deptList, setDeptList] = useState([]);
    const navigate = useNavigate();

    const tableRef = useRef(null); // Ref for the table

    useEffect(() => {
        //call api to get all departments and set deptList
        getAllDepartments().then((response) => {
            setDeptList(response.data);
        }).catch((error) => {
            toast.error(error.data.errorMessage)
        })  
    }   , [])
    
    useEffect(() => {
            // Initialize DataTable only after the component has mounted
            if (tableRef.current && deptList.length >0 ) {
              $(tableRef.current).DataTable(); // Initialize DataTables
            }
          }, [deptList]); // Re-initialize DataTables when activities data changes
     
    return(
        <div className="container">
            <Typography variant="h4" gutterBottom>
                View Departments <Button variant="contained" onClick={()=>navigate('/department/-1')} style={{float : 'right'}} >Add Department</Button>   
            </Typography>
            <table ref={tableRef} className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Department</th>                        
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
                                <Button variant="contained" color='success' onClick={()=>navigate(`/department/${dept.dept_id}`)} ><EditIcon /> Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}       