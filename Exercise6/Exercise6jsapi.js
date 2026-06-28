const getQuoteBtn = document.getElementById("getQuoteBtn");
const quoteDisplay = document.getElementById("quoteDisplay");
console.log(document.body.scrollHeight);
console.log(document.documentElement.scrollHeight);
console.log(window.innerHeight);

getQuoteBtn.addEventListener('click', function() {
    fetch("https://dummyjson.com/quotes/random")
        .then(response => response.json())
        .then(data => {
            quoteDisplay.textContent = data.quote + "" + " - " + data.author;
    })
    .catch(error => {
        quoteDisplay.textContent = "Sorry, the quote didn't load. Try again!";
        console.log(error)
    });
});