import { ErrorMessage, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Box, Button, TextField, Typography } from "@mui/material"

export default function DesignationComponent() {

    const [designation,setDesignation] = useState('')

    const {id}  = useParams()
    let btnValue = 'Add Designation'

    useEffect(()=> {
       
        if(id != -1) {
            btnValue='Update Designation'
        }

    }, [])

    function onSubmit(values)
    {
        console.log('The Object is ',values)
    }

    return(
        <div className="container">
            <Typography variant="h4" >{btnValue}</Typography>
            <Formik
                enableReinitialize={true}
                initialValues={{ designation }}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={onSubmit}
            >
            {
                (props)=> (
                    <Form>
                        <TextField
                            name="designation"
                            variant="standard"
                            placeholder="Enter Designation"
                            id="designation"
                            value={props.values.designation}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            error={props.touched.designation && Boolean(props.errors.designation)}
                            helperText={<ErrorMessage name="designation" />}
                            fullWidth
                        />
                        <Button type="submit" variant="contained" color="success" onClick={onSubmit} >{btnValue}</Button>
                    </Form>
                )
        }   
        </Formik>
       </div>
    );
}