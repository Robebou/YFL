import { useEffect, useState } from "react";
import "../styles/GenreFilm.css"

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import {Link} from 'react-router-dom';

const GenreFilm = ({genre_id}) => {
    const [movies,setMovies] = useState([]);

    const API_KEY = "9ea3fe10f4f94f70b6169e29f0f576d6"
    const API_IMAGES = 'https://image.tmdb.org/t/p/w500';
    const API_URL_MOVIEBYGENRE = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=${genre_id}`

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 10
          },
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 9
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3
          }
        };

    useEffect(()=>{
        async function fetchData() {
          const response = await fetch(API_URL_MOVIEBYGENRE);
          const data = await response.json();
          setMovies(data.results)
          console.log(data.results)
        }
        fetchData();
        
    },[])

    return (
        <div>
            <Carousel 
            swipeable = {false}
            draggable={false}
            showDots={false}
            infinite = {true}
            responsive = {responsive}
            itemClass="caroussel-item"

            >
                {movies.map((movie) => 
                    <Link to={`/movie/${movie.id}`} key={movie.id}>
                      <img src = {API_IMAGES + movie.poster_path} className="image-movie-genre"/>
                    </Link>
                )}       
            </Carousel>
            
           
        </div>
    )
}
export default GenreFilm;