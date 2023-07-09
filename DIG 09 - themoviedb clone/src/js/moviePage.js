getMovie();

function getMovie() {
  let id = localStorage.getItem("movieId");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDBhZjU4OTQzZjhiYzg2M2U1ZGM2ZWEyMDBkZWMzYSIsInN1YiI6IjY0OWIxNmQ2N2UzNDgzMDBhY2MzYTI2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TrFh8ToM1aVvdqNZHZK_KPoWHr_pYcy8OFWvmPqnt_s",
    },
  };

  fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
    .then((response) => response.json())
    .then(displayMovie)
    .catch((err) => console.error(err));
}
function displayMovie(response) {
  console.log(response);
  let print = "";
  document.title = response.original_title + " - The Movie Database (TMDB)";
  backgroundUrlId = `https://image.tmdb.org/t/p/original${response.backdrop_path}`;
  posterUrlId = `https://image.tmdb.org/t/p/w500${response.poster_path}`;
  genreList = getGenre(response.genres);
  getBackground(backgroundUrlId);
  document.getElementById(
    "movie-poster"
  ).innerHTML = `<img class="m-5" src="${posterUrlId}" height="500rem">`;
  print = `<span>${response.release_date}<i class="bi bi-dot"></i>${genreList}<i class="bi bi-dot"></i>${response.runtime}</span>`;
  document.getElementById("movie-title").innerHTML = response.original_title;
  document.getElementById("movie-line1").innerHTML = print;
  document.getElementById("movie-tag-line").innerHTML = `<p class="fs-6"><i>${response.tagline}</i></p>`;
  document.getElementById("movie-overview").innerHTML = response.overview;
  getCastAndCrew(response.id);
}
//gets the cast and crew from the movie id and forwards for display
function getCastAndCrew(id){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDBhZjU4OTQzZjhiYzg2M2U1ZGM2ZWEyMDBkZWMzYSIsInN1YiI6IjY0OWIxNmQ2N2UzNDgzMDBhY2MzYTI2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TrFh8ToM1aVvdqNZHZK_KPoWHr_pYcy8OFWvmPqnt_s'
        }
      };
      
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
        .then(response => response.json())
        .then(displayCastAndCrew)
        .catch(err => console.error(err));
}
//displays the cast and crew of the movie
function displayCastAndCrew(response){
    let printCrew=`<div class="row">`;
    console.log(response);
    for(let i=1;i<=12;i++)
    {
        printCrew += `<div class="col me-3 my-3"><h6>${response.crew[i].name}</h6><span>${response.crew[i].department}</span></div>`;
        if(i%3 == 0)
            printCrew += `</div><div class="row">`;

    }
    printCrew += `</div>`;
    document.getElementById("movie-crew").innerHTML = printCrew;
    let printCast = "";
    for(let j=0;j<10;j++)
    {
        printCast += `<div class="border rounded me-2 shadow-sm"><img class="rounded-top" src="https://image.tmdb.org/t/p/w500${response.cast[j].profile_path}" width="150rem"><h6 class="fw-bold ps-1 pt-1">${response.cast[j].name}</h6><p class="font-mini ps-1">${response.cast[j].character}</p></div>`;
    }
    document.getElementById("movie-cast").innerHTML = printCast;
}
// gets the genre object array and returns the genre names as a string
function getGenre(genreList) {
  let arrayForGenreNames = [];
  for (let i = 0; i < genreList.length; i++)
    arrayForGenreNames.push(genreList[i].name);
  return arrayForGenreNames.toString();
}
//sets the background image and the dominant color of the image on top of it
function getBackground(urlId) {
  const colorThief = new ColorThief();
  const img = new Image();
  var color;
  img.crossOrigin = "Anonymous";
  let googleProxyURL =
    "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";
  img.src = googleProxyURL + encodeURIComponent(urlId);
  img.addEventListener("load", function () {
    var color = colorThief.getColor(img);
    console.log(color);
    document.getElementById(
      "main-section"
    ).style.backgroundImage = `url(${urlId})`;
    document.getElementById("movie-details").style.backgroundColor =
      "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", 0.75)";
  });
}
