import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { ErrorMessage, Form, Formik, useFormikContext } from "formik"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllCompaniesList } from "../../api/CompanyApiClient"
import { retrieveEmployeeById, saveEmployee, updateEmployee } from "../../api/EmployeeApiClient"
import { retrieveDepartmentsByCompanyId } from "../../api/DepartmentApiClient"
import { getAllDesignations } from "../../api/DesignationApiClient"
import { toast } from "react-toastify"
import { getAllAssets } from "../../api/AssetApiClient"

export default function EmployeeComponent() {

    const [emp_name,setEmpName] = useState("")
    const [emp_code,setEmpCode] = useState("")
   
    const [designation, setDesignation] = useState({
        desig_id : '',
        desig_name : ''
    })

   
    const [selectedDeptId,setSelectedDeptId] = useState('')
    const [selectedCompanyId,setSelectedCompanyId] = useState('')
    const [selectedDesigId,setSelectedDesigId] = useState('')

    const [emp_email,setEmpEmail] = useState("")
    const [emp_contact,setEmpContact] = useState("")
    
    const [company,setCompany] = useState({
        comp_id: '',
        comp_name : ''
    })

    const [department,setDepartment] = useState({
        dept_id : '',
        dept_name : '',
        company : {
            comp_id: '',
            comp_name : ''
        }
    })
    const [compList, setCompList] = useState([])
    const [deptList,setDeptList] = useState([])
    const [desigList,setDesigList] = useState([])
    const [assetList,setAssetList] = useState([])
    const [asset_ids,setAssetIds] = useState([])

    const [btnValue,setBtnValue] = useState("Add Employee")
    const [assetListDisabled,setAssetDisabled] = useState(true)

    const {id} = useParams()
    const navigate = useNavigate()
    const empId = Number(id)    

    useEffect(() => {
          getAllCompaniesList().then((response) => {
            setCompList(response.data)
        })
        getAllDesignations().then((response) => {
            setDesigList(response.data)
        })
        getAllAssets().then((response) => {
            setAssetDisabled(false)
            setAssetList(response.data)
        })
        if(empId != -1 ) {
            setBtnValue("Update Employee")
            retrieveEmployeeById(empId).then((response) => {
                console.log('Found Employee Data ',response.data)
                setEmpName(response.data.emp_name)
                setEmpCode(response.data.emp_code)
                setDepartment(response.data.department)
                setEmpEmail(response.data.emp_email)
                setDesignation(response.data.designation)
                setSelectedDesigId(response.data.designation.desig_id)
                setSelectedDeptId(response.data.department.dept_id)
                setSelectedCompanyId(response.data.department.company.comp_id)
                retrieveDepartmentsByCompanyId(response.data.department.company.comp_id).then((response) => {
                    setDeptList(response.data)
                })
                setEmpContact(response.data.emp_contact)
            }).catch((error) => {})
        }
      
    }, []) 
    const customStyles = {
            menu  : (provided) => ({
                ...provided,
                backgroundColor : "White",   // solid background
                zIndex : 9999                // keeps it above other elements
            }),
            option :(provided,state) => ({
                ...provided,
                backgroundColor : state.isFocused ? "#f0f0f0" : "White", // hover effect
                color : "black"
            })
    }
    function handleSubmit(values) {
            if(id == -1) {               
                 saveEmployee(values).then((response) => {
                    toast.success(response.data.statusMsg)
                    navigate(`/employee/`)
                }).catch((error) => {
                    toast.error(error.data.errorMessage)
                    navigate(`/viewemployees/`)
                })       

            } else {
                values.emp_id = empId
                 updateEmployee(values).then((response) => {
                    toast.success(response.data.statusMsg)
                    navigate(`/employee/`)
                }).catch((error) => {
                    toast.error(error.data.errorMessage)
                    navigate(`/viewemployees/`)
                })      
            }   
    }

   function getDeptLIstByCompanyId(compId){
        //call api to get dept list by company id
        
        retrieveDepartmentsByCompanyId(compId).then((response) => {
            setDeptList(response.data)
        })   
    }   
function AssetMultiSelect({ options }) {
  const { setFieldValue, values } = useFormikContext();
alert('multiselect')
  return (
    <Select
      styles={customStyles}
      name="asset_ids"
      isMulti
      fullWidth
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={(selectedOptions) => {
        const ids = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
        alert(ids)
        setFieldValue("asset_ids", ids);
      }}
      value={options.filter((opt) => values.asset_ids?.includes(opt.value))}
    />
  );
}

   const options = assetList.length > 0
                                    ? assetList.map((asset) => ({
                                        value: asset.asset_id,
                                        label: asset.asset_name
                                        }))
                                    : [];

    return(
        <div className="container">
            <Typography variant="h4" gutterBottom> {btnValue} </Typography>
            <Formik
                initialValues={{ emp_name, emp_code, department : selectedDeptId,company : selectedCompanyId, designation : selectedDesigId ,emp_email, emp_contact ,asset_ids : []}}
                enableReinitialize={true}
                validateOnBlur={false}   
                validateOnChange={false}
                onSubmit={handleSubmit}
            >
            {
                ({ setFieldValue, values, handleChange, handleBlur,  touched, errors }) => (
                    <Form>
                        <TextField
                            type="text"
                            id="emp_name"
                            label="Employee Name"
                            name="emp_name"
                            variant="standard"
                            value={values.emp_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.emp_name && Boolean(errors.emp_name)}
                            helperText={<ErrorMessage name="emp_name" />}
                            fullWidth
                        />
                        <TextField
                            id="emp_code"
                            type="text"
                            label="Employee Code"
                            variant="standard"
                            name="emp_code"
                            value={values.emp_code}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.emp_code && Boolean(errors.emp_code)}
                            helperText={<ErrorMessage name="emp_code" />}
                            fullWidth
                        />
                        <TextField
                            type="number"
                            id="emp_contact"
                            label="Employee Contact"
                            variant="standard"
                            name="emp_contact"
                            value={values.emp_contact}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.emp_contact && Boolean(errors.emp_contact)}
                            helperText={<ErrorMessage name="emp_contact" />}
                            fullWidth
                        />
                        <TextField
                            id="emp_email"
                            type="email"
                            label="Employee Email"
                            variant="standard"
                            name="emp_email"
                            value={values.emp_email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.emp_email && Boolean(errors.emp_email)}
                            helperText={<ErrorMessage name="emp_email" />}
                            fullWidth
                        />
                        <FormControl
                            variant="standard"
                            fullWidth
                            error={touched.designation && Boolean(errors.designation)}                         
                         >
                            <InputLabel id="designation-label">Select Designation</InputLabel>
                            <Select
                                labelId="designation-label"
                                id="designation"
                                name="designation"
                                variant="standard"
                                value={values.designation}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                            {
                                    desigList && desigList.map((desig) => 
                                    desig ? (
                                    <MenuItem key={desig.desig_id} value={desig.desig_id}>
                                        {desig.desig_name}
                                    </MenuItem>
                                    ) : null
                                ) 
                            }   
                          </Select>
                        </FormControl>  
                        <FormControl
                            variant="standard"
                            fullWidth
                            error={touched.company && Boolean(errors.company)}
                        >
                            <InputLabel id="company-label">Select Company</InputLabel>
                            <Select
                                labelId="company-label"
                                id="company"
                                name="company"
                                value={values.company}
                                onChange={(e)=>{
                                    getDeptLIstByCompanyId(e.target.value) 
                                }}
                                onBlur={handleBlur}
                            >
                                {
                                    compList && compList.map((company) => 
                                    company ? (
                                    <MenuItem key={company.comp_id} value={company.comp_id}>
                                        {company.comp_name}
                                    </MenuItem>
                                     ) : null
                                    )     
                                }
                                </Select>
                        </FormControl>
                         <FormControl
                            variant="standard"
                            fullWidth
                            error={touched.department && Boolean(errors.department)}
                         >
                            <InputLabel id="department-label">Select Department</InputLabel>
                            <Select
                                labelId="department-label"
                                id="department"
                                name="department"
                                value={values.department}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                {
                                    deptList && deptList.map((dept) => 
                                        dept ? (
                                        <MenuItem key={dept.dept_id} value={dept.dept_id}>
                                            {dept.dept_name}
                                        </MenuItem>
                                        ) : null
                                    ) 
                                }   
                            </Select>
                        </FormControl>

                        <Typography variant="subtitle1">Assets</Typography>
                        {
                            assetListDisabled ? (
                                <>
                                <TextField 
                                    fullWidth
                                    disabled={true}
                                    placeholder={"No Assets are Present" }
                                />
                                </>
                            ) : (
                            <>                                       
                                <AssetMultiSelect options={options} disabled={assetListDisabled}/>
                            </>
                            )
                        }                                               
                        <Button variant="contained" color="success" className="m-2" type="submit">{btnValue}</Button>
                    </Form>
                )
            }
        </Formik>
        </div>
    )
}   