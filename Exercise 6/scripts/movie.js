const apiKey = "00a594c5a93a7b1195ada0151decac83";
const search = document.getElementById("searchBar");
const errorDiv = document.getElementById("error");
const movieData = document.getElementById("movies");

function getMovieData() {
    if(search.value === null || search.value.trim() == "") {
        errorDiv.innerHTML = `<p class='errorText'>Enter a movie name</p>`;
        return;
    }
    const apiURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search.value.trim()}`;
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        movieData.innerHTML = data.results.map(movie => `
            <div class='col-4 movieCard'>
                <h3>${movie.title}</h3>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                style='width: 300px; margin-bottom: 10px;'>
                <p class='w-75'>${movie.overview}</p>
            </div>
            `).join('');
            console.log(JSON.stringify(data, null, 2));
    })
    .catch(err => {
        errorDiv.innerHTML = `<p class='errorText'>${err.message}</p>`;
    });
}