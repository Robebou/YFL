const http = require('http');
const express = require('express');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");



const bcrypt = require('bcrypt');
const saltRounds = 10;

var mysql = require("mysql")
var cors = require('cors')
var app = express()

app.use(express.json())
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET","POST"],
  credentials: true
}));
app.use(cookieParser("salut"))
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
  secret: "salut",
  resave: true,
  saveUninitialized: true,
}))

var routes = require("./routes/routes")




app.use(express.static('views'))
app.use('views', express.static(__dirname + 'views'))

//robebou_yfl_op
//ProjetTransverseL2

app.set('views','./views')
app.set('view engine','ejs')


const db = mysql.createConnection({
  user:"robebou_yfl_op",
  host:"mysql-robebou.alwaysdata.net",
  password:"5p2}+}[aNFwXsPrC",
  database:"robebou_yfl",
});

db.connect(function(err) {
  if(err) throw err;
  console.log("Connected to DB")
})

const PORT = 8080;




app.listen(PORT, () => {
  console.log("server started on port %d",PORT);
})

app.post("/register",(req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(`SELECT username FROM users where username ="${username}"`, function(err, result, fields)  {
    if(err) throw err;
    if(result.length > 0) {
      res.send({message :"user already exist"})
      console.log(username + " already exist in DB")
    } else {
      bcrypt.hash(password, saltRounds,(err, hash) => {
        if(err) throw err;
        db.query("INSERT INTO users (username, password) VALUES (?,?)",[username,hash],
        (err, result) => {
          console.log(err);
        }
      )
      })
    }
  })
})

app.post("/login",(req, res) => { 
  const username = req.body.username;
  const password = req.body.password;
  db.query(`SELECT * from users WHERE username = "${username}"`,function (err, result, fields) {
    if(err) throw(err);
    if(result.length > 0) {
      bcrypt.compare(password, result[0].password,(err, response) => {
        if (response) {
          let userInfo = {
            username: result[0].username,
            id: result[0].id,
            connected: true
          }
          req.session.user = result;
          req.session.save();
          res.send(userInfo)
        } else {
          res.send({message:"Wrong password !"})
        }
      })
    } else {
      res.send({message: "User doesn't exist"})
    }
  })
})

app.get("/login",(req, res) => {
  if(req.session.user) {
    res.send({loggedIn: true, user: req.session.user})
  } else {
    res.send({loggedIn: false})
  }
})

app.get("/getUserInfo",(req, res) => {
  if(req.session.user) {
    res.send({user:req.session.user})
  }
})

app.get("/logout",(req, res) => {
  if(req.session) {
    req.session.destroy();
    res.send("Logged out")
  }
})

app.post("/save_com",(req, res) => {
  const user_id = req.body.id_user;
  const movie_id = req.body.id_movie;
  const com = req.body.commentaire;
  const username = req.body.username;

  db.query(`INSERT INTO commentaires (user_id,movie_id,username,commentaire) VALUES(?,?,?,?)`,[user_id,movie_id,username,com],(err, result) =>{
    if(err) throw err;
  })
  res.send("Sucessful")
})

app.get("/getCommentaire",(req, res) => {
  const movie_id = req.query.movie_id
  db.query(`SELECT * from commentaires WHERE movie_id='${movie_id}'`,(err, result, fields) => {
    res.send({result: result, size: result.length})
    console.log(result)
  })
})

app.post("/deleteCommentaire",(req, res) => {
  const id = req.body.id;
  db.query(`DELETE FROM commentaires WHERE id = '${id}'`,(err, result, fields) => {
    res.send(result)
    console.log(result)
  })
})