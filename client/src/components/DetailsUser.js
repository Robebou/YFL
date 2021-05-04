import React,{useState, useEffect} from 'react'
import axios from "axios"
import { Redirect } from 'react-router';
axios.defaults.withCredentials = true;

const url = "http://localhost:8080/login";

function DetailsUser() {

    const [userInfo, setUserInfo] = useState({
        username: ""
    })
    const [logged, setLogged] = useState(true)

    useEffect(() => {
        axios.get(url).then((response) => {
            setUserInfo({username: response.data.user[0].username})        
            console.log(response)
        })
    }, [])

    function Logout() {
        axios.get("http://localhost:8080/logout").then((response) => {
            console.log("Log out")
            setLogged(false)
        })
    }

    if(logged) {
        return (
            <div>
                Welcome back {userInfo.username}
                <button onClick={() => Logout()}>Log out</button>
            </div>
        )
    } else {
        return(
            <Redirect to = "/"/>
        )
        
    }
    
}

export default DetailsUser
