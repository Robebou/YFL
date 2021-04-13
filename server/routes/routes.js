var express = require('express');
const index = require('../js/index.js')
var app = module.exports = express();

app.get('/', (req, res) => {
    const data2 = index.getMovies()
    .then(respData => {
        console.log(respData)
        res.render('index',{respData: respData})
    })
    
    
})