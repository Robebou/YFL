import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "../styles/login.css"

function Login() {

    const [user, setUser] = useState({name:"", email:""});
    const [error, setError] = useState("");
    const [logged, setLog] = useState(false);
    const [loginPage, setLoginPage] = useState();

    return(
        <div className ="register-login-container">
            <div className = "button-container">
                <div className="button-reg-log" onClick={() => setLoginPage(true)}>
                    Login
                </div>
                <div className="button-reg-log" onClick={() => setLoginPage(false)}>
                    Register
                </div>
                
            </div>
            <div className = "box-container">
                {loginPage && <LoginForm/>}
                {!loginPage && <RegisterForm/>}
            </div>
        </div>
    )
}
export default Login;