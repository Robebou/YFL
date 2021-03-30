const http = require('http');
const express = require('express');
const { response } = require('express');
var app = express()
var routes = require("./routes/routes")

app.use(express.static('views'))
app.use('views', express.static(__dirname + 'views'))

app.set('views','./views')
app.set('view engine','ejs')

app.use(routes)
const PORT = 8080;
const APIKEY = '9ea3fe10f4f94f70b6169e29f0f576d6';

app.get('/', (req, res) => {
  res.render('index',{}) 
})

app.listen(PORT, () => {
  console.log("server started on port %d",PORT);
})
