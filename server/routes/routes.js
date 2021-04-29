var express = require('express');
var app = module.exports = express();

app.get('/', (req, res) => {
    res.render('index',{respData: respData})  
})