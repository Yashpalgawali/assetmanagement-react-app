import {Box, Button, TextField, Typography} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Security/authContext";

export default function LoginComponent() {

    const [username,setUsername] =  useState('')
    const [password,setPassword] =  useState('')

    const navigate = useNavigate()
    
    const authContext = useAuth()

     async function onSubmit(values) {

        if(await authContext.login(values.username,values.password)) {
            navigate(`/`)
        }
        else {
           navigate(`/login`)
        }
    }

    function validate(values) {
         
        let errors= { }
        if(values.username.length==0) {
            errors.username = "Please Enter Username"
        }

        if(values.password.length==0) {
            errors.password = "Please Enter Password"
        }
        return errors
    }

    return(
        <div className="container">
            <Typography variant="h4">Login Here!!</Typography>
            <Formik
                enableReinitialize={true}
                initialValues={{username,password}}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={onSubmit}
                validate={validate}
            >
             {
                (props) => (
                    <Form>
                        <Box>
                            <ErrorMessage name="username" component="div" className="alert alert-danger"/>
                            <TextField
                                variant="outlined"
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter Username"
                                value={props.values.username}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                autoFocus={true}
                            >
                            </TextField>                            
                        </Box>
                        <Box>
                        <TextField
                                variant="outlined"
                                type="password" 
                                name="password"
                                id="password"
                                placeholder="Enter Password"
                                value={props.values.password}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                            >
                            </TextField>
                        </Box>
                        <Box>
                            <Button variant="contained" type="submit"  color="success">Login Here</Button>
                        </Box>
                    </Form>
                )
             }   
            </Formik>
        </div>
    );
}