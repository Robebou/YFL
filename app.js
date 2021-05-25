
const PORT = process.env.PORT || 3000;

const path = require('path');
const http = require('http');
const express = require('express');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");



const bcrypt = require('bcrypt');
const saltRounds = 10;

var mysql = require("mysql")
const cors = require('cors')


var app = express()
app.use(cors({
  origin: true,
  optionsSuccessStatus: 200,
  credentials: true
}));
app.options('*', cors());
app.use(express.json())

app.use(cookieParser("salut"))
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'build')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(session({
  secret: "salut",
  resave: true,
  saveUninitialized: true,
}))

var routes = require("./routes/routes")


var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);


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

app.listen(PORT, () => {
  console.log("server started on port %d",PORT);
})

app.post("/register",(req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(`SELECT username FROM users where username ="${username}"`, function(err, result, fields)  {
    if(err) throw err;
    if(result.length > 0) {
      res.send({message :"User already exists"})
      console.log(username + " already exist in DB")
    } else {
      bcrypt.hash(password, saltRounds,(err, hash) => {
        if(err) throw err;
        db.query("INSERT INTO users (username, password) VALUES (?,?)",[username,hash],
        (err, result) => {
          console.log(err);
          res.send({message:"You are now registered ! Please Login"})
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
  })
})

app.post("/deleteCommentaire",(req, res) => {
  const id = req.body.id;
  db.query(`DELETE FROM commentaires WHERE id = '${id}'`,(err, result, fields) => {
    res.send(result)
    console.log(result)
  })
})

app.post("/saveUserFilm",(req, res) => {
  const id_movie = parseInt(req.body.id_movie,10);
  const id_user = req.body.id_user;
  const isSeen = req.body.isSeen;
  const score = req.body.score;
  const like = req.body.like;
  const img = req.body.img;
  
  console.log(req.body)

  db.query(`SELECT * FROM films_interactions WHERE user_id = ${id_user} AND movie_id=${id_movie}`,(err, result, fields) => {
    if(result.length == 0) {
      db.query(`INSERT INTO films_interactions (user_id,movie_id,score,isSeen,isLiked,img) VALUES(?,?,?,?,?,?)`,[id_user,id_movie,score,isSeen,like,img],(err2, result2) =>{
        if(err2) throw err2;
        res.send({message: "Informations were saved in DB"});
      })
    } else { 
      db.query(`UPDATE films_interactions SET img = "${img}", score = ${score}, isLiked =${like}, isSeen = "${isSeen}" WHERE user_id=${id_user} and movie_id=${id_movie}`,(err2,result2, fields) => {
        if(err2) throw err2;
        res.send({message: "Informations were saved in DB"});
      })
    }
  })
})

app.get("/getUserFilm",(req, res) => {
  const movie_id = req.query.movie_id
  if(req.session.user) {
    const user_id = req.session.user[0].id;
    db.query(`SELECT * FROM films_interactions WHERE user_id = ${user_id} AND movie_id = ${movie_id}`,(err, result, fields) => {
      if(err) throw err;
      res.send({result: result,loggedIn: true,user_id:user_id})
    })
    
  } else {
    res.send({loggedIn: false,user_id:user_id})
  }
})

app.get("/getAllUserFilm",(req, res) => {
  if(req.session.user) {
    console.log(req.session)
    const user_id = req.session.user[0].id;
    db.query(`SELECT * FROM films_interactions WHERE user_id = ${user_id} `,(err, result, fields) => {
      if(err) throw err;
      res.send({result: result,loggedIn: true,username: req.session.user[0].username})
    })
  } else {
    res.send({message:"not working"})
  }

})


