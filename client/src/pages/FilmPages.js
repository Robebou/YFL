
import DetailFilm from "../components/DetailFilm.js";
import Commentaire from "../components/Commentaire.js"
var movie_id = 791373;

const FilmPages = ({match}) => {
    return (
        <div className="home">
            <div className="div-home-body"> 
            <DetailFilm movie_id = {match.params.id}/>
            <Commentaire movie_id = {match.params.id}/>
            </div>         
        </div>
    )
}
export default FilmPages;