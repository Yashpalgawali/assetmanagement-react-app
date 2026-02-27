import { useEffect, useState } from "react"

export default function ViewCompanyComponent() {

    const [companyList, setCompanyList] = useState([])
    
    useEffect(()=> {
        const compList = [
            { "company_id" : 1,"company_name": "IBM"  },
            { "company_id" : 2,"company_name": "ISRO"  },
            { "company_id" : 3,"company_name": "NASA"  }
        ]
        
        setCompanyList(compList)
    },[])

    return(
        <>
        <h1>View Company Component</h1>
        <table className="table table-striped table-hover">
            <thead>
                <th>Sr</th>
                <th>Company Name</th>
                <th>Action</th>
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