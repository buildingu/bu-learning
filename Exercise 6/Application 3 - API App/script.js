const fetchJokeButton = document.getElementById("fetchJokeButton");
const displayJoke = document.getElementById("displayJoke");

fetchJokeButton.addEventListener("click", () => {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(response => response.json())
    .then(data => {
      displayJoke.innerHTML = `
        <p>${data.setup}</p>
        <br>
        <p>${data.punchline}</p>
      `;
    })
    .catch(() => {
      displayJoke.textContent = "Failed to fetch joke data.";
    });
});
