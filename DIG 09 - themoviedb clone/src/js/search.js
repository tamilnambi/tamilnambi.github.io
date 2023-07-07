let showSearchBar = false;
function startSearchByDiv(){
    let searchItem = document.getElementById('search-div-input').value;
    localStorage.setItem('searchString',searchItem);
    window.location.href = "search.html";
}
function toggleSearchBar(){
    if(showSearchBar == false)
    {
        document.getElementById('search-field').style.display = "block";
        document.getElementById('search-btn').innerHTML = `<i class="bi bi-x-lg text-light"></i>`;
        showSearchBar = true;
        getTrending();
    }
    else
    {
        document.getElementById('search-field').style.display = "none";
        document.getElementById('search-btn').innerHTML = `<i class="bi bi-search text-primary"></i>`;
        showSearchBar = false;
    }
}
function getTrending(){
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDBhZjU4OTQzZjhiYzg2M2U1ZGM2ZWEyMDBkZWMzYSIsInN1YiI6IjY0OWIxNmQ2N2UzNDgzMDBhY2MzYTI2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TrFh8ToM1aVvdqNZHZK_KPoWHr_pYcy8OFWvmPqnt_s'
        }
      };
      
      fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
        .then(response => response.json())
        .then(showTrending)
        .catch(err => console.error(err));

}
function showTrending(response){
    let print = `<div class="d-flex py-2"><i class="bi bi-graph-up-arrow ms-3"></i><h6 class="ms-3 pt-1">Trending</h6></div>`;
    let searchItems = [];
    for(let i = 0; i<10;i++)
    {
        if(response.results[i].media_type == "tv")
            searchItems.push(response.results[i].name);
        else if(response.results[i].media_type == "movie")
            searchItems.push(response.results[i].title);  
        print +=   `<div class="d-flex py-1 search-suggestions"><i class="bi bi-search ms-3"></i><span class="ms-3" onclick="startSearchByBar('${searchItems[i]}')">${searchItems[i]}</span></div>`;
    }
    console.log(searchItems);
    document.getElementById('suggestions').innerHTML = print;
}
function startSearchByBar(searchItem){
    localStorage.setItem('searchString',searchItem);
    window.location.href = "search.html";
}