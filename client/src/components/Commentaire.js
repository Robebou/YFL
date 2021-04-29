import React from 'react'
import "../styles/Commentaire.css"
const Commentaire = () => {
    return (
        <section id="Commentaire">
        <h1>Comments</h1>
            <form method="post">
                <div>
                    <Label for="Pseudo">Id:</Label>
                    <input type="text" id="Pseudo" Pseudo="Pseudo"/>
                </div>
                <div>
                    <label for="Comments">Comment</label>
                    <textarea id="Comment" name="Comment" cols="30" rows="10"></textarea>
                </div>
                <button type="submit">Enter</button>
            </form>
        </section>
    )
}

export default Commentaire;