const APIKEY = '9ea3fe10f4f94f70b6169e29f0f576d6';
const API_URL_POPULAR = 'https://api.themoviedb.org/3/movie/popular?api_key=9ea3fe10f4f94f70b6169e29f0f576d6&language=en-US&page=1';
const fetch = require('node-fetch')
async function getMovies() {
    const resp = await fetch(API_URL_POPULAR);
    const respData = await resp.json();

    console.log(respData)
}

module.exports = {getMovies}