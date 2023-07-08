getMovie();

function getMovie(){
    let id = localStorage.getItem('movieId');

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDBhZjU4OTQzZjhiYzg2M2U1ZGM2ZWEyMDBkZWMzYSIsInN1YiI6IjY0OWIxNmQ2N2UzNDgzMDBhY2MzYTI2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TrFh8ToM1aVvdqNZHZK_KPoWHr_pYcy8OFWvmPqnt_s'
        }
      };
      
      fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
        .then(response => response.json())
        .then(displayMovie)
        .catch(err => console.error(err));
    
}
function displayMovie(response){
    console.log(response);
    document.title = response.original_title + " - The Movie Database (TMDB)";
    urlId = `https://image.tmdb.org/t/p/original${response.backdrop_path}`;
    document.getElementById('main-section').style.backgroundImage= `url(${urlId})`;
}