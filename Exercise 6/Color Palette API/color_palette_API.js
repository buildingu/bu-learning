const generatePaletteBtn = document.getElementById("generateColors");
const colorPaletteDiv = document.querySelector(".colorPicker");

async function fetchAndDisplayPalette() {
    colorPaletteDiv.textContent = "Loading new palette...";

    try {
        const targetUrl = "hhttps://colormagic.app/api/palette/search?q={searchQuery}&format=json";
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
        const response = await fetch(proxyUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        colorPaletteDiv.innerHTML = ""; 

        data.forEach(color => { 
            const colorBlock = document.createElement("div");
            colorBlock.className = "color-block flex-0";
            colorBlock.style.backgroundColor = `#${color.hex}`; 
            colorBlock.textContent = `#${color.hex}`;
            colorPaletteDiv.appendChild(colorBlock);
        });

    } catch (error) {
        console.error("Error fetching color palette:", error);
        colorPaletteDiv.textContent = "Error generating Color Palettes. Please try again later.";
    }
}

generatePaletteBtn.addEventListener('click', fetchAndDisplayPalette);

document.addEventListener('DOMContentLoaded', fetchAndDisplayPalette);