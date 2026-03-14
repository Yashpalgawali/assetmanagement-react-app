import $ from 'jquery'; // jQuery is required for DataTables to work
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality

import { ErrorMessage, Form, Formik } from "formik"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material"
import { getAllDesignations, retrieveDesignationById, saveDesignation, updateDesignation } from "../../api/DesignationApiClient"

import { toast } from 'react-toastify';

export default function DesignationComponent() {

    const [desig_name,setDesignation] = useState('')
    const [desig_id, setDesignationId] = useState(-1)
    const [designationList,setDesignationList] = useState([])
    const [btnValue,setBtnValue] = useState('Add Designation')

    const [isDisabled,setIsDisabled] = useState(false)

    const {id}  = useParams()
    const navigate = useNavigate()
    const tableRef = useRef(null)    

    useEffect(()=> {
        getAllDesignations().then((response)=> {
            setDesignationList(response.data) }
        )
    },[])

    function refreshDesignations() {             
        getAllDesignations().then((response)=> {
            console.log(response.data)
            setDesignationList(response.data)            
        }).catch((error)=>{
             toast.error(error?.data?.errorMessage)
        })
    }  

    useEffect(() => {
        if (tableRef.current) {
               // 🔴 Destroy old DataTable if exists
               if ($.fn.DataTable.isDataTable(tableRef.current)) {
                 $(tableRef.current).DataTable().destroy();
               }       
               // ✅ Initialize only when data exists
               if (designationList.length > 0) {
                 $(tableRef.current).DataTable({
                   responsive: true,
                   destroy: true // <-- Important, allows re-init
                 });
               }
             }    
    },[designationList])

    useEffect(()=> {
       
        if(id != -1) {
            setBtnValue('Update Designation')
            retrieveDesignationById(id).then((response) =>{
                setDesignation(response.data.desig_name)
            })
        }
    }, [id])

    function onSubmit(values)
    {
       setIsDisabled(true)

       let designation = {
            desig_id : id,
            desig_name : values.desig_name
       }

       if(id != -1) {
            updateDesignation(designation)
                            .then((response)=> { 
                                refreshDesignations()
                                toast.success(response.data.statusMsg);
                                setDesignation("")
                                setBtnValue("Add Designation")
                                 setIsDisabled(false)
                                navigate(`/designation/-1`);
                            })
                            .catch((error)=> {
                                refreshDesignations()
                                toast.error(error.data.errorMessage);
                                setDesignation("")
                                setBtnValue("Add Designation")
                                setIsDisabled(false)
                                navigate(`/designation/-1`);
                            })
       }
       else {
            saveDesignation(designation)
                            .then((response)=> { 
                                toast.success(response.data.statusMsg);
                                setIsDisabled(false)
                                navigate(`/designation/-1`);
                            })
                            .catch((error)=> { 
                                toast.error(error.data.errorMessage); 
                                setIsDisabled(false)
                                navigate(`/designation/-1`);
                            })
       }
    }

    return(
        <Box sx={{ width: "100%", maxWidth: 1000, mx: "auto", p: 2 }}>
            <Typography variant="h4" >{btnValue}</Typography>
            <Formik
                enableReinitialize={true}
                initialValues={{ desig_name, desig_id }}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={onSubmit}
            >
            {
                (props)=> (
                    <Form>
                        <TextField
                            name="desig_name"
                            variant="filled"
                            placeholder="Enter Designation"
                            id="desig_name"
                            value={props.values.desig_name}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            error={props.touched.desig_name && Boolean(props.errors.desig_name)}
                            helperText={<ErrorMessage name="desig_name" />}
                            fullWidth
                             autoFocus={true}
                        />
                        <Box sx={{ display: "flex", justifyContent: "flex-start"}}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isDisabled}
                                startIcon= {
                                                isDisabled ? <CircularProgress size={20} color="teal" /> : null
                                                }  
                            >
                                {btnValue}
                            </Button>
                        </Box>
                    </Form>
                )
        }   
        </Formik>
        <Box>
        <Typography variant="h4">View Designations </Typography>
            <table ref={tableRef} className="table table-striped table-hover display">
                 <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Designation</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                      designationList &&  designationList.map((desig,index) => (
                        <tr key={desig.desig_id}>
                            <td>{index+1}</td>
                            <td>{desig.desig_name}</td>
                            <td><Button variant="contained"  onClick={()=>navigate(`/designation/${desig.desig_id}`)}>Update</Button></td>
                        </tr>
                      )) 
                    }
                </tbody>
            </table>
            </Box>
       </Box>
    );
}