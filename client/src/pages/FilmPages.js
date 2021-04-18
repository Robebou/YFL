import { useEffect } from "react";
import DetailFilm from "../components/DetailFilm.js";
import Navigation from "../components/Navigation.js";
var movie_id = 791373;

const FilmPages = ({match}) => {
    return (
        <div className="home">
            <div className="div-home-body"> 
            <DetailFilm movie_id = {match.params.id}/>
            </div>         
        </div>
    )
}
export default FilmPages;