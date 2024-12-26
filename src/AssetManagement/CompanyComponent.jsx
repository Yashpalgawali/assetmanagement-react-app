import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { getCompanyById, saveCompany, updateCompany } from "./api/CompanyApiService";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function CompanyComponent(){

    const [name ,setName] = useState('')
    const [id , setId] = useState('')

    const {paramid} = useParams()
    
    const navigate = useNavigate()

        useEffect(
            ()=>
            retrieveCompanyById(),[paramid]
        )

    function retrieveCompanyById(){
        if(paramid != -1)
        {
            getCompanyById(paramid).then((response)=> 
            {
                setId(response.data.id)
                setName(response.data.name)
            })
        }

    }

    function onSubmit(values){
        
        const company = {
            id : id,
            name : name
        }
        console.log('after submit '+company)

        if(id=== -1){
            saveCompany(values)
                .then(()=> navigate('/companies'))
                .catch(()=> alert('Not saved'))
        }
        else {
            updateCompany(values)
                .then(()=> navigate('/companies'))
                .catch(()=> alert('Not saved'))
        }
        
    }

    function validate(values){
        let errors = {
          //  name : 'Enter valid name'
        }
        if(values.name.length <5 ){
            errors.name = 'Enter valid name'
        }
       // console.log(values)
        return errors
    }

    return(
        <div className="container">
            <h1>Enter company details</h1>
            <div>
                <Formik initialValues={ { name , id } }
                                    enableReinitialize = {true}
                                    onSubmit={onSubmit}
                                    validate={validate}
                                    validateOnChange = {false}
                                    validateOnBlur = {false}
                >
                    {
                        (props)=>(
                            <Form>
                                <ErrorMessage name="name" component="div" className="alert alert-warning"></ErrorMessage>
                                {/* <Field className="form-control" type="hidden" name="id" value={id}></Field> */}
                                <fieldset className="form-group">
                                    <label htmlFor="name">Company Name</label>
                                    <Field className="form-control" type="text" name="name"  ></Field>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-2"  type="submit" >Save Company</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}