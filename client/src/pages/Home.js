import Navigation from "../components/Navigation.js";
import HistoryMovies from "../components/HistoryMovies.js";
const Home = () => {
    return (
        <div className="home">
            <Navigation />
            <HistoryMovies />
            <p>Hello</p>
        </div>
    )
}
export default Home;