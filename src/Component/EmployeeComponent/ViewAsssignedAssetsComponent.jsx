import $ from 'jquery'; // jQuery is required for DataTables to work
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality

import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllAssignedAssets } from "../../api/EmployeeApiClient";

export default function ViewAssignedAssetsComponent(){
    
    const [assignedAssetsList,setAssignedAssetsList] = useState([])
    const [employee,setEmployee] = useState()

    
    const tableRef= useRef(null)


    const {id} = useParams()

    useEffect(() => {
        getAllAssignedAssets().then((response) => {
            setAssignedAssetsList(response.data)            
        })
    },[id])

    useEffect(()=> {
        if(tableRef.current && assignedAssetsList.length>0) {
            $(tableRef.current).DataTable();
        }
    },[assignedAssetsList])

    return(
        <Box>
            <Typography variant="h4" gutterBottom>View Assigned Assets</Typography>
           
            <table ref={tableRef} className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Company</th>
                        <th>Designation</th>
                        <th>Asset Type</th>
                        <th>Asset Name</th>
                        <th>Model Number</th>
                        <th>Assigned Date</th>
                        <th>Assigned Time</th>
                    </tr>
                </thead>
                <tbody>
                    { assignedAssetsList.map((asset,index)=> (
                        <tr key={asset.asset_id}>
                        <td>{index+1}</td>
                        <td>{asset.employee.emp_name}</td>
                        <td>{asset.employee.department.dept_name}</td>
                        <td>{asset.employee.department.company.comp_name}</td>
                       <td>{asset.employee.designation.desig_name}</td> 
                        <td>{asset.assigned_types}</td>
                        <td>{asset.assigned}</td>
                        <td>{asset.model_numbers}</td>
                        <td>{asset.assign_date}</td>
                        <td>{asset.assign_time}</td>
                    </tr>
                    ))
                    }
                </tbody>
                    
            </table>
        </Box>
    )
}