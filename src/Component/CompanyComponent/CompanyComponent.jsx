
import {Box, Button, TextField, Typography} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CompanyComponent() {

    const [comp_name,setCompName] = useState('')

    let btnValue = "Add Company"

    const {id} = useParams()

    useEffect(()=>{
       
        if(id != -1) {
            btnValue= "Update Company"
        }
    },[id])

    function saveCompany(values){
        console.log('Company ',values)
        if(id == -1) {
            alert('save')
        }
        else {
            alert('update')
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