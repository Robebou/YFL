import React from 'react'
const API_IMAGES = 'https://image.tmdb.org/t/p/w500';


const Movie = ({title, poster_path, overview, vote_average}) => {
    return (
        <div className="movie">
            <img src = {API_IMAGES + poster_path} className="image-movie"/>
            <div className="movie-info">
                <h2 className ="h2-movie">{title}</h2>
            </div>
        </div>
    )
}

export default Movie;