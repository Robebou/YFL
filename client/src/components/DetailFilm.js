import { useEffect, useState } from "react";


const DetailFilm = ({movie_id}) => {
    const [info,setinfo] = useState([]);
    const API_URL_DETAILS = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=9ea3fe10f4f94f70b6169e29f0f576d6&language=en-US`;
    const API_IMAGES = 'https://image.tmdb.org/t/p/w500';

    useEffect(async ()=>{

        const response = await fetch(API_URL_DETAILS);
        const data = await response.json();
        setinfo(data)
    },[])
    return (
        <div>
            <img src = {API_IMAGES + info.poster_path} className="image-movie-genre"/>
        </div>
    )
}
export default DetailFilm;