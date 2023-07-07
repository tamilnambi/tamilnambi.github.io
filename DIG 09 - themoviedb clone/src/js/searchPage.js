let moviesList = new Object();
let movieItems = 0;
let tvShowsList = new Object();
let tvShowsItems = 0;
let peopleList = new Object();
let peopleItems = 0;
getTitle();
getResults();

function getTitle() {
  let searchItem = localStorage.getItem("searchString");
  document.title = searchItem + " - The Movie Database (TMDB)";
}
function getResults() {
  let searchItem = localStorage.getItem("searchString");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDBhZjU4OTQzZjhiYzg2M2U1ZGM2ZWEyMDBkZWMzYSIsInN1YiI6IjY0OWIxNmQ2N2UzNDgzMDBhY2MzYTI2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TrFh8ToM1aVvdqNZHZK_KPoWHr_pYcy8OFWvmPqnt_s",
    },
  };

  fetch(
    `https://api.themoviedb.org/3/search/multi?query=${searchItem}&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .then(displayResults)
    .catch((err) => console.error(err));
}
function displayResults(response) {
  console.log(response);
  for (let i = 0; i < response.results.length; i++) {
    if (response.results[i].media_type == "movie") {
      moviesList[movieItems] = response.results[i];
      movieItems++;
    }
    if (response.results[i].media_type == "tv") {
      tvShowsList[tvShowsItems] = response.results[i];
      tvShowsItems++;
    }
    if (response.results[i].media_type == "person") {
      peopleList[peopleItems] = response.results[i];
      peopleItems++;
    }
  }
  document.getElementById("tvShows-no").innerHTML = tvShowsItems;
  document.getElementById("movies-no").innerHTML = movieItems;
  document.getElementById("people-no").innerHTML = peopleItems;

  displayTvShows();
}
function displayTvShows() {
  var print = "";
  let date = null;
  if (tvShowsItems == 0) {
    print = "<div>There are no TV Shows that matched your query.</div>";
  } else {
    for (let i in tvShowsList) {
      date = convertDateFormat(tvShowsList[i].first_air_date);
      print += `<div class="d-flex border rounded-2 mb-4"><img class="rounded-start" src="https://image.tmdb.org/t/p/w500${tvShowsList[i].poster_path}" onerror="this.src='../src/img/default-pic.png'" height="180rem"><div><h6 class="ms-3 mt-3">${tvShowsList[i].name}</h6><p class="text-secondary ms-3 mt-2">${date}</p><p class="ms-3 mt-3 overview">${tvShowsList[i].overview}</p></div></div>`;
    }
  }
  document.getElementById("results").innerHTML = print;
  document.getElementById("search-tvshow-div").style.backgroundColor =
    "lightgrey";
  document.getElementById("search-movie-div").style.backgroundColor = "white";
  document.getElementById("search-people-div").style.backgroundColor = "white";
}
function displayMovies() {
  var print = "";
  let date = null;
  if (movieItems == 0) {
    print = "<div>There are no Movies that matched your query.</div>";
  } else {
    for (let i in moviesList) {
      date = convertDateFormat(moviesList[i].release_date);
      print += `<div class="d-flex border rounded-2 mb-4"><img class="rounded-start" src="https://image.tmdb.org/t/p/w500${moviesList[i].poster_path}" onerror="this.src='../src/img/default-pic.png'" height="180rem"><div><h6 class="ms-3 mt-3">${moviesList[i].title}</h6><p class="text-secondary ms-3 mt-2">${date}</p><p class="ms-3 mt-3 overview">${moviesList[i].overview}</p></div></div>`;
    }
  }
  document.getElementById("results").innerHTML = print;
  document.getElementById("search-tvshow-div").style.backgroundColor = "white";
  document.getElementById("search-movie-div").style.backgroundColor =
    "lightgrey";
  document.getElementById("search-people-div").style.backgroundColor = "white";
}
function displayPeople() {
  console.log(peopleList);
  var print = "";
  if (peopleItems == 0) {
    print = "<div>There are no Persons that matched your query.</div>";
  } else {
    let date = null;
    let url = null;
    for (let i in peopleList) {
      if (peopleList[i].profile_path == null)
        url = "../src/img/default-person.png";
      else url = `https://image.tmdb.org/t/p/w500${peopleList[i].profile_path}`;
      print += `<div class="d-flex rounded-2 mb-4"><img class="rounded" src="${url}" height="75rem"><div><h6 class="ms-3 mt-3">${peopleList[i].name}</h6><p class="text-secondary ms-3 mt-2">${peopleList[i].known_for_department}</p></div></div>`;
    }
  }
  document.getElementById("results").innerHTML = print;
  document.getElementById("search-tvshow-div").style.backgroundColor = "white";
  document.getElementById("search-movie-div").style.backgroundColor = "white";
  document.getElementById("search-people-div").style.backgroundColor =
    "lightgrey";
}
function convertDateFormat(dateToConvert) {
  const day = new Date(dateToConvert);
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

  const newDate =
    day.getDate() + " " + m[day.getMonth()] + " " + day.getFullYear();
  return newDate;
}
