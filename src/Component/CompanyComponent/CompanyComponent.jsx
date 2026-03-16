import $ from 'jquery'; // jQuery is required for DataTables to work
  
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality

import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCompaniesList, getCompanyById, updateCompany } from "../../api/CompanyApiClient";
import { toast } from "react-toastify";

import EditIcon from '@mui/icons-material/Edit';

export default function CompanyComponent() {

    const [comp_name,setCompName] = useState('')
    const [comp_id,setCompanyId] = useState(-1)
    const [isDisabled,setIsDisabled] = useState(false)

    const [companyList, setCompanyList] = useState([])

    const [btnValue,setBtnValue] = useState("Add Company")
    const navigate = useNavigate()

    const {id} = useParams()
    
    const tableRef = useRef(null); // Ref for the table
    
    useEffect(()=> refreshCompanies() , [] )

    useEffect(()=>{
       
        if(id != -1) {
            setBtnValue("Update Company")
            getCompanyById(id).then(response=> {
                setCompName(response.data.comp_name)
                setCompanyId(id)
            })
        }
    },[id]) 
    
    useEffect(() => {
        // Initialize DataTable only after the component has mounted
       if (tableRef.current) {
               // 🔴 Destroy old DataTable if exists
               if ($.fn.DataTable.isDataTable(tableRef.current)) {
                 $(tableRef.current).DataTable().destroy();
               }
       
               // ✅ Initialize only when data exists
               if (companyList.length > 0) {
                 $(tableRef.current).DataTable({
                   responsive: true,
                   destroy: true // <-- Important, allows re-init
                 });
               }
             }     
      }, [companyList]); // Re-initialize DataTables when activities data changes
   

    function refreshCompanies() {     
        getAllCompaniesList().then((response)=> {
            setCompanyList(response.data)
        }).catch((error)=>{
             toast.error(error?.data?.errorMessage)
        })
    }  

    function saveCompany(values){
        setIsDisabled(true)
        if(id == -1) {
            let companyObject = {                 
                comp_name : values.comp_name
            }
            saveCompany(companyObject).then((response) => {
                refreshCompanies()
                toast.success(response.data.statusMsg)
                setCompName("")
                setIsDisabled(false)                
                setBtnValue("Add Company")
                navigate(`/company/-1`)
            }).catch((error)=>{
                refreshCompanies()
                toast.error(error.data.errorMessage)
                setCompName("")
                setIsDisabled(false)                
                setBtnValue("Add Company")
                navigate(`/company/-1`)
            })
        }
        else {
            let companyObject = {
                comp_id : id,
                comp_name : values.comp_name
            }
            updateCompany(companyObject).then((response) => {
                refreshCompanies()
                toast.success(response.data.statusMsg)
                setCompName("")
                setIsDisabled(false)
                navigate(`/company/-1`)
            }).catch((error)=>{
                refreshCompanies()
                toast.error(error.data.errorMessage)
                setCompName("")
                setIsDisabled(false)
                navigate(`/company/-1`)
            })
        }
    }

    function validate(values) {
        let errors = { }
        if(values.comp_name.length<2){
              errors.comp_name = "Company Name must have 2 or more characters"
        }
        return errors
    }

    return(
        <Box sx={{ width: "100%", maxWidth: 1000, mx: "auto", p: 2 }}>
             
            <Typography variant="h4">{btnValue}</Typography>
            <Formik
                initialValues={{ comp_name}}
                enableReinitialize={true}
                validateOnBlur={false}
                validateOnChange={false}                
                onSubmit={saveCompany}
                validate={validate}
            >
                {
                    (props) => (
                        <Form>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <TextField
                                    variant="standard"
                                    id="comp_name"
                                    name="comp_name"
                                    value={props.values.comp_name}
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    error={props.touched.comp_name && Boolean(props.errors.comp_name)}
                                    helperText={<ErrorMessage name="comp_name" />}
                                    placeholder="Enter Company Name"
                                    fullWidth
                                    autoFocus={true}
                                >
                                </TextField>
                                
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
                            </Box>
                        </Form>
                    )
                }
            </Formik>
             
             <Box>
                     <Typography variant="h4" gutterBottom >View Companies </Typography>
                     <table ref={tableRef} className="table table-striped table-hover  " width="100%">
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
                                 <td><Button variant="contained" color='success' onClick={()=>navigate(`/company/${company.comp_id}`)}><EditIcon />Update</Button> </td>
                             </tr>
                         ))
                     }
                     </tbody>
                </table>
            </Box>
        </Box> 
    )
}