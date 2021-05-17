import React, { useEffect, useState } from "react";
import "../styles/DetailFilm.css"
import {Link} from 'react-router-dom';
import PopUp from "../components/PopUpFilm.js";
const api_key = "9ea3fe10f4f94f70b6169e29f0f576d6";
const API_IMAGES = 'https://image.tmdb.org/t/p/w500';

function DetailFilm({movie_id}) {
    let id = movie_id;
    
    const [info,setInfo] = useState([]);
    const [recommandation,setRecommandation] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const API_URL_DETAILS = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`;
            const API_URL_RECOMMENDATIONS = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${api_key}&language=en-US&page=1`
            
            const response = await fetch(API_URL_DETAILS);
            const data = await response.json();

            const response_recommandation = await fetch(API_URL_RECOMMENDATIONS);
            const data_recommandation = await response_recommandation.json();
            const data_recommandation_spliced = (data_recommandation.results).splice(0,10)

            
            if(data.budget == 0) {
                data.budget = "undefined"
            } else {
                data.budget += " $"
            }
            if(data.revenue == 0) {
                data.revenue = "undefined"
            } else {
                data.revenue+= " $"
            }
            console.log(info)
            setInfo(data);
            setRecommandation(data_recommandation_spliced);

        }
        fetchData();
    },[id]);

    return (
        <div className = "div-movie-detail">
        <h2 className = "h2-detail">{info.title}</h2>
        <div className = "detail-affiche">
            <div className ="affiche-button">
                <img src = {API_IMAGES + info.poster_path} className="image-movie-detail"/>
                <div className ="detail-overview">{info.overview}</div>
                
            </div>
            
            
            <PopUp img ={API_IMAGES+info.poster_path} title = {info.title}/>
            
        </div>
        
        <div className ="detail-bottom">
            <div className ="detail-more-info">
                <p>Budget : {info.budget} </p>
                <p>Revenue : {info.revenue} </p>
                <p>Vote Average :  {info.vote_average}</p>
                <p>Release Date : {info.release_date}</p>
            </div>
            <div className= "detail-recommandation">
                <h2 className = "h2-detail-recommndation">Recommandation</h2>
                {recommandation.map((movie) => 
                    <Link to={`/movie/${movie.id}`} key={movie.id}>
                        <img src = {API_IMAGES + movie.poster_path} className="image-movie-genre"/>
                    </Link>
                )}    
            </div>
        </div>
        
    </div>
    )

}
export default DetailFilm;
