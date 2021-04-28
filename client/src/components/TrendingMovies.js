import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import "../styles/trendingmovies.css";

const API_URL_POPULAR = 'https://api.themoviedb.org/3/movie/popular?api_key=9ea3fe10f4f94f70b6169e29f0f576d6&language=en-US';
const API_URL_LATEST = 'https://api.themoviedb.org/3/movie/latest?api_key=9ea3fe10f4f94f70b6169e29f0f576d6&language=en-US'

const API_IMAGES = 'https://image.tmdb.org/t/p/w500';

const MaxTrendingFilms = 10;

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
        setMovies(data.results) // on ne prend que les 4 premiers élements data --> 4 premiers films de la liste Trending
    }, []);
    return (
        <div className="slide-container">
            <h1 className="h1-trending"S>Trending Films</h1>
            <Fade {...properties}>
                {movies.map((movie) => 
                    <div className="each-fade">
                        <div className="image-container">
                        <Link to={`/movie/${movie.id}`} key={movie.id}>
                            <img src={API_IMAGES + movie.poster_path} />
                        </Link>
                            
                        </div>
                    </div>
                )}    
            </Fade>
        </div>
    )
    
}

export default TrendingMovies;