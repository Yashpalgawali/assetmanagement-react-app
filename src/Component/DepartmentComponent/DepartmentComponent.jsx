import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { ErrorMessage, Form, Formik } from "formik"

import { Box, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"

import * as Yup from "yup";
import { toast } from "react-toastify"
import { getAllCompaniesList, getCompanyById } from "../../api/CompanyApiClient";
import { retrieveDepartmentById, saveDepartment, updateDepartment } from "../../api/DepartmentApiClient";

export default function DepartmentComponent() {
    
    const {id} = useParams()

    const [btnValue,setBtnValue] = useState('Add Department')    
    const [companies,setCompanies] = useState([])
    const [dept_id,setDeptId] = useState('')
    const [dept_name,setDeptName] = useState('')
    const [isDisabled, setIsDisabled] =  useState(false)
    const [company,setCompany] = useState({
        comp_id : '',
        comp_name : ''
    })
    
    const [selectedCompanyId, setSelectedCompanyId] = useState('');

    const navigate = useNavigate()    
    
    useEffect(() => {
     const getDepartmentById = async() =>{
        getAllCompaniesList().then((response)=> {
            setCompanies(response.data)            
        })
        if(id != -1)
        {
           setBtnValue('Update Department')
           retrieveDepartmentById(id).then((response) => {   
                  
                setCompany(response.data.company)
                setDeptId(response.data.dept_id)
                setDeptName(response.data.dept_name)  
                setSelectedCompanyId(response.data.company.comp_id);  // << key  
           })
        }
     } 
        if(id) {
            getDepartmentById()
        }
    }, [])
   
    const validationSchema =  Yup.object({
        dept_name : Yup.string()
                    .required('Department name can\'t be blank')
                    .min(2,'Department Name must have at least 2 characters'),
        companies : Yup.string()
                    .required('Please Select Company')
    })

    function onSubmit(values) {
        setIsDisabled(true)

        getCompanyById(values.companies).then((response) => {            
             const compObj = {
                comp_id   : response.data.comp_id,
                comp_name : response.data.comp_name
             }
            const dept = {
                 dept_id : values.dept_id , dept_name : values.dept_name , company : compObj
            }
            if(id == -1) {
                saveDepartment(dept).then((response)=> {
                    setIsDisabled(false)
                    toast.success(response?.data?.statusMsg)
                    navigate(`/viewdepartments`)
                }).catch((error) => {
                    toast.success(error?.data?.errorMessage)
                    navigate(`/viewdepartments`)
                })
            }
            else { 
                    if(dept.company.comp_id==null || dept.company.comp_id=='') {
                        dept.company = company
                    }
                    updateDepartment(dept).then((response)=> {
                        toast.success(response?.data?.statusMsg)
                        setIsDisabled(false)
                        navigate(`/viewdepartments`)
                    }).catch((error) => {
                        toast.error(error?.data?.errorMessage)
                        setIsDisabled(false)
                        navigate(`/viewdepartments`)
                    })
                }            
            })
    }
 
    return(
          <Box>
            <Typography variant="h4" gutterBottom>{btnValue}</Typography>
            <Box sx={{ width: "100%", maxWidth: 1000, mx: "auto", p: 2 }}></Box>
            <Formik
                initialValues={ {  dept_id , dept_name , companies: selectedCompanyId } }
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {
                    (props)=> (
                        <Form>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                                {/* Dropdown Select */}
                                <FormControl
                                    variant="standard"
                                    fullWidth
                                    error={props.touched.companies && Boolean(props.errors.companies)}
                                >
                                    <InputLabel id="company-label">Select Company</InputLabel>
                                    <Select
                                        labelId="company-label"
                                        id="companies"
                                        name="companies"
                                        value={props.values.companies}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        >
                                        {
                                            companies.map(
                                                (company) =>(
                                                    <MenuItem key={company.comp_id} value={company.comp_id}>{company.comp_name}</MenuItem>
                                                ) )   
                                        }                                    
                                    </Select>
                                    <FormHelperText>
                                    <ErrorMessage name="companies" />
                                    </FormHelperText>
                                </FormControl>
                                <TextField  id="dept_name"
                                            name="dept_name"
                                            label="Department Name"
                                            variant="standard"
                                            placeholder="Enter Department Name"
                                            value={props.values.dept_name}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            error={props.touched.dept_name && Boolean(props.errors.dept_name)}
                                            helperText={<ErrorMessage name="dept_name" />}
                                            fullWidth />
                            </Box>
                            <Box className="btnvalue">
                                    <Button
                                        type="submit"
                                        style={{ float: 'left' }}
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
      </Box>
    );
}