
import React, {useEffect, useState} from "react";
import LoadingScreen from "../components/LoadingScreen"
import DetailsUser from "../components/DetailsUser"
import Login from "../pages/Login"
import axios from "axios";
axios.defaults.withCredentials = true;


function ProfilPage() {

    const [logged, setLogged] = useState(false);
    const url = "http://localhost:8080/login";

    useEffect(() => {
        axios.get(url,{withCredentials: true, credentials: 'include'}).then((response) => {
            if (response.data.loggedIn == true) {
                setLogged(true)
              }        
        })
    }, [])
    
    return(
        <div>
            {!logged && <Login/>}
            {logged && <DetailsUser/>}
        </div>
    )
    
}

export default ProfilPage
