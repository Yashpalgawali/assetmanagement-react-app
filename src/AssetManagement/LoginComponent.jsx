import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./security/AuthContext"

export default function LoginComponent() {
    const [username, setUsername] = useState('in28minutes')
    const [password, setPassword] = useState('dummy')

    
    const [errorMessage , setErrorMesage] = useState(false)

    const authContext = useAuth()

    const navigate = useNavigate()

    function handleUsernameChange(event) {
       
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    async function handleSubmit() {
      
        //if(username==='in28minutes' && password==='dummy'){
        if(await authContext.login(username,password)) {            
            navigate(`/welcome/${username}`)
        }
        else {
            setErrorMesage(true)
        }
    }

    return(
        <div className="container">
            { errorMessage && <div className='errorMessage'>Authentication Failed. PLease Check Your Credentials!!</div> }

            <div className="LoginForm">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" className='form-control' value={username} onChange={handleUsernameChange} placeholder="Enter Username"/>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className='form-control' value={password} onChange={handlePasswordChange} placeholder="Enter Password"/>
                </div>
                <div>
                    <button type="button " className='btn btn-success m-4' onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}