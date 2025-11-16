const button = document.getElementById("getAdviceBtn");
const adviceBox = document.getElementById("adviceBox");

button.addEventListener("click", () => {
    fetch("https://api.adviceslip.com/advice")
        .then(res => res.json())
        .then(data => {
            adviceBox.textContent = `"${data.slip.advice}"`;
        })
        .catch(error => {
            adviceBox.textContent = "Something went wrong. Try again.";
            console.error(error);
        });
});
