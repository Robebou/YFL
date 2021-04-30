import React, { Component, useState } from 'react'
import "../styles/Commentaire.css"
function Commentaire() {
    const url = "http://localhost:8080/save_com";
    const [data, setData] = useState({
        userId: "",
        commentaire: ""
    })
    async function submit(e) {
        e.preventDefault();
        console.log(data)
        const requestOptions = {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            //mode: "no-cors",
            headers: {
            'Content-Type': 'application/json',
            //'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, requestOptions);
        const data_res = await response.json(); 
        console.log(data_res)
    }
    function handle(e) {
        const newData = {...data};
        newData[e.target.name] = e.target.value;
        setData(newData);
        console.log(newData);
    }

    return (
        <section id="Commentaire">
        <h1>Comments</h1>
            <form method="post" action="/commentaire" onSubmit={(e) => submit(e)}>
                <div>
                    <label for="Pseudo">Id:</label>
                    <input onChange={(e) => handle(e)} type="text" id="Pseudo" name="userId" value={data.userId}/>
                </div>
                <div>
                    <label for="Comments">Comment</label>
                    <textarea onChange={(e) => handle(e)} id="Comment" name="commentaire" cols="30" rows="10" value={data.commentaire}></textarea>
                </div>
                <button type="submit">Enter</button>
            </form>
        </section>
    )
}

export default Commentaire;