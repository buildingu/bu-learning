const button = document.getElementById("fetchCat");
const catDiv = document.getElementById("catDisplay");

function launchPawConfetti() {
  const confettiContainer = document.createElement("div");
  confettiContainer.style.position = "fixed";
  confettiContainer.style.top = 0;
  confettiContainer.style.left = 0;
  confettiContainer.style.width = "100%";
  confettiContainer.style.height = "100%";
  confettiContainer.style.pointerEvents = "none";
  confettiContainer.style.overflow = "hidden";
  document.body.appendChild(confettiContainer);

  const pawEmojis = ["🐾", "🐱", "😸", "😺"];

  for (let i = 0; i < 30; i++) {
    const paw = document.createElement("div");
    paw.textContent = pawEmojis[Math.floor(Math.random() * pawEmojis.length)];
    paw.style.position = "absolute";
    paw.style.fontSize = `${12 + Math.random() * 18}px`;
    paw.style.top = "-20px";
    paw.style.left = `${Math.random() * 100}%`;
    paw.style.opacity = Math.random() * 0.8 + 0.2;
    paw.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiContainer.appendChild(paw);

    const fall = paw.animate(
      [
        { transform: `translateY(0px) rotate(${Math.random()*360}deg)`, opacity: paw.style.opacity },
        { transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random()*720}deg)`, opacity: 0 }
      ],
      {
        duration: 3000 + Math.random() * 2000,
        iterations: 1,
        easing: "ease-out"
      }
    );

    fall.onfinish = () => paw.remove();
  }

  setTimeout(() => confettiContainer.remove(), 5000);
}

button.addEventListener("click", () => {
  const catImg = document.createElement("img");
  catImg.src = `https://cataas.com/cat?random=${Date.now()}`;
  catImg.alt = "Random Cat";
  catDiv.innerHTML = "";
  catDiv.appendChild(catImg);
  launchPawConfetti();
});
