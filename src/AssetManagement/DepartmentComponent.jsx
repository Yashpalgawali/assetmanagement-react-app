import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDepartmentByDeptId } from "./api/DepartmentApitService"
import { Field, Form, Formik } from "formik"
import { companyurl } from "./api/CompanyApiService"

export default function DepartmentComponent() {

    const {id} = useParams()
    const navigate = useNavigate()
    const [dept_id , setDeptId] = useState('')
    const [dept_name , setDeptName] = useState('')
    const [comp_id , setCompId] = useState('')
    const [comp_name , setCompName] = useState('')
    const [complist ,setCompList] = useState([])
    const [selectedCompany, setSelectedCompany] = useState("");

    const handleChange = (event) => {
        alert(event.target.value)
        setSelectedCompany(event.target.value);
      };

    useEffect(
        () => {
            companyurl().then((response) => {
                setCompList(response.data)
            })
        },[]
    )

    if(id !== -1)
    {
        getDepartmentByDeptId(id)
            .then((response) => {
                
                setDeptId(response.data.dept_id)
                setDeptName(response.data.dept_name)
            })
    }
    return(
        <div className="container">
            <h2>Department</h2>

        <Formik initialValues={ { dept_id,dept_name,comp_id }}
                    enableReinitialize={true}
                    validateOnChange = {false}
                    validateOnBlur = {false}
        >
            {    
                (props) => (
                    <Form className="form-group">
                        <fieldset>
                            <label>Company</label>
                            <select className="form-control" value={selectedCompany} onChange={handleChange}>
                                <option>Select Company</option>
                                {
                                    complist.map(
                                        ([id,name])=>(
                                            <option key={id}>{name}</option>
                                        )
                                    )
                                }
                            </select>
                        </fieldset>
                        <fieldset>
                            <label>Department Name</label>
                            <Field className="form-control" type="text" name="dept_name" placeholder="Enter Department Name"></Field>
                        </fieldset>
                        
                    </Form>
                )
            }
        </Formik>

        </div>
    )
}