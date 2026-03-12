import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllAssetTypes } from "../../api/AssetTypeApiClient";

export default function ViewAssetTypeComponent() {
    const [assetTypeList, setAssetTypeList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllAssetTypes().then((response) => {
            setAssetTypeList(response.data)         
        })
    }, [])

    function updateAssetType(id) {
        navigate(`/assettype/${id}`)
    }
    return (
        <div className="container">
            <Typography variant="h4" gutterBottom> View Asset Types <Button variant="contained" style={{float : 'right'}} onClick={()=>navigate(`/assettype/-1`)}>Add Asset Type</Button> </Typography>
            
            <table className="table table-striped table-hover">
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
                                <Button variant="contained" color="success" onClick={()=>updateAssetType(assetType.type_id)}>Edit</Button>
                            </td>
                        </tr>
                    ))}        
                </tbody>
            </table>            
        </div>
    )
}       
        