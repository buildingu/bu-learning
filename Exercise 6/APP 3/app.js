/*
  API App — Advice Slip (no API key required)
  - HTML has only a button + div
  - Fetches random advice when button clicked
*/
async function getAdvice(){
  const out = document.getElementById('output');
  out.textContent = 'Fetching advice...';
  try{
    const res = await fetch('https://api.adviceslip.com/advice', { cache: 'no-store' });
    if(!res.ok) throw new Error('Network error: ' + res.status);
    const data = await res.json();
    out.textContent = '“' + data.slip.advice + '”';
  }catch(err){
    out.textContent = 'Something went wrong. Please try again.';
    console.error(err);
  }
}

document.getElementById('getAdvice').addEventListener('click', getAdvice);
