
import Popup from 'reactjs-popup';
import React, { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import 'reactjs-popup/dist/index.css';
import "../styles/PopUpFilm.css"
import "../styles/button.css"
axios.defaults.withCredentials = true;

function Commentaire({img,title}) {
    const url = "http://localhost:8080/save_com";
    const [data, setData] = useState({
        commentaire: "",
        username: "",
        id_movie: "",
        id_user: ""
    })
    const [logged,setLogged] = useState(undefined)
    const [coms, setComs] = useState([]);

    let button;


    useLayoutEffect(() => {
        axios.get("http://localhost:8080/login").then((response) => {
            console.log(response)
            if(response.data.loggedIn == true) {
                setLogged(true)
                setData({username:response.data.user[0].username,id_user: response.data.user[0].id})
            } else {
                setLogged(false)
            }
        })

    }, [])

    

    async function submit(e) {
        e.preventDefault();
        if(data.commentaire != "") {
            axios.post(url, data).then((response) => {
                setData({commentaire: ""})  
            })
        }
    }

    function handle(e) {
        const newData = {...data};
        newData[e.target.name] = e.target.value;
        setData(newData);
        console.log(data)
    }
    if(logged) {
        return (
            <div className="popup-wrapper">
                <Popup
                    trigger={<button className="button-basic">Add Film</button>
                            }
                    modal
                    nested
                >
                    {close => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                        &times;
                        </button>
                        <div className="header">{title}</div>
                        <div className="content">
                        <img src = {img}/>
                        </div>
                    </div>
                    )}
                </Popup>
            </div>

        )
    } else {
        return (
            <Popup trigger={<button className="button-basic">Add Film</button>} modal>
                {close => (
                    <div className="content">
                    You need to login !
                    </div>
                )}
            </Popup>
        )
    }
    
}

export default Commentaire;