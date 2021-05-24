
import Popup from 'reactjs-popup';
import React, { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import 'reactjs-popup/dist/index.css';
import "../styles/PopUpFilm.scss"
import "../styles/button.css"
import Select from 'react-select'
axios.defaults.withCredentials = true;

function PopupFilm({img,title,movie_id}) {
    const url = "http://localhost:8080/saveUserFilm";
    const [data, setData] = useState({
        isSeen: "",
        score: "",
        id_movie: "",
        id_user: "",
        like: ""
    })
    const [logged,setLogged] = useState(undefined);
    const [error,setError] = useState("");

    let button;

    const filmoptions = [
        { value: 1, label: 'Already Seen' },
        { value: 2, label: 'Planned to view' },
        { value: 3, label: 'Paused' },
        { value: 4, label: 'Dropped' }
    ]
    const scoreoptions = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
        { value: 6, label: '6' },
        { value: 7, label: '7' },
        { value: 8, label: '8' },
        { value: 9, label: '9' },
        { value: 10, label: '10' }
    ]


    useLayoutEffect(() => {
        setError("");
        axios.get("http://localhost:8080/getUserFilm",{
            params: {
                movie_id: movie_id,
                user_id: data.id_user

            }
        }).then((response) => {
            console.log("oui")
            console.log(response)
            if(response.data.loggedIn == true) {
                setLogged(true);
                if(response.data.result.length > 0) {
                    var response_data = response.data.result[0];
                    setData({isSeen: response_data.isSeen,score:response_data.score,like:response_data.isLiked,id_movie:response_data.movie_id,id_user:response_data.user_id})
                } else {
                    console.log(response)
                    setData({id_movie:movie_id,id_user:response.data.user_id})
                }
               
            } else {
                setData({like: 0});
                setLogged(false);
            }
            
        })

    }, [])
    function handleScore({value}) {
        const newData = {...data};
        newData["score"] =value;
        setData(newData);
        
    }
    function handleSeen(value) {
        const newData = {...data};
        newData["isSeen"] =value.label;
        setData(newData);
    }
    function handleCheck(e) {
        const newData = {...data};
        if(e.target.checked == false) {
            newData["like"] = 0;
        } else {
            newData["like"] = 1;
        }
       
        setData(newData);
        console.log(newData)
    }
    async function submit(e) {
        e.preventDefault();
        if(data.score == "" || data.isSeen == "") {
            setError("Error");
            console.log("error")
        } else {
            axios.post(url, data).then((response) => {
                console.log(response)
                setError(response.data.message)
            })
        }
        
        
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
                        <div className="popup-header">{title}</div>
                            <div className="content-popup">
                                <img src = {img} className="image-popup"/>
                                <div className="popup-right">
                                    <div className="select-wrapper">
                                        <div className="popup-select">
                                            <h2 className="h2-popup">Current state : </h2>
                                            <Select options={filmoptions} defaultValue={{label:data.isSeen,value:data.isSeen}} onChange={handleSeen}/>
                                        </div>
                                        <div className="popup-select">
                                            <h2 className="h2-popup">Note : </h2>
                                            <Select options={scoreoptions} defaultValue={{label:data.score,value:data.score}} onChange={handleScore}/>
                                        </div>
                                    </div>
                                    <div className="coup-de-coeur">
                                        <input id="toggle-heart" type="checkbox" defaultChecked={data.like} onChange={(e) => {handleCheck(e)}}/>
                                        <label for="toggle-heart">❤</label>
                                    </div>
                                </div>
                            </div>
                            <div className="popup-footer">
                                <div className="popup-error">{error}</div>
                                <button className="button-basic" onClick={(e) => {submit(e)}}>Validate</button>
                            </div>
                    </div>
                    )}
                </Popup>
            </div>

        )
    } else {
        return (
            <div className="popup-wrapper">
            <Popup trigger={<button className="button-basic">Add Film</button>} modal>
                {close => (
                    <div className="content">
                    You need to login !
                    </div>
                )}
            </Popup>
            </div>
        )
    }
    
}

export default PopupFilm;