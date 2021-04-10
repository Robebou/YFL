import Navigation from "../components/Navigation.js";
import HistoryMovies from "../components/HistoryMovies.js";
import TrendingMovies from "../components/TrendingMovies.js";
const Home = () => {
    return (
        <div className="home">
            <Navigation />
            <HistoryMovies />
            <TrendingMovies />
            <p>Hello</p>
        </div>
    )
}
export default Home;