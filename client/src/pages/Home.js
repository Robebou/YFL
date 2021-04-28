import TrendingMovies from "../components/TrendingMovies.js";
import "../styles/home.css"
import GenreFilm from "../components/GenreFilm.js";

const Home = () => {
    return (
        <div className="home">
            <div className="div-home-body">
                <TrendingMovies />
                <GenreFilm/>   
            </div>         
        </div>
    )
}
export default Home;