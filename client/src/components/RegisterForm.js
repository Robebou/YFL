import React, { useState } from 'react'
import "../styles/login.css"


const url = "http://localhost:8080/register";

function RegisterForm() {

    
    const [details, setDetails] = useState({
        username: "", 
        password:"",
        confirm_password:"",
        age:"",
        genre:""
    });

    const [error,setError] = useState("")

    async function submitHandler(e) {
        console.log(details)
        e.preventDefault();
        if(details.password != details.confirm_password) {
            setError("Password are not equals");
        } else {
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
            setError(data_res.message)
        }
        
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
                    <div className="form-error">{error}</div>
                    <div className = "input-group">
                        <label htmlFor="Username">Username :</label>
                        <input type="text" name="username" id="username" required onChange={(e) => handle(e)} value={details.username}/>
                    </div>
                    <div className = "input-group">
                        <label htmlFor="password">Password :</label>
                        <input type="password" name="password" id="password" required onChange={(e) => handle(e)} value={details.password}/>
                    </div>
                    <div className = "input-group">
                        <label htmlFor="password">Confirm Password :</label>
                        <input className="login-input" type="password" name="confirm_password" id="confirm_password" onChange={(e) => handle(e)} value={details.confirm_password}/>
                    </div>
                    <div className = "input-group">
                        <label htmlFor="password">Age:</label>
                        <input className="login-input" name="age" id="age" onChange={(e) => handle(e)} value={details.age}/>
                    </div>
                    <div className = "input-group">
                        <label htmlFor="password">Genre</label>
                        <select name = "genre" id ="genre" onChange={(e) => handle(e)}>
                            <option value=""></option>
                            <option value="M">M.</option>
                            <option value="Mme">Mme</option>
                            <option value="Mlle">Mlle</option>
                        </select>
                    </div>
                    <input type="submit" value="Register" className="login-btn"/>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm
