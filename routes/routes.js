var express = require('express');
require('../js/index.js')
var app = module.exports = express();

app.get('/', (req, res) => {
    getMovies();
    res.render('index',{}) 
})