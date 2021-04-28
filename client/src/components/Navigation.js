import React from 'react';
import "../styles/navigation.css"
import logo from '../ressources/final_logo.png';
import {Link} from 'react-router-dom';
const Navigation = () => {
    return (
        <div className="navigation">
            <header>
                <Link to ="/"><img src={logo} alt="logo" class="logo"/></Link>
                <nav>
                    <ul>
                        <li className="li-not-pp"><a href="#">Ma Liste</a></li>
                        <li className="li-not-pp"><a href="#">Film</a></li>
                        <li className="li-not-pp"><a href="#">Série</a></li>
                        <li><a href="#"><img src ="https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin.jpg" className="img-nav-pp"/></a></li>

                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Navigation;  