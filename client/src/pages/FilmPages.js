import * as React from 'react'
import DetailFilm from "../components/DetailFilm.js";

class FilmPages extends React.Component {
    constructor({match}) {
        super({match})
        this.state = {
            id: match.params.id
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.match.params.id
        })
        console.log(this.state.id)
    }
    render() {
        return (
            <div className="home">
                <div className="div-home-body"> 
                <DetailFilm movie_id = {this.state.id}/>
                </div>         
            </div>
        ) 
    }
}
export default FilmPages;