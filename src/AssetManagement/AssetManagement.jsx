import { useState } from 'react';
import './AssetManagement.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

export default function AssetManagement() {

    return(
        <div className="AssetManagement">
            
            <BrowserRouter>
            <Routes>
                <Route path='/' element={ <LoginComponent /> }></Route>
            <Route path='/login' element={ <LoginComponent /> }></Route> 
            <Route path='/welcome' element={ <WelcomeComponent /> }></Route> 
                
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export function LoginComponent() {
    const [username, setUsername] = useState('in28minutes')
    const [password, setPassword] = useState('dummy')

    const [successMessage , setSuccessMesage] = useState(false)
    const [errorMessage , setErrorMesage] = useState(false)

    const navigate = useNavigate()

    function handleUsernameChange(event) {
       
        setUsername(event.target.value)
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    function handleSubmit(){
        console.log(username)
        console.log(password)
        if(username==='in28minutes' && password==='dummy'){
            setSuccessMesage(true)
            setErrorMesage(false)
            navigate('welcome')
        }
        else{
            setErrorMesage(true)
            setSuccessMesage(false)
        }
    }

    return(
        <div className="Login">
            { successMessage && <div className='successMessage'>Authenticated Successfully </div> }
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
                    <button type="button " className='btn btn-success' onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}

export function WelcomeComponent(){
    return(
        <div className="Welcome">
            Welcome Component
        </div>
    )
}


