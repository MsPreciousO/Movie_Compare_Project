import style from './styles.css'

document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});
// -----OMDB Api with Key------
// http://www.omdbapi.com/?i=tt3896198&apikey=[]


// console.log (fetch('http://www.omdbapi.com/?i=tt3896198&apikey=[]'))

// fetch('http://www.omdbapi.com/?i=tt3896198&apikey=[]')

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
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++

console.log(process.env.APIKEY)


$(document).ready(() => { 
    $('#searchForm').on('submit', (e) => {
      let searchQuery = $('#searchInput').val();
      getMovies(searchQuery);
      e.preventDefault();
    });
  });
  
  function getMovies(searchQuery) {
    axios.get('http://www.omdbapi.com?s='+searchQuery+'&apikey=[]')
      .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
          output += `
            <div class="col-md-3">
              <div class="well text-center">
                <img src="${movie.Poster}">
                <h5>${movie.Title}</h5>
                <a onclick="movieSelected('${movie.imdbID}')" class="" href="#">Movie Details</a>
              </div>
            </div>`;
        });
        
        $('#movies').html(output);
      })
      .catch((err) => {
        console.log(err);
      });      
  }
  
  
  function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
  }
  
  function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    
    
    axios.get('http://www.omdbapi.com?i='+movieId+'&apikey=[]')
      .then((response) => {
        console.log(response);
        let movie = response.data;
        
        let output = `
          <div class="row">
            <div class="col-md-4">
              <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2>${movie.Title}</h2> 
              <ul class="list-group">
                <li class="list-group-item"><b>Genre: </b>${movie.Genre}</li>
                <li class="list-group-item"><b>Released: </b>${movie.Released}</li>
                <li class="list-group-item"><b>Rated: </b>${movie.Rated}</li>
                <li class="list-group-item"><b>IMDB Rating: </b>${movie.imdbRating}</li>
                <li class="list-group-item"><b>Director: </b>${movie.Director}</li>
                <li class="list-group-item"><b>Actors: </b>${movie.Actors}</li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="well">
              <h3>Plot</h3>
              ${movie.Plot}
              <hr>
              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
              <a href="index.html" class="btn btn-light">Go Back to Search</a>
            </div>
          </div>
        `;
        
        $('#movie').html(output);
      })
      .catch((err) => {
        console.log(err);
      });      
   }  



























