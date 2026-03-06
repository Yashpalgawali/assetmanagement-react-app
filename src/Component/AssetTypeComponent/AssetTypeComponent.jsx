import { Box, Button, TextField, Typography } from "@mui/material"
import { ErrorMessage, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { getAssetType, updateAssetType } from "../../api/AssetTypeApiClient"

export default function AssetTypeComponent(){

    const [type_name, setTypeName] = useState('')
    const [type_id, setTypeId] = useState(0)

    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
            if(id != -1) {
                getAssetType(id).then((response) => {
                    setTypeName(response.data.type_name)
                    setTypeId(response.data.type_id)
                }).catch((error) => {
                    toast.error('Error fetching Asset Type details')
                })
            }
    }, [id])

    function saveAssetType(values) {
        if(id == -1) {
            saveAssetType(values).then((response) => {
                toast.success(response.data.statusMsg)
                navigate('/viewassettypes')
            }).catch((error) => {
                toast.error(error.data.errorMessage)
                navigate('/viewassettypes')
            })
        }
        else {            
                updateAssetType(values).then((response) => {
                    toast.success(response.data.statusMsg)
                    navigate('/viewassettypes')
                }).catch((error) => {
                    toast.error(error.data.errorMessage)
                    navigate('/viewassettypes')
                })               
        }
    }

    return (

        <div className="container">
            <Typography variant="h4" gutterBottom> {id == -1 ? 'Add Asset Type' : 'Edit Asset Type'} </Typography>
           
            <Formik
                initialValues={{ type_name , type_id  }}
                enableReinitialize={true}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={saveAssetType}
            >
             {
                (props) => (
                    <Form>
                        <Box>
                        <TextField 
                            type="text"
                            name="type_name"
                            id="type_name"
                            variant="standard"
                            value={props.values.type_name}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="type_name" />}
                            fullWidth
                            autoFocus={true}
                            placeholder="Enter Asset Type" />
                        <Button type="submit" variant="contained" color="primary">{id == -1 ? 'Save Asset Type' : 'Update Asset Type'}</Button>
                       </Box>
                    </Form>
                )
             }   
            </Formik>   

          </div>
    )
} 
