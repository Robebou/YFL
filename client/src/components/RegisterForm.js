import React, { useState } from 'react'
import "../styles/login.css"


const url = "http://localhost:8080/register";

function RegisterForm() {

    
    const [details, setDetails] = useState({
        username: "", 
        password:"",
        confirm_password:""
    });

    async function submitHandler(e) {
        e.preventDefault();
        
        const requestOptions = {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            //mode: "no-cors",
            headers: {
            'Content-Type': 'application/json',
            //'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(details)
        }
        const response = await fetch(url, requestOptions);
        const data_res = await response.json(); 
        console.log(data_res)

    }

    function handle(e) {
        const newData = {...details};
        newData[e.target.name] = e.target.value;
        setDetails(newData);
        console.log(newData);
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className ="form-inner">
                    <h2 className ="h2-login">Register</h2>
                    <div className = "input-group">
                        <label htmlFor="Username">Username :</label>
                        <input type="text" name="username" id="username" onChange={(e) => handle(e)} value={details.username}/>
                    </div>
                    <div className = "input-group">
                        <label htmlFor="password">Password :</label>
                        <input type="password" name="password" id="password" onChange={(e) => handle(e)} value={details.password}/>
                    </div>
                    <div className = "input-group">
                        <label htmlFor="password">Confirm Password :</label>
                        <input className="login-input" type="password" name="confirm_password" id="confirm_password" onChange={(e) => handle(e)} value={details.password}/>
                    </div>
                    <input type="submit" value="Register" className="login-btn"/>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm
