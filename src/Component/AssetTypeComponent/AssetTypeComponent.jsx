import $ from 'jquery'; // jQuery is required for DataTables to work
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality

import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material"
import { ErrorMessage, Form, Formik } from "formik"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { getAllAssetTypes, getAssetType, updateAssetType } from "../../api/AssetTypeApiClient"
import EditIcon from '@mui/icons-material/Edit';

export default function AssetTypeComponent(){

    const [type_name, setTypeName] = useState('')
    const [type_id, setTypeId] = useState(0)
    const [btnValue,setBtnValue]  = useState('Add Asset Type')
    const [isDisabled,setIsDisabled] = useState(false)

    const navigate = useNavigate()
    const {id} = useParams()
    const tableRef= useRef(null)

    const [assetTypeList, setAssetTypeList] = useState([])
    
    useEffect(() => {
        getAllAssetTypes().then((response) => {
            setAssetTypeList(response.data)         
        })
    }, [])

    function refreshAssetTypes() {
        getAllAssetTypes().then((response) => {
            setAssetTypeList(response.data)         
        })
    }
    useEffect(()=>{
        if(tableRef.current && assetTypeList.length >0 ) {
            $(tableRef.current).DataTable();
        }
    },[assetTypeList])
    
    useEffect(() => {
            if(id != -1) {
                setBtnValue('Update Asset Type')
                getAssetType(id).then((response) => {
                    setTypeName(response.data.type_name)
                    setTypeId(response.data.type_id)
                }).catch((error) => {
                    toast.error('Error fetching Asset Type details')
                })
            }
    }, [id])

    function saveAssetType(values) {
        setIsDisabled(true)
        if(id == -1) {
            let atype = {
                    type_name : values.type_name
                }
            saveAssetType(atype).then((response) => {
                refreshAssetTypes()
                toast.success(response.data.statusMsg)                
                setIsDisabled(false)
                navigate(`/assettype/-1`)
            }).catch((error) => {
                refreshAssetTypes()
                toast.error(error.data.errorMessage)
                setIsDisabled(false)
                navigate(`/assettype/-1`)
            })
        }
        else {
                let atype = {
                    type_id : id,
                    type_name : values.type_name
                }
                updateAssetType(atype).then((response) => {

                    setTypeName('')
                    refreshAssetTypes()
                    setBtnValue('Add Asset Type')
                    toast.success(response.data.statusMsg)
                    setIsDisabled(false)
                    navigate(`/assettype/-1`)
                }).catch((error) => {
                    setTypeName('')
                    refreshAssetTypes()
                    setBtnValue('Add Asset Type')
                    toast.error(error.data.errorMessage)
                    setIsDisabled(false)
                    navigate(`/assettype/-1`)
                })               
        }
    }

    function validate(values) {
        let errors = {}
        if(!values.type_name) {
            errors.type_name = 'Please enter Asset Type'
        }     
        return errors
    }

    return (
        
        <Box sx={{ p : 5, m : 5 , boxShadow : 10}}>
            <Typography variant="h4" gutterBottom> {btnValue} </Typography>
           
            <Formik
                initialValues={{ type_name , type_id  }}
                enableReinitialize={true}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={saveAssetType}
                validate={validate}
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
                        <Button type="submit" 
                        style={{float : 'left'}}
                        disabled={isDisabled}
                                startIcon={
                                    isDisabled ? <CircularProgress size={20} /> : null
                                }
                        variant="contained" color="primary">{btnValue}</Button>
                       </Box>
                    </Form>
                )
             }   
            </Formik>
             <Box sx={{mt : 5}}>
            <Typography variant="h4" gutterBottom> View Asset Types </Typography>
            <table ref={tableRef} className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Asset Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assetTypeList.map((assetType,index) => (
                        <tr key={assetType.type_id}>
                            <td>{index+1}</td>
                            <td>{assetType.type_name}</td>
                            <td>
                                <Button 
                                    variant="contained" color="success" 
                                    onClick={()=>navigate(`/assettype/${assetType.type_id}`)}><EditIcon />Edit</Button>
                            </td>
                        </tr>
                    ))}        
                </tbody>
            </table>
            </Box>
        </Box>
    )
} 
