import React, { useEffect, useState } from 'react';
import "../styles/historymovies.css";
import Movie from "../components/Movie.js"

const API_URL_POPULAR = 'https://api.themoviedb.org/3/movie/popular?api_key=9ea3fe10f4f94f70b6169e29f0f576d6&language=en-US&page=1';


function HistoryMovies() {
    const [movies, setMovies] = useState ([]);

    useEffect(async () => {
        const response = await fetch(API_URL_POPULAR);
        const data = await response.json();
        setMovies(data.results)
        //setMovies((data.results).splice(0,5))
    }, []);
    return <div className="movie-container">{movies.map((movie) => <Movie key = {movie.id} {...movie} />)}</div>
    
}

export default HistoryMovies;