const btn = document.getElementById('getAdvice');
const adviceDiv = document.getElementById('advice');

btn.addEventListener('click', async () => {
  adviceDiv.textContent = 'Loading...';
  try {
    const res = await fetch('https://api.adviceslip.com/advice');
    const data = await res.json();
    adviceDiv.textContent = data.slip.advice;
  } catch (err) {
    adviceDiv.textContent = 'Failed to fetch advice';
    console.error(err);
  }
});