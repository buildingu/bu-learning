const jokeDiv = document.getElementById("joke");
const getJokeBtn = document.getElementById("getJoke");
const shareBtn = document.getElementById("shareBtn");
const overlay = document.getElementById("overlay");
const closeOverlay = document.getElementById("closeOverlay");

// Get a random joke
getJokeBtn.addEventListener("click", async () => {
  try {
    const res = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });
    const data = await res.json();
    jokeDiv.textContent = data.joke;
  } catch (err) {
    jokeDiv.textContent = "Failed to fetch joke. Try again!";
  }
});

// Share button
shareBtn.addEventListener("click", shareJoke);

function shareJoke() {
  const jokeText = jokeDiv.textContent;

  if (!jokeText || jokeText.includes("Click the button")) {
    alert("Generate a joke first!");
    return;
  }

  // Copy to clipboard
  navigator.clipboard.writeText(jokeText).then(() => {
    updateShareLinks(jokeText);
    overlay.style.display = "flex";
  })
}

function updateShareLinks(joke) {
  const encoded = encodeURIComponent(joke);

  document.getElementById("twitterShare").href = `https://twitter.com/intent/tweet?text=${encoded}`;
  document.getElementById("facebookShare").href = `https://www.facebook.com/sharer/sharer.php?u=&quote=${encoded}`;
  document.getElementById("linkedinShare").href = `https://www.linkedin.com/sharing/share-offsite/?url=https://example.com&summary=${encoded}`;
  document.getElementById("whatsappShare").href = `https://wa.me/?text=${encoded}`;
  document.getElementById("telegramShare").href = `https://t.me/share/url?url=https://example.com&text=${encoded}`;
}

closeOverlay.addEventListener("click", () => {
  overlay.style.display = "none";
});
