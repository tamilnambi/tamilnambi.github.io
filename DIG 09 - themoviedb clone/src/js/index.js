const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

var moviesMenuVisibility = false;
var tvshowMenuVisibility = false;
var peopleMenuVisibility = false;

function changeMoviesMenu() {
  if (moviesMenuVisibility == false) {
    document.getElementById("movies-menu").style.display = "block";
    moviesMenuVisibility = true;
  } else {
    document.getElementById("movies-menu").style.display = "none";
    moviesMenuVisibility = false;
  }
}

function changeTVShowsMenu() {
  if (tvshowMenuVisibility == false) {
    document.getElementById("tvshows-menu").style.display = "block";
    tvshowMenuVisibility = true;
  } else {
    document.getElementById("tvshows-menu").style.display = "none";
    tvshowMenuVisibility = false;
  }
}

function changePeopleMenu() {
  if (peopleMenuVisibility == false) {
    document.getElementById("people-menu").style.display = "block";
    peopleMenuVisibility = true;
  } else {
    document.getElementById("people-menu").style.display = "none";
    peopleMenuVisibility = false;
  }
}

trending();
popular();
freeToWatch();
trailers();

function trending() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDBhZjU4OTQzZjhiYzg2M2U1ZGM2ZWEyMDBkZWMzYSIsInN1YiI6IjY0OWIxNmQ2N2UzNDgzMDBhY2MzYTI2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TrFh8ToM1aVvdqNZHZK_KPoWHr_pYcy8OFWvmPqnt_s",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  )
    .then((response) => response.json())
    .then(displayTrending)
    .catch((err) => console.error(err));
}

function displayTrending(response) {
  //console.log(response.results);
  let print = "";

  const m = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  for (let i = 0; i < response.results.length; i++) {
    const day = new Date(response.results[i].release_date);
    const openingDate =
      day.getDate() + " " + m[day.getMonth()] + " " + day.getFullYear();
    url = `https://image.tmdb.org/t/p/original/${response.results[i].poster_path}`;
    print += `<div class="card-type"><img src="${url}" width="150rem" onclick="displayMovie('${response.results[i].id}')"><div class="rating mb-1"><span class="text-light bg-black rounded-circle p-2">${response.results[i].vote_average.toFixed(1)}</span></div><h6 onclick="displayMovie('${response.results[i].id}')">${response.results[i].original_title}<h6><p>${openingDate}</p></div>`;
  }
  document.getElementById("trending-results").innerHTML = print;
}
function displayMovie(movieId){
  localStorage.setItem('movieId',movieId);
  window.location.href="movie.html";
}
function popular(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDBhZjU4OTQzZjhiYzg2M2U1ZGM2ZWEyMDBkZWMzYSIsInN1YiI6IjY0OWIxNmQ2N2UzNDgzMDBhY2MzYTI2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TrFh8ToM1aVvdqNZHZK_KPoWHr_pYcy8OFWvmPqnt_s'
        }
      };
      
      fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options)
        .then(response => response.json())
        .then(displayPopular)
        .catch(err => console.error(err));
}

function displayPopular(response){
  //console.log(response.results);
  let print = "";

  const m = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  for (let i = 0; i < response.results.length; i++) {
    const day = new Date(response.results[i].first_air_date);
    const openingDate =
      day.getDate() + " " + m[day.getMonth()] + " " + day.getFullYear();
    url = `https://image.tmdb.org/t/p/original/${response.results[i].poster_path}`;
    print += `<div class="card-type"><img src="${url}" width="150rem"><h6>${response.results[i].name}<h6><p>${openingDate}</p></div>`;
  }
  document.getElementById("popular-results").innerHTML = print;

}

function freeToWatch(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDBhZjU4OTQzZjhiYzg2M2U1ZGM2ZWEyMDBkZWMzYSIsInN1YiI6IjY0OWIxNmQ2N2UzNDgzMDBhY2MzYTI2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TrFh8ToM1aVvdqNZHZK_KPoWHr_pYcy8OFWvmPqnt_s'
        }
      };
      
      fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(displayWatch)
        .catch(err => console.error(err));
}

function displayWatch(response){
  //console.log(response.results);
  let print = "";

  const m = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  for (let i = 0; i < response.results.length; i++) {
    const day = new Date(response.results[i].release_date);
    const openingDate =
      day.getDate() + " " + m[day.getMonth()] + " " + day.getFullYear();
    url = `https://image.tmdb.org/t/p/original/${response.results[i].poster_path}`;
    print += `<div class="card-type"><img src="${url}" width="150rem" onclick="displayMovie('${response.results[i].id}')"><div class="rating mb-1"><span class="text-light bg-black rounded-circle p-2">${response.results[i].vote_average.toFixed(1)}</span></div><h6 onclick="displayMovie('${response.results[i].id}')">${response.results[i].original_title}<h6><p>${openingDate}</p></div>`;
  }
  document.getElementById("watch-results").innerHTML = print;
}

function trailers(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDBhZjU4OTQzZjhiYzg2M2U1ZGM2ZWEyMDBkZWMzYSIsInN1YiI6IjY0OWIxNmQ2N2UzNDgzMDBhY2MzYTI2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TrFh8ToM1aVvdqNZHZK_KPoWHr_pYcy8OFWvmPqnt_s'
        }
      };
      
      fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(response => response.json())
        .then(displayTrailers)
        .catch(err => console.error(err));
}

function displayTrailers(response){
    
  var idArray = [];
  var thumbnails = "";
  var trailerUrls = [];
    for (let i = 0; i < response.results.length; i++)
    {
        let id = response.results[i].id;
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDBhZjU4OTQzZjhiYzg2M2U1ZGM2ZWEyMDBkZWMzYSIsInN1YiI6IjY0OWIxNmQ2N2UzNDgzMDBhY2MzYTI2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TrFh8ToM1aVvdqNZHZK_KPoWHr_pYcy8OFWvmPqnt_s'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&type=Trailer`, options)
            .then(response => response.json())
            .then(response => {
              let urlId = response.results[0].key;
              thumbnails += `<div class="m-3 trailer" onclick="playTrailer('${urlId}','${response.results[0].name}')" ><img class="rounded-3 d-block" src="https://i.ytimg.com/vi/${urlId}/maxresdefault.jpg" width="350rem"><h6 class="text-light text-center my-2">${response.results[0].name}</h6><i class="bi bi-play-fill text-light play-button"></i></div>`;
              document.getElementById("trailer-results").innerHTML = thumbnails;
            })
            .catch(err => console.error(err));
    }
}

function playTrailer(url,name){
  let print = `<div class="d-flex justify-content-between bg-black py-3 px-2"><h6 class="text-light">${name}</h6><div data-bs-theme="dark"><button type="button" class="btn-close" aria-label="Close" onclick="closeTrailer()"></button></div></div><div class="ratio ratio-16x9"><iframe id="trailer" src="https://www.youtube.com/embed/${url}" allowfullscreen></iframe></div>`;
  document.getElementById('play-trailer').style.display="block";
  document.getElementById('play-trailer').style.zIndex = "1";
  document.getElementById('play-trailer').innerHTML = print;

}

function closeTrailer(){
  document.getElementById('trailer').src="";
  document.getElementById('play-trailer').style.display="none";
}