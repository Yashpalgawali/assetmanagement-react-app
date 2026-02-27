import { useEffect, useState } from "react" 
import { getAllCompaniesList } from "../../api/CompanyApiClient"

export default function ViewCompanyComponent() {

    const [companyList, setCompanyList] = useState([])
    
    useEffect(()=> {
        getAllCompaniesList().then((response) => {
            setCompanyList(companyList)
        })
        
    },[])

    return(
        <>
        <h1>View Company Component</h1>
        <table className="table table-striped table-hover">
            <thead>
                <td>Sr</td>
                <td>Company Name</td>
                <td>Action</td>
            </thead>
            <tbody>
                {
                    companyList.map((company,index)=>(
                        <tr key={company.company_id}>
                            <td>{index+1}</td>
                            <td>{company.company_name}</td>
                            <td>{company.company_name}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </>
    )
}