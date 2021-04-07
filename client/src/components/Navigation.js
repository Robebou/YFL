import React from 'react';
import "../styles/navigation.css"

const Navigation = () => {
    return (
        <div className="navigation">
            <header>
                <img src="https://raw.githubusercontent.com/Robebou/YFL/main/ressources/final_logo.png?token=ARN4QZALWH3P7OV4JYA355LAMORTG" alt="logo" class="logo"/>
                <nav>
                    <ul>
                        <li class="li-not-pp"><a href="#">Ma Liste</a></li>
                        <li class="li-not-pp"><a href="#">Film</a></li>
                        <li class="li-not-pp"><a href="#">Série</a></li>
                        <li><a href="#"><img src ="https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin.jpg" class="img-nav-pp"/></a></li>

                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Navigation;  