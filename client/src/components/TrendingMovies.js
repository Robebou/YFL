import React, { useEffect, useState } from 'react';

import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import "../styles/trendingmovies.css";
import Movie from "../components/Movie.js"

const API_URL_POPULAR = 'https://api.themoviedb.org/3/movie/popular?api_key=9ea3fe10f4f94f70b6169e29f0f576d6&language=en-US&page=1';
const API_IMAGES = 'https://image.tmdb.org/t/p/w500';
const MaxTrendingFilms = 4;

const properties = {
    duration: 2000,
    transitionDuration: 500,
    infinte: true,
    indicators: true,
    arrows: true
}


function TrendingMovies() {
    const [movies, setMovies] = useState ([]);
 
    useEffect(async () => {
        const response = await fetch(API_URL_POPULAR);
        const data = await response.json();
        setMovies((data.results).splice(0,MaxTrendingFilms)) // on ne prend que les 4 premiers élements data --> 4 premiers films de la liste Trending
    }, []);
    return (
        <div className="slide-container">
            <Fade {...properties}>
                {movies.map((movie) => 
                    <div className="each-fade">
                        <div className="image-container">
                            <img src={API_IMAGES + movie.poster_path} />
                        </div>
                    </div>
                )}    
            </Fade>
        </div>
    )
    
}

export default TrendingMovies;