import React from 'react'
import "../styles/AboutUs.css"

function AboutUs() {
    const colin_pic = "https://media.discordapp.net/attachments/636910686265671680/846734181076959232/colin_img.png";
    const val_pic = "https://media.discordapp.net/attachments/636910686265671680/846734181614878720/val_img.png";
    const manguier_pic = "https://media.discordapp.net/attachments/636910686265671680/846734182675775498/manguier_img.png";
    const robert_pic = "https://media.discordapp.net/attachments/636910686265671680/846734179847766036/robert_img.png";
    const nico_pic = "https://media.discordapp.net/attachments/636910686265671680/846734183677952060/nico_img.png";

    const dev_info = [
        {
            name: "Guillaume Lesage",
            Age: 19,
            img : manguier_pic,
        },
        {
            name: "Valentin Thiébaut",
            Age: 20,
            img : val_pic,
        },
        {
            name: "Guillaume Théret",
            Age: 20,
            img : robert_pic,
        },
        {
            name: "Nicolas Blanchard",
            Age: 20,
            img : nico_pic,
        },
        {
            name: "Colin Bezombes",
            Age: 19,
            img : colin_pic,
        }
    ]

    return (
        <div className="test">
            <h1 className="h1-about">About us</h1>
            <div className="all-info-wrapper">
             
             {dev_info.map((info) => 
                <div className="info-wrapper">
                    <img src = {info.img} className="info-images"/>
                    <h2 className="info-name">{info.name}</h2>
                </div>
                
             )}
        </div>
        </div>

        
    )
}

export default AboutUs
