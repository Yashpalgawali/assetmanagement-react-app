import { useEffect, useState } from "react"
import { getAllAssets } from "../../api/AssetApiClient"
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ViewAssetsComponent() {
    
    const [assetList,setAssetList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
         getAllAssets().then((response) => {
            setAssetList(response.data)
            console.log(response.data)
         })
    } , [])

    return(
        <div className="container">
            <h1>View Assets</h1>
            <table className="table table-hover table-striped">
                <thead>
                    <th>Sr</th>
                    <th>Asset Type</th>
                    <th>Asset Name</th>
                    <th>Model Number</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    {
                        assetList.map((asset,index) => {
                            return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{asset.atype.type_name}</td>
                                    <td>{asset.asset_name}</td>
                                    <td>{asset.model_number}</td>
                                    <td>{asset.quantity}</td>
                                    <td><Button variant="contained" onClick={() => navigate(`/asset/${asset.asset_id}`)}>Edit</Button></td>
                                </tr>
                            )
                        })      
                    }

                </tbody>
            </table>
        </div>
    )
}