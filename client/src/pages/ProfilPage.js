
import React, {useEffect, useState} from "react";
import LoadingScreen from "../components/LoadingScreen"
import DetailsUser from "../components/DetailsUser"
import Login from "../pages/Login"
import axios from "axios";
axios.defaults.withCredentials = true;


function ProfilPage() {

    const [logged, setLogged] = useState(false);
    const [isBusy, setBusy] = useState(true);
    const url = "http://localhost:8080/login";

    useEffect(() => {
        axios.get(url,{withCredentials: true, credentials: 'include'}).then((response) => {
            if (response.data.loggedIn == true) {
                setLogged(true)
              }        
              setBusy(false)
        })
    }, [])
    
    return(
        <div>
            {isBusy && <LoadingScreen/>}
            {!isBusy && !logged && <Login/>}
            {!isBusy && logged && <DetailsUser/>}
        </div>
    )
    
}

export default ProfilPage
