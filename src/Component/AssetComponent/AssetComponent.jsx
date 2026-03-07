import { ErrorMessage, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { retrieveAssetById, saveAsset, updateAsset } from "../../api/AssetApiClient";
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
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
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
       
       getAllAssetTypes().then((response) => {
        setAssetTypeList(response.data)
        
       })

        if(id != -1)
        {
            setBtnValue("Update Asset")
            retrieveAssetById(id).then((response) => {
                console.log('found Asset ',response.data )

                setAssetName(response.data.asset_name);
                setAssetID(response.data.asset_id);
                setModelNumber(response.data.model_number);
                setAssetNumber(response.data.asset_number);
                setQuantity(response.data.quantity);
                setAssetType(response.data.atype);
            })
        }
    }, []); 

    function handleSubmit(values) {
        setAssetType({
          type_id: values.atype
        })
        const assetData = { asset_name : values.asset_name , asset_id: values.asset_id, model_number: values.model_number, asset_number: values.asset_number, quantity: values.quantity, atype: values.atype };
        if(id == -1) {
            saveAsset(assetData).then((response) => {
                console.log('Asset Added ', response.data)
                toast.success(response.data.statusMsg)
                navigate('/viewassets')
            }).catch((error) => {
                toast.error(error.data.errorMsg)
                navigate('/viewassets')
            })
        }
        else {
            updateAsset(assetData).then((response) => {
                console.log('Asset Updated ', response.data)
                toast.success(response.data.statusMsg)
                navigate('/viewassets')
            }).catch((error) => {
                toast.error(error.data.errorMsg)
                navigate('/viewassets')
            })
        }
    }

  return (
    <div className="container">
      <Typography variant="h4" gutterBottom> {btnValue} </Typography>

      <Formik
        initialValues={{ asset_name, asset_id, model_number,asset_number, quantity, atype }}
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
                    <Button variant="contained" type="submit" color="success"> {btnValue} </Button>
                </Form>
            )
        }
      </Formik>

    </div>
  );
}