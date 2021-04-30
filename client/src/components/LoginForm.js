import React, { useState } from 'react'
import "../styles/login.css"


const url = "http://localhost:8080/login";


function LoginForm({Login, error}) {
    const [details, setDetails] = useState({
        username: "", 
        password:""
    });

    async function submitHandler(e) {
        e.preventDefault();
        Login(details);
        
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

        <form onSubmit={submitHandler} className ="form-inner">
                <h2 className ="h2-login">Login</h2>
                <div className = "input-group">
                    <label htmlFor="Username">Username :</label>
                    <input className="login-input" type="text" name="username" id="username" onChange={(e) => handle(e)} value={details.username}/>
                </div>
                <div className = "input-group">
                    <label htmlFor="password">Password :</label>
                    <input className="login-input" type="password" name="password" id="password" onChange={(e) => handle(e)} value={details.password}/>
                </div>
                <input type="submit" value="Login" className="login-btn"/>
        </form>

    )
}

export default LoginForm
