getMovie();
var movieName = "";

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
  date = new Date(response.release_date);
  console.log();
  genreList = getGenre(response.genres);
  getBackground(backgroundUrlId);
  document.getElementById(
    "movie-poster"
  ).innerHTML = `<img class="m-5" src="${posterUrlId}" height="500rem">`;
  print = `<span>${date.toLocaleDateString(
    "en-GB"
  )}<i class="bi bi-dot"></i>${genreList}<i class="bi bi-dot"></i>${
    response.runtime
  }</span>`;
  movieName = response.original_title;
  document.getElementById("movie-title").innerHTML = movieName;
  document.getElementById("movie-line1").innerHTML = print;
  displayRating(
    response.vote_average
  );
  document.getElementById(
    "movie-tag-line"
  ).innerHTML = `<p class="fs-6"><i>${response.tagline}</i></p>`;
  document.getElementById("movie-overview").innerHTML = response.overview;
  getCastAndCrew(response.id);
  getReviews(response.id);
}
//gets the cast and crew from the movie id and forwards for display
function getCastAndCrew(id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDBhZjU4OTQzZjhiYzg2M2U1ZGM2ZWEyMDBkZWMzYSIsInN1YiI6IjY0OWIxNmQ2N2UzNDgzMDBhY2MzYTI2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TrFh8ToM1aVvdqNZHZK_KPoWHr_pYcy8OFWvmPqnt_s",
    },
  };

  fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    options
  )
    .then((response) => response.json())
    .then(displayCastAndCrew)
    .catch((err) => console.error(err));
}
//displays the cast and crew of the movie
function displayCastAndCrew(response) {
  let printCrew = `<div class="row">`;
  console.log(response);
  for (let i = 1; i <= 12; i++) {
    printCrew += `<div class="col me-3 my-3"><h6>${response.crew[i].name}</h6><span>${response.crew[i].department}</span></div>`;
    if (i % 3 == 0) printCrew += `</div><div class="row">`;
  }
  printCrew += `</div>`;
  document.getElementById("movie-crew").innerHTML = printCrew;
  let printCast = "";
  for (let j = 0; j < 10; j++) {
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
// gets the reviews of the movie by calling the concerned api
function getReviews(id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDBhZjU4OTQzZjhiYzg2M2U1ZGM2ZWEyMDBkZWMzYSIsInN1YiI6IjY0OWIxNmQ2N2UzNDgzMDBhY2MzYTI2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TrFh8ToM1aVvdqNZHZK_KPoWHr_pYcy8OFWvmPqnt_s",
    },
  };

  fetch(`https://api.themoviedb.org/3/movie/${id}/reviews`, options)
    .then((response) => response.json())
    .then(displayReviews)
    .catch((err) => console.error(err));
}
//display the reviews of the movie
function displayReviews(response) {
  console.log(response);
  let print = "";
  let author = "";
  let rating = "";
  if(response.results.length == 0)
    print = `<p>We don't have any reviews for ${movieName}`;
  else{
    if(response.results[0].author != null)
    author = response.results[0].author;
  else
    author = response.results[0].author_details.username;
  if(response.results[0].author_details.rating != null)
    rating = `<i class="bi bi-star-fill me-1"></i>${response.results[0].author_details.rating}`;
  print = `<div class="border rounded-2 shadow ms-2 mb-4">
            <div class="ms-4 mt-4 d-flex align-items-center">
            <img class="rounded-circle me-4" width="75rem" src="https://www.themoviedb.org/t/p/w300_and_h300_face${response.results[0].author_details.avatar_path}">
            <div>
              <h5>A review by ${author}<span class="badge bg-dark ms-2">${rating}</span></h5>
              <p class="text-secondary">Written by ${author} on </p>
            </div>
            </div>
            <div class="ms-5"><p class="ms-5 overview" style="font-size:0.87rem;">${response.results[0].content}</p></div>
          </div>
          <div class="ms-3 mb-4"><a href="#" id="all-review-link">Read All Reviews</a></div>`;
  }
  document.getElementById('review-discussion-view').innerHTML = print;
}
//display the movie rating
function displayRating(rating) {
  rating = Math.floor(rating * 10);
  console.log(rating);
  if (rating > 70)
    bg = `background: 
    radial-gradient(closest-side, white 79%, transparent 80% 100%),
    conic-gradient(green ${rating}%, gray 0)`;
  else if (rating > 50)
    bg = `background: 
  radial-gradient(closest-side, white 79%, transparent 80% 100%),
  conic-gradient(yellow ${rating}%, gray 0)`;
  else
    bg = `background: 
  radial-gradient(closest-side, white 79%, transparent 80% 100%),
  conic-gradient(red ${rating}%, gray 0)`;
  let print = `<div class="progress-bar" style="${bg}">${rating}%<progress value="${rating}" min="0" max="100" style="visibility:hidden;height:0;width:0;"></progress></div>`;
  document.getElementById('movie-rating').innerHTML = print;
}
