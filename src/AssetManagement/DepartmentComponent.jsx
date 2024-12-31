import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDepartmentByDeptId, saveDepartment } from "./api/DepartmentApitService"
import { ErrorMessage, Field, Form, Formik } from "formik"
import {  getAllCompaniesApi } from "./api/CompanyApiService"

export default function DepartmentComponent() {

    const {id} = useParams()
    const navigate = useNavigate()
    const [dept_id , setDeptId] = useState('')
    const [dept_name , setDeptName] = useState('')
    const [comp_id , setCompId] = useState('')
    const [comp_name , setCompName] = useState('')
    const [complist ,setCompList] = useState([])
    const [selectedCompany, setSelectedCompany] = useState("");
    const [title ,setTitle] = useState('')

    const handleChange = (event) => {
        
        const selectedKey = event.target.value; // The selected key
        alert('selected key '+selectedKey)
        setSelectedCompany(selectedKey);
       // const selectedItem = complist.find(company => company.id === selectedKey); // Find the full object

        alert(complist.find(comp=> alert('ID '+comp.id)))

       // console.log('List is '+complist )

        // alert('selected Item = '+selectedItem)
         //  console.log(`Selected Key: ${selectedItem.id}, Selected Value: ${selectedItem.name}`);
      };
    //   Handle dropdown change

    // const handleChange = (event) => {
    //         const selectedKey = event.target.value; // The selected key
    //         alert(selectedKey)
    //         // const selectedItem = complist.find(company => company.id === selectedKey); // Find the full object

    //         // Update the state with the selected option
    //         // setSelectedOption(selectedItem);

    //         // Log both key and value
    //         // console.log(`Selected Key: ${selectedItem.id}, Selected Value: ${selectedItem.name}`);
    // };

    useEffect(
        () => {
            getAllCompaniesApi().then((response) => {
                setCompList(response.data)
            })
            if(id == -1) {
                
                setTitle('Add Department')
            }
            else {
                getDepartmentByDeptId(id)
                    .then((response) => {
                        setTitle('Update Department')
                        setDeptId(response.data.dept_id)
                        setDeptName(response.data.dept_name)
                        setCompName(response.data.comp_name)
                    })
            }
 
        },[]
    )

    function saveDepartment(values) {
        console.log(values)
    }

    function validate(values)
    {
        let errors = []

        if(values.dept_name === '' || values.dept_name === null) 
        {
           errors.dept_name = 'Please enter Department Name'
        }
        return errors
    }
    
    // State to store selected option
    const [selectedOption, setSelectedOption] = useState(null);

    return(
        <div className="container">
            <h2>{title}</h2>

        <Formik initialValues={ { dept_id,dept_name ,id }}
                    onSubmit={saveDepartment}
                    enableReinitialize={true}
                    validateOnChange = {false}
                    validateOnBlur = {false}
                    validate={validate}
        > 
            {    
                (props) => (
                    <Form >
                        <ErrorMessage name="dept_name" component='div' className="alert alert-danger"/>
                        <fieldset>
                            <label>Company</label>
                            <select className="form-control" value={selectedCompany } onChange={handleChange}>
                            <option  disabled selected> Select Company</option>
                                {complist.map(company => (
                                    <option key={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                ))}
                                
                                {
                                    // complist.map(
                                    //     ([company])=>(
                                    //         <option key={company.id} value={company.id} >{company.name}</option>
                                    //     )
                                    // )
                                }
                            </select>
                            {selectedOption && (
                                <div>
                                    <p>Selected Key: {selectedOption.key}</p>
                                    <p>Selected Value: {selectedOption.value}</p>
                                </div>
                                )}
                        </fieldset>
                        <fieldset>
                            <label>Department Name</label>
                            <Field className="form-control" type="text" name="dept_name" placeholder="Enter Department Name"></Field>
                        </fieldset>
                        <div>
                            <button type="button" className="btn btn-success m-3" onClick={saveDepartment}>Save Department</button>
                        </div>
                    </Form>
                )
            }
        </Formik>

        </div>
    )
}