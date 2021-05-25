import React,{useState, useEffect} from 'react'
import axios from "axios"
import { Redirect } from 'react-router';
import "../styles/DetailUser.css";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import {Link} from 'react-router-dom';


axios.defaults.withCredentials = true;

const url = "http://localhost:8080/login";

function DetailsUser() {

    const [username,setUsername] = useState("")
    const [logged, setLogged] = useState(true)
    const [filmInfo,setFilmInfo] = useState([]);

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

    useEffect(() => {
        axios.get("http://localhost:8080/getAllUserFilm",{
        }).then((response) => {
            console.log(response)
            setUsername(response.data.username)
            setFilmInfo(response.data.result)

            filmInfo.sort(function(a,b) {
                return b.score - a.score;
            })
            console.log(response.data)
            
        })
    }, [])
    const film_liked = 
    filmInfo.map((movie) => {
        if(movie.isLiked == 1) {
            return(
                <Link to={`/movie/${movie.movie_id}`} key={movie.movie_id}>
                    <img src = {movie.img} className="image-movie-genre"/>
                </Link>
            )
            
        }
    })

    const film_seen =
    filmInfo.map((movie) => {
        if(movie.isSeen== "Already Seen") {
            return(
                <Link to={`/movie/${movie.movie_id}`} key={movie.movie_id}>
                    <img src = {movie.img} className="image-movie-genre"/>
                </Link>
            )
            
        }
    })

    const film_paused =
    filmInfo.map((movie) => {
        if(movie.isSeen== "Paused") {
            return(
                <Link to={`/movie/${movie.movie_id}`} key={movie.movie_id}>
                    <img src = {movie.img} className="image-movie-genre"/>
                </Link>
            )
            
        }
    })
    const film_planned = 
    filmInfo.map((movie) => {
        if(movie.isSeen== "Planned to view") {
            return(
                <Link to={`/movie/${movie.movie_id}`} key={movie.movie_id}>
                    <img src = {movie.img} className="image-movie-genre"/>
                </Link>
            )
            
        }
    })
    const film_dropped = 
    filmInfo.map((movie) => {
        if(movie.isSeen== "Dropped") {
            return(
                <Link to={`/movie/${movie.movie_id}`} key={movie.movie_id}>
                    <img src = {movie.img} className="image-movie-genre"/>
                </Link>
            )
            
        }
    })

    const film_notes = 
    filmInfo.map((movie) => {
            return(
                <div className = "user-note-container">
                    <Link to={`/movie/${movie.movie_id}`} key={movie.movie_id}>
                        <img src = {movie.img} className="image-movie-genre"/>
                        
                    </Link>
                    <h3 className="user-h3-score">{movie.score}</h3>
                </div>
            )
            
    })

    function Logout() {
        axios.get("http://localhost:8080/logout").then((response) => {
            console.log("Log out")
            setLogged(false)
        })
    }
    if(logged) {
        return (
            <div className="user-wrapper">
                <h2 className="user-h2">Welcome back {username}</h2>
                <div className="user-film-wrapper">
                    <div className="user-film-seen">
                        <div className="user-film-title">
                            <h2 className="h2-films">Film Liked</h2>
                            <div className="user-film-liked">{film_liked}</div>
                        </div>

                        <div className="user-film-title">
                            <h2 className="h2-films">Film Seen</h2>
                            <div className="user-film-liked">{film_seen}</div>
                        </div>

                        <div className="user-film-title">
                            <h2 className="h2-films">Film Paused</h2>
                            <div className="user-film-liked">{film_paused}</div>
                        </div>

                        <div className="user-film-title">
                            <h2 className="h2-films">Film Planned to view</h2>
                            <div className="user-film-liked">{film_planned}</div>
                        </div>

                        <div className="user-film-title">
                            <h2 className="h2-films">Film Dropped</h2>
                            <div className="user-film-liked">{film_dropped}</div>
                        </div>

                        <div className="user-film-title">
                            <h2 className="h2-films">Rank by Note</h2>
                            <div className="user-film-liked">{film_notes}</div>
                        </div>
                        
                    </div>
                </div>
                <button className="button-basic" onClick={() => Logout()}>Log out</button>
            </div>
        )
    } else {
        return(
            <Redirect to = "/"/>
        )
        
    }
    
}

export default DetailsUser
