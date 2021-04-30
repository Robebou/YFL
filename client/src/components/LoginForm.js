import React, { useState } from 'react'
import "../styles/login.css"


const url = "http://localhost:8080/register";


function LoginForm({Login, error}) {
    const [details, setDetails] = useState({
        username: "", 
        email:"", 
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
        <form onSubmit={submitHandler}>
            <div className ="form-inner">
                <h2>Login</h2>
                <div className = "form-group">
                    <label htmlFor="Username">Username :</label>
                    <input type="text" name="username" id="username" onChange={(e) => handle(e)} value={details.username}/>
                </div>
                <div className = "form-group">
                    <label htmlFor="email">Email :</label>
                    <input type="email" name="email" id="email" onChange={(e) => handle(e)} value={details.email}/>
                </div>
                <div className = "form-group">
                    <label htmlFor="password">Password :</label>
                    <input type="password" name="password" id="password" onChange={(e) => handle(e)} value={details.password}/>
                </div>
                <input type="submit" value="login"/>
            </div>
        </form>

    )
}

export default LoginForm
