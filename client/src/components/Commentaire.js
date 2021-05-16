import React, { useLayoutEffect, useState, useEffect } from 'react'
import "../styles/Commentaire.css"
import axios from "axios";
axios.defaults.withCredentials = true;

function Commentaire({movie_id}) {
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
                setData({username:response.data.user[0].username,id_movie: movie_id,id_user: response.data.user[0].id})
            } else {
                setLogged(false)
            }
        })

    }, [])

    useEffect(() => {
        axios.get("http://localhost:8080/getCommentaire",{
            params: {
                movie_id: movie_id
            }
        }).then((response)=> {
            console.log(response.data)
            setComs(response.data)
        })
    },[])

    

    async function submit(e) {
        e.preventDefault();
        if(data.commentaire != "") {
            axios.post(url, data).then((response) => {
                setData({commentaire: ""})  
            })
        }
    }

    async function delete_com(com) {
        axios.post("http://localhost:8080/deleteCommentaire", com).then((response) => {
            console.log(response)
        })
    }

    function handle(e) {
        const newData = {...data};
        newData[e.target.name] = e.target.value;
        setData(newData);
        console.log(data)
    }
    function showButton(username,com) {
        if (username == data.username) {
            return(<button onClick={(() => {delete_com(com)})}>Delete</button>)
        }
    }
    if(logged) {
        return (
        <div className="wrapper">
		    <form action="" method="POST" className="form">
			<div className="row">
			</div>
			<div className="input-group textarea">
				<label for="comment">{data.username}</label>
				<textarea id="comment" name="commentaire" placeholder="Enter your Comment" value = {data.commentaire} onChange={(e) => handle(e)}   required></textarea>
			</div>
			<div className="input-group">
				<button classname="btn" onClick={(e)=>submit(e)}>Post Comment</button>
			</div>
		</form>
            <div className="prev-comments">
                {coms.map((com) => 
                    <div class="single-item">
                        <h4>{com.username}</h4>
                        <p>{com.commentaire}</p>
                        {showButton(com.username,com)}
                    </div>
                )}    
                    
            </div>
	    </div>
        )
    } else {
        return(
            <div>
                Unlogged
            </div>
        )
    }
    
}

export default Commentaire;