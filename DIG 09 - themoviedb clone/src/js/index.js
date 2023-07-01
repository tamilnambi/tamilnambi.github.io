const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

var moviesMenuVisibility = false;
var tvshowMenuVisibility = false;
var peopleMenuVisibility = false;

function changeMoviesMenu(){
    if(moviesMenuVisibility == false)
    {
        document.getElementById('movies-menu').style.display = "block";
        moviesMenuVisibility = true;
    }
    else
    {
        document.getElementById('movies-menu').style.display = "none";
        moviesMenuVisibility = false;
    }
}

function changeTVShowsMenu(){
    if(tvshowMenuVisibility == false)
    {
        document.getElementById('tvshows-menu').style.display = "block";
        tvshowMenuVisibility = true;
    }
    else
    {
        document.getElementById('tvshows-menu').style.display = "none";
        tvshowMenuVisibility = false;
    }
}

function changePeopleMenu(){
    if(peopleMenuVisibility == false)
    {
        document.getElementById('people-menu').style.display = "block";
        peopleMenuVisibility = true;
    }
    else
    {
        document.getElementById('people-menu').style.display = "none";
        peopleMenuVisibility = false;
    }
}