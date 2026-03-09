import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCompaniesList } from "../../api/CompanyApiClient";
import { toast } from "react-toastify";
import { retrieveDepartmentById, saveDepartment, updateDepartment } from "../../api/DepartmentApiClient";

export default function DepartmentComponent() {

    const [dept_name, setDepartmentName] = useState("");
    const [dept_id, setDepartmentId] = useState(""); 
    const [compList, setCompList] = useState([]);
    const [company, setCompany] = useState({
        comp_id: 0,
        comp_name: ""
    });

    const {id} = useParams();
    const deptId = Number(id);

    const navigate = useNavigate();

    const [btnValue, setBtnValue] = useState("Add Department");

    useEffect(() => {
        if(id != -1) {
            setBtnValue("Update Department");
            retrieveDepartmentById(id).then((response) => { 
                setDepartmentName(response.data.dept_name);
                setDepartmentId(response.data.dept_id);
                setCompany(response.data.company);
            } )
        } 
        getAllCompaniesList().then((response) => {
            setCompList(response.data);
        })       
    }, [])           

    function handleSubmit(values) {
         
        setCompany({
            comp_id: values.company
        })        
       
        if(deptId == -1) {
                saveDepartment(values).then((response) => {
                    toast.success(response.data.statusMsg)
                    navigate('/viewdepartments')
                }).catch((error) => {
                    toast.error(error.data.errorMessage)
                    navigate('/viewdepartments')
                })
        } else {
             
            let deptData = { dept_id: deptId, dept_name: values.dept_name, company: values.company };
            updateDepartment(deptData).then((response) => {
                    toast.success(response.data.statusMsg)
                    navigate('/viewdepartments')
                }).catch((error) => {
                    
                     toast.error(error.data.errorMessage)
                    navigate('/viewdepartments')
                }) 
        }
    }

    return (
        <div className="container">
            <Typography variant="h4" gutterBottom>
                    {btnValue}
            </Typography>
            <Formik
                initialValues={{ dept_name, dept_id , company }}
                enableReinitialize={true}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={handleSubmit}
            >
                {
                    (props) => (
                        <Form>
                    <FormControl
                                variant="standard"
                                fullWidth
                                error={props.touched.company && Boolean(props.errors.company)}
                                >
                    <InputLabel id="company-label">Select Company</InputLabel>
                    <Select
                        labelId="company-label"
                        id="company"
                        name="company"
                        value={props.values.company}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                    >
                    {compList &&
                            compList.map((company) =>
                                company ? (
                                <MenuItem key={company.comp_id} value={company.comp_id}>
                                    {company.comp_name}
                                </MenuItem>
                                ) : null
                            )}
                    </Select>
                  </FormControl>
                <TextField  id="dept_name"
                            name="dept_name"
                            label="Department Name"
                            variant="standard"
                            placeholder="Enter Department Name"
                            value={props.values.dept_name}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            error={props.touched.dept_name && Boolean(props.errors.dept_name)}
                            helperText={<ErrorMessage name="dept_name" />}
                            fullWidth />
                  
                    <Button variant="contained" type="submit" color="success"> {btnValue} </Button>
                </Form>
                    )
                }

            </Formik>
        </div>
    );
}