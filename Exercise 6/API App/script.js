const factButton = document.getElementById("factButton");
const factDisplay = document.getElementById("factDisplay");

factButton.addEventListener("click", getDogFact);

function getDogFact() {
  fetch("https://dogapi.dog/api/v2/facts")
    .then(response => response.json())
    .then(data => {
      factDisplay.textContent = data.data[0].attributes.body;
    })
    .catch(error => {
      console.error(error);
    });
}