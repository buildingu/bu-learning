const movie = document.getElementById("movie-name");
const movieForm = document.getElementById("movie-form");
const movieDetails = document.getElementById("movie-details");
const movieBox = document.getElementById("movie-box");

movieForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const movieName = movie.value;
    try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${movieName}`);
        const data = await response.json(); 
        if (data.length > 0) {
            const movie = data[0].show; 
            displayMovieDetails(movie);
        } else {
            movieDetails.innerHTML = "<p>No movie found.</p>";
        }    
    } catch (error) {
        console.error("Error fetching movie details:", error);
        movieDetails.innerHTML = "<p>Error fetching movie details. Please try again later.</p>";
    }
});

function displayMovieDetails(movie) {
    movieDetails.style.display = "block";
    movieBox.innerHTML = `
        <h2>${movie.name}</h2>
        <img src="${movie.image ? movie.image.medium : 'default_image.jpg'}" alt="${movie.name}">
        <p>${movie.summary}</p>
        <p class="rating">Rating: ${movie.rating.average}</p>    
        <p class="genres">Genres: ${movie.genres.join(", ")}</p>    
    `;
}
