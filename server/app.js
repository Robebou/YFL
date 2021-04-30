const http = require('http');
const express = require('express');
const { response } = require('express');

const bcrypt = require('bcrypt');
const saltRounds = 10;

var mysql = require("mysql")
var cors = require('cors')
var app = express()
var routes = require("./routes/routes")

app.use(cors());
app.use(express.static('views'))
app.use('views', express.static(__dirname + 'views'))


//robebou_yfl_op
//ProjetTransverseL2

app.set('views','./views')
app.set('view engine','ejs')

app.use(routes)

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

bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.listen(PORT, () => {
  console.log("server started on port %d",PORT);
})

app.post('/save_com', (req, res) => {
  console.log(req.body)
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

  db.query(`SELECT * from users WHERE username = "${username}"`,function (err, result, fiels) {
    if(err) throw(err);
    if(result.length > 0) {
      bcrypt.compare(password, result[0].password,(err, result) => {
        if (res) {
          res.send(result)
        } else {
          res.send({message:"Wrong password !"})
        }
      })
    } else {
      res.send({message: "User doesn't exist"})
    }
  })
})