import { useEffect, useState } from "react";
import "../styles/GenreFilm.css"
import FilmFromGenre from "./FilmFromGenre"
import 'react-slideshow-image/dist/styles.css'

const GenreFilm = () => {
    const [genres,setGenres] = useState([]);
    const API_URL_GENRE = `https://api.themoviedb.org/3/genre/movie/list?api_key=9ea3fe10f4f94f70b6169e29f0f576d6&language=en-US`;
    useEffect(async ()=>{

        const response = await fetch(API_URL_GENRE);
        const data = await response.json();
        setGenres(data.genres);
        data.genres.map(element => {
            delete element[""]
        })
        console.log(data.genres)
    },[])

    return (
        <div>
            {genres.map((genre) => 
                <div className = "genre-container">
                    <h2 className ="h2-genre">{genre.name}</h2>
                    <FilmFromGenre genre_id = {genre.id}/>
                </div>
            )}  
        </div>
    )
}
export default GenreFilm;