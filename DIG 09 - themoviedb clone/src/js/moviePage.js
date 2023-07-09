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
    print = `<h1 class="ms-3 mt-5 text-light">${response.original_title}</h1><div class="ms-3 text-light"><span>${response.release_date}<i class="bi bi-dot"></i>${genreList}</span><i class="bi bi-dot"></i>${response.runtime}</div>`;
    document.getElementById('movie-data').innerHTML = print;
}
// gets the genre object array and returns the genre names as a string
function getGenre(genreList){
    let arrayForGenreNames = [];
    for(let i=0;i<genreList.length;i++)
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
