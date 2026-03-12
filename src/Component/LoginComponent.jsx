import {Box, Button, Divider, Grid, IconButton, InputAdornment, TextField, Paper, Typography} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Security/authContext";


import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';
import BusinessIcon from '@mui/icons-material/Business';

export default function LoginComponent() {

    const [username,setUsername] =  useState('')
    const [password,setPassword] =  useState('')
  const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()
    
    const authContext = useAuth()

     async function onSubmit(values) {
        alert('called')
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

        <Grid container sx={{ height: "100vh" }}>

      {/* LEFT SIDE VISUAL */}

      <Grid
        item
        xs={false}
        md={7}
        sx={{
          background: "linear-gradient(135deg,#1976d2,#42a5f5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          flexDirection: "column",
          textAlign: "center",
          p: 5
        }}
      >

        <BusinessIcon  sx={{ fontSize: 80, mb: 2 }} />

        <Typography variant="h3" fontWeight="bold">
          Asset Management System
        </Typography>

        <Typography variant="h6" mt={2}>
          Manage corporate assets efficiently
        </Typography>

      </Grid>

      {/* RIGHT SIDE LOGIN FORM */}

      <Grid
        item
        xs={12}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 5
          }}
        >

          <Box sx={{ width: "100%", maxWidth: 400 }}>

            <Typography variant="h4" fontWeight="bold" mb={1}>
              Sign In
            </Typography>

            <Typography color="text.secondary" mb={3}>
              Enter your credentials to continue
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* <form onSubmit={handleSubmit}> */}
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
              {/* USERNAME */}
                <ErrorMessage name="username" component="div" className="alert alert-danger"/>
              <TextField
                fullWidth
                label="username"
                id="username"
                placeholder="Username"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                autoFocus={true}
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* <EmailIcon /> */}
                    </InputAdornment>
                  )
                }}
              />

              {/* PASSWORD */}
                <ErrorMessage name="password" component="div" className="alert alert-danger"/>
              <TextField
                fullWidth
                label="Password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                type={showPassword ? "text" : "password"}
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),

                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              {/* LOGIN BUTTON */}

              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                sx={{ mt: 3, py: 1.5 }}
              >
                Login
              </Button>

               </Form>
                )
             }    
               </Formik>
            {/* </form> */}

          </Box>

        </Box>

      </Grid>

    </Grid>


        // <div className="container">
        //     <Typography variant="h4">Login Here!!</Typography>
        //     <Formik
        //         enableReinitialize={true}
        //         initialValues={{username,password}}
        //         validateOnBlur={false}
        //         validateOnChange={false}
        //         onSubmit={onSubmit}
        //         validate={validate}
        //     >
        //      {
        //         (props) => (
        //             <Form>
        //                 <Box>
        //                     <ErrorMessage name="username" component="div" className="alert alert-danger"/>
        //                     <TextField
        //                         variant="outlined"
        //                         type="text"
        //                         name="username"
        //                         id="username"
        //                         placeholder="Enter Username"
        //                         value={props.values.username}
        //                         onChange={props.handleChange}
        //                         onBlur={props.handleBlur}
        //                         autoFocus={true}
        //                     >
        //                     </TextField>                            
        //                 </Box>
        //                 <Box>
        //                 <TextField
        //                         variant="outlined"
        //                         type="password" 
        //                         name="password"
        //                         id="password"
        //                         placeholder="Enter Password"
        //                         value={props.values.password}
        //                         onChange={props.handleChange}
        //                         onBlur={props.handleBlur}
        //                     >
        //                     </TextField>
        //                 </Box>
        //                 <Box>
        //                     <Button variant="contained" type="submit"  color="success">Login Here</Button>
        //                 </Box>
        //             </Form>
        //         )
        //      }   
        //     </Formik>
        // </div>
    );
}