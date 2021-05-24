import React from 'react'
import axios from 'axios'

function LoadingScreen() {
    function Logout() {
        axios.get("http://localhost:8080/logout").then((response) => {
            console.log("Log out")
        })
    }
    return (
        <div>
            LoadingScreen
            <button onClick={() => Logout()}>Log out</button>
        </div>
    )
}

export default LoadingScreen
