import $ from 'jquery'; // jQuery is required for DataTables to work
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality

import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllAssignedAssets, getAllAssignedAssetsByEmpId } from "../../api/EmployeeApiClient";

export default function ViewAsssignedAssetsOfEmployeeComponent(){
    
    const [assignedAssetsList,setAssignedAssetsList] = useState([])
    const [employee,setEmployee] = useState({
        emp_name : '',
        designation : {
            desig_name : ''
        },
        department : {
            dept_name : '',
            company : {
                comp_name : ''
            }
        }
    })
    
    const tableRef= useRef(null)

    const {id} = useParams()

    useEffect(() => { 

        getAllAssignedAssetsByEmpId(id).then((response) => {
            setAssignedAssetsList(response.data)
            setEmployee(response.data[0].employee)
            console.log(response.data[0].employee)
        })

    },[id])

    useEffect(()=> {
        if(tableRef.current && assignedAssetsList.length>0) {
            $(tableRef.current).DataTable();
        }
    },[assignedAssetsList])

    return(
        <Box sx={{ p: 2, boxShadow: 3 }}>
            <Typography variant="h4" gutterBottom>View Assigned Assets</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ width: 400, p: 2, boxShadow: 3 }}>
        <CardContent>

          <Grid container spacing={2} alignItems="center">

            <Grid item>
              <Avatar sx={{ width: 60, height: 60 }}>
                {employee.emp_name.charAt(0)}
              </Avatar>
            </Grid>

            <Grid item xs>
              <Typography variant="h6">
                {employee.emp_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {employee.designation.desig_name}
              </Typography>
            </Grid>

          </Grid>

          <Box mt={2}>
            <Typography variant="body2">
              <strong>Department:</strong> {employee.department.dept_name}
            </Typography>

            <Typography variant="body2">
              <strong>Email:</strong> {employee.emp_email}
            </Typography>

            <Typography variant="body2">
              <strong>Company:</strong> {employee.department.company.comp_name}
            </Typography>
          </Box>

        </CardContent>
      </Card>
    </Box>
            <table ref={tableRef} className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Sr</th>                         
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
                        <td>{asset.asset.atype.type_name}</td>
                        <td>{asset.asset.asset_name}</td>
                        <td>{asset.asset.model_number}</td>
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