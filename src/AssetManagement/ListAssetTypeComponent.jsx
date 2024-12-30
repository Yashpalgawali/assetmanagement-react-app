import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllAssetTypes } from "./api/AssetTypeService"

export default function ListAssetTypeComponent(){
    let [assettypelist , setAssetTypeList] = useState([])
    const [type_id , setType_Id] = useState('')
    const [type_name ,setTypeName] = useState('')

    const navigate = useNavigate()
    useEffect(
        ()=>{
            getAllAssetTypes()
            .then(
                (response) => {
                    console.log('result is \n'+response.data)
                    setAssetTypeList(response.data)
                }
            )
                
        },[]
    )

    function addAssetType(){
        navigate('/assettype/-1')
    }

    function updateAssetType(type_id){
        navigate(`/assettype/${type_id}`)
    }

    return(
        <div className="container">
            <div><h3>List Asset Types</h3></div>

        <div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Asset type</th>
                    <th>UPDATE</th>
                    </tr>
                </thead>
                <tbody>
                {
                     assettypelist.map(([type_id, type_name], index) => (
                        <tr key={type_id || index}>
                                <td>{type_id} </td>
                                <td>{type_name} </td>
                                <td><button className="btn btn-primary m-2 " onClick={() => updateAssetType(type_id)} >UPDATE</button> </td>
                            </tr>
                    ))     
                }
                </tbody>
            </table>
            <div><button className="btn btn-success m-3" onClick={addAssetType} >Add Asset Type</button></div>
        </div>
    </div>
    )
}