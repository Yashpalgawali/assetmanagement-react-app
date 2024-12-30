import { useNavigate, useParams } from "react-router-dom"
import { getAssetTypeById, saveAssetType, updateAssetType } from "./api/AssetTypeService"
import { useEffect, useState } from "react"
import { Field, Form, Formik } from "formik"

export default function AssetTypeComponent(){

    const {id} = useParams()
    const [type_id , setTypeId] = useState('')
    const  [type_name ,setTypeName] = useState('')
    const navigate = useNavigate()
    const [title ,setTitle] = useState('')

    useEffect(()=>{
        if(id== -1) {
            setTitle('Add Asset type')
        }
        else {
            setTitle('Update Asset type')
            getAssetTypeById(id)
                .then(
                    (response) => {
                        setTypeId(response.data.type_id)
                        setTypeName(response.data.type_name)
                    }
            )
        }
    },[title])

//     useEffect(()=>{
         
//         if(id === -1) {
//             setTitle('Add Asset type')
//             alert('Inside if \n '+title)
//             // getAssetTypeById(id)
//             //     .then(
//             //         (response) => {
//             //             setTypeId(response.data.type_id)
//             //             setTypeName(response.data.type_name)
//             //         }
//             // )
//         }
//         else {
//             setTitle('Update Asset type')
//             alert('Inside else \n '+title)
//         }
// },[title]);
    
    

    function onSubmit(values)
    {
        let assettype = {
            type_id : type_id,
            type_name : type_name
        }
        
        if(type_id!== -1){
                saveAssetType(values)
                    .then((response)=> navigate('/assettype'))
                    .catch((error)=>{
                        alert('Not Saved')
                    })
        }
        else{
            updateAssetType(values)
                    .then((response)=> navigate('/assettype'))
                    .catch((error)=>{
                        alert('Not Updated')
                    })
        }   
    }

    function validate(values){
        let errors = {}

        if(values.type_name.length <5){
            errors.type_name = 'Please enter valid type name'
        }

    }

    return(
         <div className="container">
            <h3>{title}</h3>
          
            <Formik initialValues={ { type_name , type_id } }
                        enableReinitialize = {true}
                        onSubmit={onSubmit}
                        validate={validate}
                        validateOnChange = {false}
                        validateOnBlur = {false}
            >{
                (props)=>(
                    <Form>

                        <fieldset className="form-group">
                            <label htmlFor="type_name">Asset type</label>
                            <Field type="text" name="type_name" className='form-control'></Field>
                        </fieldset>
                        <div>
                            <button className="btn btn-success m-2"  type="submit" >Save Asset Type</button>
                        </div>
                    </Form>
                )
            }
            </Formik>
        </div>
    )
}