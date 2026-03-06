
import {Box, Button, TextField, Typography} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCompanyById, updateCompany } from "../../api/CompanyApiClient";
import {showToast} from "../SharedComponent/showToast";
import { toast } from "react-toastify";

export default function CompanyComponent() {

    const [comp_name,setCompName] = useState('')
    const [comp_id,setCompanyId] = useState(-1)

    const [btnValue,setBtnValue] = useState("Add Company")
    const navigate = useNavigate()

    const {id} = useParams()
  
    useEffect(()=>{
       
        if(id != -1) {
            setBtnValue("Update Company")
            getCompanyById(id).then(response=> {
                setCompName(response.data.comp_name)
                setCompanyId(id)
            })
        }
    },[id])

    function saveCompany(values){

        if(id == -1) {
            let companyObject = {                 
                comp_name : values.comp_name
            }
            saveCompany(companyObject).then((response) => {
                showToast(response.data.successMessage,"success")
                navigate(`/viewcompanies`)
            }).catch((error)=>{
                showToast(error.data.errorMessage,"error")
                navigate(`/viewcompanies`)
            })
        }
        else {
            let companyObject = {
                comp_id : id,
                comp_name : values.comp_name
            }
            updateCompany(companyObject).then((response) => {
                toast.success(response.data.statusMessage)
                
                navigate(`/viewcompanies`)
            }).catch((error)=>{
                showToast(error.data.errorMessage,"error")
                navigate(`/viewcompanies`)
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
        <div className="container">
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
                            <Box>
                                <TextField
                                    variant="filled"
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
                            </Box>
                            <Box>
                                <Button variant="contained" color="success" className="m-4" type="submit">{btnValue}</Button>
                            </Box>
                        </Form>
                    )
                }
            </Formik>
        </div> 
    )
}