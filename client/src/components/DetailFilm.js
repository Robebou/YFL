import React from "react";
import "../styles/DetailFilm.css"
import {Link} from 'react-router-dom';
const api_key = "9ea3fe10f4f94f70b6169e29f0f576d6";
const API_IMAGES = 'https://image.tmdb.org/t/p/w500';


class DetailFilm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.movie_id,
            info: {},
            recommandation: []
        }
    }
    componentDidMount() {
        const fetchData = async () => {
            console.log("UPDATE 1")
            const API_URL_DETAILS = `https://api.themoviedb.org/3/movie/${this.state.id}?api_key=${api_key}&language=en-US`;
            const API_URL_RECOMMENDATIONS = `https://api.themoviedb.org/3/movie/${this.state.id}/similar?api_key=${api_key}&language=en-US&page=1`
            
            const response = await fetch(API_URL_DETAILS);
            const data = await response.json();

            const response_recommandation = await fetch(API_URL_RECOMMENDATIONS);
            const data_recommandation = await response_recommandation.json();
            const data_recommandation_spliced = (data_recommandation.results).splice(0,10)

            this.setState({info: data,recommandation:data_recommandation_spliced })
        }
        fetchData();
        

    }
    componentWillReceiveProps(nextProps) {
        console.log("RENDERING" + nextProps.movie_id)
        const fetchData = async () => {
            const API_URL_DETAILS = `https://api.themoviedb.org/3/movie/${this.state.id}?api_key=${api_key}&language=en-US`;
            const API_URL_RECOMMENDATIONS = `https://api.themoviedb.org/3/movie/${this.state.id}/similar?api_key=${api_key}&language=en-US&page=1`
            
            const response = await fetch(API_URL_DETAILS);
            const data = await response.json();

            const response_recommandation = await fetch(API_URL_RECOMMENDATIONS);
            const data_recommandation = await response_recommandation.json();
            const data_recommandation_spliced = (data_recommandation.results).splice(0,10)

            this.setState({id: nextProps.movie_id,info: data,recommandation:data_recommandation_spliced })
            console.log("Rendered" + nextProps.movie_id)
        }
        fetchData();
    }
    render()  {
        return (
            <div className = "div-movie-detail">
            <h2 className = "h2-detail">{this.state.info.title}</h2>
            <div className = "detail-affiche">
                <img src = {API_IMAGES + this.state.info.poster_path} className="image-movie-detail"/>
                <div className ="detail-overview">{this.state.info.overview}</div>
            </div>
            <div className ="detail-bottom">
                <div className ="detail-more-info">
                    <p>Budget : {this.state.info.budget} $</p>
                    <p>Revenue : {this.state.info.revenue} $</p>
                    <p>Vote Average :  {this.state.info.vote_average}</p>
                    <p>Release Date : {this.state.info.release_date}</p>
                </div>
                <div className= "detail-recommandation">
                    {this.state.recommandation.map((movie) => 
                        <Link to={`/movie/${movie.id}`}>
                            <img src = {API_IMAGES + movie.poster_path} className="image-movie-genre"/>
                        </Link>
                    )}    
                </div>
            </div>
            
        </div>
        )
    }

}
export default DetailFilm;
