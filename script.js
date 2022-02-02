// -----OMDB Api with Key------
// http://www.omdbapi.com/?i=tt3896198&apikey=f71ace79


// console.log (fetch('http://www.omdbapi.com/?i=tt3896198&apikey=f71ace79'))

// fetch('http://www.omdbapi.com/?i=tt3896198&apikey=f71ace79')

// // .then(res => console.log(res))

// // .then(res => res.json())
// .then(res => {
//     if(res.ok){
//         console.log('SUCCESS')
//     }
//     // else {
//     //     console.log('Not Successful')
//     // }

// })
// .then(data => console.log(data))
// .catch(error => console.log('ERROR'))

// =================================================

// function fetchMovie (){

// }


const APIURL = "http://www.omdbapi.com/?i=tt3896198&apikey=f71ace79";

// const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "http://www.omdbapi.com/?i=tt3896198&apikey=f71ace79&query="
// "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("content");
const form = document.getElementById("form");
const search = document.getElementById("search");
// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
const resp = await fetch(url);
const respData = await resp.json();
console.log(respData);
showMovies(respData.results);
}
function showMovies(movies) {
// clear main
main.innerHTML = "";
movie.forEach((movie) => {
const { poster_path, title, vote_average, overview } = movie;
const movieEl = document.createElement("div");
movieEl.classList.add("movie");
movieEl.innerHTML = `
<img
src="${IMGPATH + poster_path}"
alt="${title}"
/>
<div class="movie-info">
<h3>${title}</h3>
<span class="${getClassByRate(
vote_average
)}">${vote_average}</span>
</div>
<div class="overview">
<h3>Overview:</h3>
${overview}
</div>
`;
main.appendChild(movieEl);
});
}
function getClassByRate(vote) {
if (vote >= 8) {
return "green";
} else if (vote >= 5) {
return "orange";
} else {
return "red";
}
}
form.addEventListener("submit", (e) => 
e.preventDefault();

const searchTerm = search.value;
if (searchTerm) {
getMovies(SEARCHAPI + searchTerm);
search.value = "";
}
});



