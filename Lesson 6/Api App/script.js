const jokeBtn = document.getElementById("jokeBtn");
const jokeDisplay = document.getElementById("jokeDisplay");

jokeBtn.addEventListener("click", getJoke);

function getJoke() {

  jokeDisplay.textContent = "Loading joke... 😂";

  fetch("https://v2.jokeapi.dev/joke/Any?safe-mode")
    .then(response => response.json())
    .then(data => {

      if (data.type === "single") {
        jokeDisplay.textContent = data.joke;
      } 
      else {
        jokeDisplay.textContent = `${data.setup} 😂 ... ${data.delivery}`;
      }

    })
    .catch(error => {
      jokeDisplay.textContent = "Failed to load joke 😢";
      console.log(error);
    });
}