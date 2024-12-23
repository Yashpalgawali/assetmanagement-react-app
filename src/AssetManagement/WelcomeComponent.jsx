import axios from "axios"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"

export default function WelcomeComponent(){
    const {username} = useParams()
    const [message , setMessage] = useState()

    function callHelloWorldRestApi() {
        axios.get('http://localhost:8080/company/')
            .then((response)=>    successfulResponse(response))
            .catch((error)=> errorResponse(error) )
            .finally(()=> console.log('finally'))

        console.log('called')
    }

    function successfulResponse(response) {
       setMessage(response.data[0])
        console.log(response)
    }
    function errorResponse(error) {
        console.log(error)
    }

    return(
        <div className="Welcome">
              <h1><strong>Asset Management</strong></h1>
              <h2>Welcome {username} </h2>
              <h4>Get Company List__ <Link to="/companies">Go Here</Link> </h4>
              <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi} >Call Hello world</button>
              </div>
              <div className="text-info">
                        {message}
              </div>
        </div>
    )
}
