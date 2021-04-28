import { useEffect, useState } from "react";
import "../styles/DetailFilm.css"
import {Link} from 'react-router-dom';
const api_key = "9ea3fe10f4f94f70b6169e29f0f576d6";

const DetailFilm = ({movie_id}) => {
    const [info,setinfo] = useState([]);
    const [recommandations, setRecommandations] = useState([]);
    const API_URL_DETAILS = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}&language=en-US`;
    const API_URL_RECOMMENDATIONS = `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${api_key}&language=en-US&page=1`
    const API_IMAGES = 'https://image.tmdb.org/t/p/w500';
    
    useEffect(async ()=>{

        const response = await fetch(API_URL_DETAILS);
        const data = await response.json();
        setinfo(data)

        const response_recommandation = await fetch(API_URL_RECOMMENDATIONS);
        const data_recommandation = await response_recommandation.json();
        setRecommandations((data_recommandation.results).splice(0,10))
        console.log(data_recommandation.results)

    },[])
    return (
        <div className = "div-movie-detail">
            <h2 className = "h2-detail">{info.title}</h2>
            <div className = "detail-affiche">
                <img src = {API_IMAGES + info.poster_path} className="image-movie-detail"/>
                <div className ="detail-overview">{info.overview}</div>
            </div>
            <div className ="detail-bottom">
                <div className ="detail-more-info">
                    <p>Budget : {info.budget} $</p>
                    <p>Revenue : {info.revenue} $</p>
                    <p>Vote Average :  {info.vote_average}</p>
                    <p>Release Date : {info.release_date}</p>
                </div>
                <div className= "detail-recommandation">
                    {recommandations.map((movie) => 
                        <Link to={`/movie/${movie.id}`}>
                            <img src = {API_IMAGES + movie.poster_path} className="image-movie-genre"/>
                        </Link>
                    )}    
                </div>
            </div>
            
        </div>
    )
}
export default DetailFilm;
