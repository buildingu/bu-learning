const searchBtn = document.getElementById('m-search');
const inputField = document.getElementById('m-input');

async function fetchMovie() {
    const title = inputField.value;
    const apiKey = "YOUR_API_KEY";
    //// Link to get your own API key to test: https://www.omdbapi.com/apikey.aspx

    if (!title) {
        alert("Please enter a movie title.");
        return;
    }

    const existingResult = document.getElementById('dynamic-result');
    if (existingResult) existingResult.remove();

    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`);           
        const data = await response.json();

        if (response.status === 401) {
            alert("API Key Error: Your key is either incorrect or hasn't been activated via email yet.");
            return;
        }


        if (data.Response === "True") {
            const resultCard = document.createElement('div');
            resultCard.id = "dynamic-result";
            resultCard.className = "user-card"; 
            resultCard.style.marginTop = "30px";
            resultCard.style.textAlign = "center";

            resultCard.innerHTML = `
                <img src="${data.Poster}" style="width: 100%; max-width: 300px; border-radius: 8px;">
                <h2 style="color: #000080; margin: 15px 0 5px 0;">${data.Title}</h2>
                <p><strong>Director:</strong> ${data.Director}</p>
                <p><strong>Rating:</strong> <span style="color: #f39c12;">★ ${data.imdbRating}</span></p>
            `;

            document.body.appendChild(resultCard);
        } else {
            alert("Movie not found!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Could not connect to the movie database.");
    }
}

searchBtn.addEventListener('click', fetchMovie);