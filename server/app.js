const http = require('http');
const express = require('express');
const { response } = require('express');
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
