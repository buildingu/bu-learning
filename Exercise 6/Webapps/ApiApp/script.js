document.getElementById("getAdvice").addEventListener("click", async () => {
  const adviceBox = document.getElementById("adviceBox");
  adviceBox.textContent = "Loading...";

  try {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    adviceBox.textContent = `"${data.slip.advice}"`;
  } catch (error) {
    adviceBox.textContent = "Oops! Could not fetch advice.";
  }
});

