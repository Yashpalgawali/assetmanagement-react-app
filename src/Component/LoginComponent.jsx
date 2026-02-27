import {Box, Button, TextField, Typography} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";

export default function LoginComponent() {

    const [username,setUsername] =  useState('')
    const [password,setPassword] =  useState('')

    function onSubmit(values){
        if(username==="admin" && password==="admin"){
            alert('matched')
        }
        console.log(values)
    }

    return(
        <div className="container">
            <Typography variant="h4">Login Here</Typography>
            <Formik
                enableReinitialize={true}
                initialValues={{username,password}}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={onSubmit}
            >
             {
                (props) => (
                    <Form>
                        <Box>
                            <TextField
                                variant="outlined"
                                type="text" 
                                name="username"
                                id="username"
                                placeholder="Enter Username"
                                value={props.values.username}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}                                
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
                            <Button variant="contained" onClick={onSubmit} color="success">Login Here</Button>
                        </Box>
                    </Form>
                )
             }   
            </Formik>
        </div>
    );
}