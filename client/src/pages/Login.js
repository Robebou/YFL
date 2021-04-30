import { useState } from "react";
import LoginForm from "../components/LoginForm";

function Login() {

    const [user, setUser] = useState({name:"", email:""});
    const [error, setError] = useState("");
    const [logged, setLog] = useState(false);

    const Login = details => {
        console.log(details)
    }

    return(
        <div>
            {logged ? (
                <h2>Welcome</h2>
            ) : (
              <LoginForm Login={Login} error={error}/>
            )}
        </div>
    )
}
export default Login;