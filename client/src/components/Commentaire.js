import React, { useLayoutEffect, useState, useEffect,useReducer } from 'react'
import "../styles/Commentaire.css"
import axios from "axios";
axios.defaults.withCredentials = true;
const url = "http://localhost:8080/save_com";





class Commentaire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.movie_id,
            commentaire: "",
            username: "",
            id_movie: "",
            id_user: "",
            logged: undefined,
            coms: [],
            size: undefined
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.fetchApi();        
        this.fetchCom();
    }
    componentDidUpdate() {
        this.fetchCom();
    }
    fetchCom() {
        const fetchData = async() => {
            axios.get("http://localhost:8080/getCommentaire",{
                params: {
                    movie_id: this.state.id
                }
            }).then((response)=> {
                if(this.state.size != response.data.size) {
                    this.setState({
                        coms: response.data.result,
                        size: response.data.size
                    })
                }
                
                console.log(response.data) 
                console.log(response.data.size)
                console.log(this.state.size)
                
            })

            
        }
        fetchData();
        
    }
    fetchApi() {
        const fetchData = async() => {
            axios.get("http://localhost:8080/login").then((response) => {
                console.log(response)
                if(response.data.loggedIn == true) {
                    this.setState({
                        logged: true,
                        username:response.data.user[0].username,
                        id_movie:this.state.movie_id,
                        id_user:response.data.user[0].id
                    })
                } else {
                    this.setState({
                        logged: false
                    })
                }
            })
            
        }
        fetchData();
    }
    submit(e) {
        console.log(this.state.commentaire)
        const submitData = async() => {
            e.preventDefault();
            if(this.state.commentaire != "") {
                axios.post(url, {
                    commentaire: this.state.commentaire,
                    username: this.state.username,
                    id_movie: this.state.id,
                    id_user: this.state.id_user
                }).then((response) => {
                    this.setState({
                        commentaire:""
                    })
                    console.log("ok")
                })
            }
        }
        submitData();
        
    }

    delete_com(com) {
        const delete_com_async = async() => {
            axios.post("http://localhost:8080/deleteCommentaire", com).then((response) => {
                console.log(response)
                this.forceUpdate();
            })
            console.log("Update")
        }
        delete_com_async();
    }
    handleChange(event) { 
        this.setState({commentaire: event.target.value});
        console.log(this.state.commentaire)
    }

    showButton(username,com) {
        if (username == this.state.username) {
            return(<button onClick={(() => {this.delete_com(com)})}>Delete</button>)
        }
    }
    render()  {
        if(this.state.logged) {

            return (
            <div className="wrapper">
                <form action="" method="POST" className="form">
                <div className="row">
                </div>
                <div className="input-group textarea">
                    <label for="comment">{this.state.username}</label>
                    <textarea id="comment" placeholder="Enter your Comment" value = {this.state.value} onChange={this.handleChange}   required></textarea>
                </div>
                <div className="input-group">
                    <button classname="btn" onClick={(e)=>this.submit(e)} >Post Comment</button>
                </div>
            </form>
                <div className="prev-comments">
                    {this.state.coms.map((com) => 
                        <div class="single-item">
                            <h4>{com.username}</h4>
                            <p>{com.commentaire}</p>
                            {this.showButton(com.username,com)}
                        </div>
                    )}    
                        
                </div>
            </div>
            )
        } else {
            return(
                <div>
                    Unlogged
                </div>
            )
        }
        
    }
}

export default Commentaire;