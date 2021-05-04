import React, { useState, useEffect } from 'react'
import { Redirect, withRouter } from "react-router-dom";
import "../styles/login.css"
import axios from "axios"


const url = "http://localhost:8080/login";
axios.defaults.withCredentials = true;


function LoginForm({Login, error}) {
    const [details, setDetails] = useState({
        username: "", 
        password:""
    });
    const [logged, setLogged] = useState(false);

    async function submitHandler(e) {
        e.preventDefault();
        axios.post(url, details).then((response) => {
            console.log(response)
            if(response.data.connected == true) {
                setLogged(true)
                console.log(logged)
            }
        })
    }

    function handle(e) {
        const newData = {...details};
        newData[e.target.name] = e.target.value;
        setDetails(newData);
    }


    if(logged) {
        return (
            <Redirect to="/"/>
        )
    } else {
        return (
            <div>
                <h2>{logged}</h2>
            <form className ="form-inner">
                    <h2 className ="h2-login">Login</h2>
                    <div className = "input-group">
                        <label htmlFor="Username">Username :</label>
                        <input className="login-input" type="text" name="username" id="username" onChange={(e) => handle(e)} value={details.username}/>
                    </div>
                    <div className = "input-group">
                        <label htmlFor="password">Password :</label>
                        <input className="login-input" type="password" name="password" id="password" onChange={(e) => handle(e)} value={details.password}/>
                    </div>
                    <input type="submit" value="Login" className="login-btn" onClick={(e) => {submitHandler(e)}}/>
            </form>
            </div>
    
        )
    }
    
}

export default withRouter(LoginForm)
