import DetailFilm from "../components/DetailFilm.js";
import Navigation from "../components/Navigation.js";
var movie_id = 791373;

const FilmPages = () => {
    return (
        <div className="home">
            <Navigation />
            <div className="div-home-body"> 
            <DetailFilm movie_id = {movie_id} />
            </div>         
        </div>
    )
}
export default FilmPages;