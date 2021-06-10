import TrendingMovies from "../components/TrendingMovies.js";
import "../styles/home.css"
import GenreFilm from "../components/GenreFilm.js";

const Home = () => {
    return (
        <div className="home">
            <div className="div-home-body">
                <div className="Trending-div">
                <TrendingMovies />
                </div>
                <div className="div-genre-film">
                <GenreFilm/>   
                </div>
                
            </div>         
        </div>
    )
}
export default Home;