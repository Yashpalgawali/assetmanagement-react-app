import { useEffect, useState } from "react"
import { getAlldepartments } from "./api/DepartmentApitService"
import { useNavigate } from "react-router-dom";

export default function ViewDepartmentComponent(){

    const [deptlist ,setDeptList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAlldepartments()
          .then((response) => {
            console.log(response.data)
            setDeptList(response.data);   
          })
          .catch((error) => {
            console.error("There was an error fetching the departments!", error);
             
          });
      }, []);

function updateDepartment(id) {
    navigate(`/department/${id}`)
}

    return(
        <div className="container">

            <h2>View departments</h2>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Company</th>
                        <th>UPDATE</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                         deptlist.map(([company_id, dept_id, dept_name,comp_id,company_name], index) => (
                            <tr key={dept_id }>
                                    <td>{dept_id} </td>
                                    <td>{dept_name} </td>
                                    <td>{company_name} </td>
                                    <td><button className="btn btn-primary m-2 " onClick={() => updateDepartment(dept_id)} >UPDATE</button> </td>
                                </tr>
                        ))
                    }
                    {/* {
                        deptlist.map(
                            (department) => (
                                <tr key={department.dept_id}>
                                    <td>{department.dept_id}</td>
                                </tr>
                            )
                        )
                    }  */}
        
                </tbody>
            </table>
        </div>
    )
}