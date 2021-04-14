import { useEffect, useState } from "react";


const DetailFilm = ({movie_id}) => {
    const [info,setinfo] = useState([]);
    const API_URL_DETAILS = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=9ea3fe10f4f94f70b6169e29f0f576d6&language=en-US`;
    useEffect(async ()=>{

        const response = await fetch(API_URL_DETAILS);
        const Data = await response.json();
        console.log(movie_id);

    },[])
    return (
<div>

</div>
    )
}
export default DetailFilm;