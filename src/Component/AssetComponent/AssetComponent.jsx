import $ from 'jquery'; // jQuery is required for DataTables to work
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality

import { ErrorMessage, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllAssets, retrieveAssetById, saveAsset, updateAsset } from "../../api/AssetApiClient";
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { getAllAssetTypes } from "../../api/AssetTypeApiClient";
import { toast } from "react-toastify";

export default function AssetComponent() {
    
    const [asset_name,setAssetName] = useState("");
    const [asset_id,setAssetID] = useState("");
    const [model_number,setModelNumber] = useState("");
    const [asset_number,setAssetNumber] = useState("");
    
    const [quantity,setQuantity ] = useState("");
    const [atype,setAssetType] = useState({
                                        type_id: 0,
                                        type_name: ""
                                    });
    const [atypelist,setAssetTypeList] = useState ([null]);

    const [btnValue,setBtnValue]  = useState("Add Asset");
    const [isDisabled,setIsDisabled] = useState(false)
    const [selectedAssettypeId,setSelectedAssettypeId] = useState('')
    
    const [assetList,setAssetList] = useState([]);
    const tableRef= useRef(null)   
    
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
            getAllAssets().then((response) => {
            setAssetList(response.data)
            })
    } , [])

    useEffect(()=> {
        if(tableRef.current && assetList.length >0 ) 
        {
            $(tableRef.current).DataTable();
        }
    },[assetList])

    useEffect(() => {
        resetAssetForm()
        getAllAssetTypes().then((response) => {
            setAssetTypeList(response.data)
        })
        
        if(id != -1)
        {
            setBtnValue("Update Asset")
            retrieveAssetById(id).then((response) => {

                setAssetName(response.data.asset_name);
                setAssetID(response.data.asset_id);
                setModelNumber(response.data.model_number);
                setAssetNumber(response.data.asset_number);
                setQuantity(response.data.quantity);
                setSelectedAssettypeId(response.data.atype.type_id);
                 
            })
        }
    }, [id]); 

    function refreshAllAssets() {
        getAllAssets().then((response) => {
                setAssetList(response.data)
            })
    }

    function resetAssetForm()
    {
        setSelectedAssettypeId('')
        setBtnValue('Add Asset')
        setIsDisabled(false)
        setAssetName('')
        setAssetNumber('')
        setModelNumber('')
        setQuantity('')
        setAssetID('')
        refreshAllAssets()
    }
    function handleSubmit(values) {
        setIsDisabled(true)

        setAssetType({
          type_id: values.atype
        })
        const assetData = { asset_name : values.asset_name , asset_id: values.asset_id, model_number: values.model_number, asset_number: values.asset_number, quantity: values.quantity, atype: values.atype };
             
        if(id == -1) {
            saveAsset(assetData).then((response) => {
                toast.success(response.data.statusMsg)
                resetAssetForm()
                navigate(`/asset/-1`)
            }).catch((error) => {
                toast.error(error.data.errorMsg)
                resetAssetForm()
                navigate(`/asset/-1`)
            })
        }
        else {
            updateAsset(assetData).then((response) => {
                
                toast.success(response.data.statusMsg)
                resetAssetForm()
                navigate(`/asset/-1`)
            }).catch((error) => {
                 
                toast.error(error.data.errorMsg)
                resetAssetForm()
                navigate(`/asset/-1`)
            })
        }
    }

  return (
    <Box >
      <Typography variant="h4" gutterBottom> {btnValue} </Typography>
      <Formik
        initialValues={{ asset_name, asset_id, model_number,asset_number, quantity,  atype : selectedAssettypeId  }}
        enableReinitialize={true}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {
            (props)=> (
                <Form>
                    <FormControl
                                variant="standard"
                                fullWidth
                                error={props.touched.atype && Boolean(props.errors.atype)}
                                >
                    <InputLabel id="asset-type-label">Select Asset Type</InputLabel>
                    <Select
                        labelId="asset-type-label"
                        id="atype"
                        name="atype"
                        value={props.values.atype}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                    >
                    {atypelist &&
                            atypelist.map((atype) =>
                                atype ? (
                                <MenuItem key={atype.type_id} value={atype.type_id}>
                                    {atype.type_name}
                                </MenuItem>
                                ) : null
                            )}
                    </Select>
                  </FormControl>
                <TextField  id="asset_name"
                            name="asset_name"
                            label="Asset Name"
                            variant="standard"
                            placeholder="Enter Asset Name"
                            value={props.values.asset_name}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            error={props.touched.asset_name && Boolean(props.errors.asset_name)}
                            helperText={<ErrorMessage name="asset_name" />}
                            fullWidth />
                <TextField  id="model_number"
                            name="model_number"
                            label="Model Number"
                            variant="standard"
                            placeholder="Enter Assets Model Number "
                            value={props.values.model_number}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            error={props.touched.model_number && Boolean(props.errors.model_number)}
                            helperText={<ErrorMessage name="model_number" />}
                            fullWidth />

                    <TextField  id="asset_number"
                            name="asset_number"
                            label="Asset Number"
                            variant="standard"
                            placeholder="Enter Asset Number"
                            value={props.values.asset_number}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            error={props.touched.asset_number && Boolean(props.errors.asset_number)}
                            helperText={<ErrorMessage name="asset_number" />}
                            fullWidth />

                    <TextField  id="quantity"
                            name="quantity"
                            label="Quantity"
                            variant="standard"
                            placeholder="Enter Quantity"
                            value={props.values.quantity}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            error={props.touched.quantity && Boolean(props.errors.quantity)}
                            helperText={<ErrorMessage name="quantity" />}
                            fullWidth />
                    <Button variant="contained" sx={{float : 'left'}} type="submit" disabled={isDisabled} color="primary"> {btnValue} </Button>
                </Form>
            )
        }
      </Formik>
        <div>
        <Typography variant="h4" gutterBottom>View Assets </Typography>
                    <table ref={tableRef} className="table table-hover table-striped">
                        <thead>
                            <tr>
                            <th>Sr</th>
                            <th>Asset Type</th>
                            <th>Asset Name</th>
                            <th>Model Number</th>
                            <th>Quantity</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            assetList.map((asset,index) => {
                                return(
                                    <tr key={asset.asset_id}>
                                        <td>{index+1}</td>
                                        <td>{asset.atype.type_name}</td>
                                        <td>{asset.asset_name}</td>
                                        <td>{asset.model_number}</td>
                                        <td>{asset.quantity}</td>
                                        <td>
                                            <Button variant="contained" onClick={() => navigate(`/asset/${asset.asset_id}`)}>Edit</Button></td>
                                    </tr>
                                )
                            }) 
                            }        
                        </tbody>
                    </table>
                </div>
    </Box>
  );
}