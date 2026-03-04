import { ErrorMessage, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Box, Button, TextField, Typography } from "@mui/material"
import { retrieveDesignationById, saveDesignation, updateDesignation } from "../../api/DesignationApiClient"

import {showToast} from "../SharedComponent/showToast";

export default function DesignationComponent() {

    const [desig_name,setDesignation] = useState('')
    const [desig_id, setDesignationId] = useState(-1)

    const {id}  = useParams()
    const [btnValue,setBtnValue] = useState('Add Designation')
    const navigate = useNavigate()

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
       let designation = {
        desig_id : id,
        desig_name : values.desig_name
       }

       if(id != -1) {
            updateDesignation(designation)
                            .then((response)=> { 
                                showToast(response.data.statusMsg,"success");
                                navigate(`/viewdesignations`);
                            })
                            .catch((error)=> { 
                                showToast(error.data.errorMessage,"error"); 
                                navigate(`/viewdesignations`);
                            })
       }
       else {
            saveDesignation(designation)
                            .then((response)=> { 
                                showToast(response.data.statusMsg,"success"); 
                                navigate(`/viewdesignations`);
                            })
                            .catch((error)=> { 
                                showToast(error.data.errorMessage,"error"); 
                                navigate(`/viewdesignations`);
                            })
       }
    }

    return(
        <div className="container">
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
                        <Button type="submit" variant="contained" color="success" onClick={onSubmit} >{btnValue}</Button>
                    </Form>
                )
        }   
        </Formik>
       </div>
    );
}