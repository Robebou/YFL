import Navigation from "../components/Navigation.js";
import HistoryMovies from "../components/HistoryMovies.js";
import TrendingMovies from "../components/TrendingMovies.js";
const Home = () => {
    return (
        <div className="home">
            <Navigation />
            <div className="div-home-body">
                <TrendingMovies />
                <HistoryMovies />   
            </div>         
        </div>
    )
}
export default Home;