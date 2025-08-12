const generatePaletteBtn = document.getElementById("generateColors");
const colorPaletteDiv = document.getElementById("messageDiv");
const input = document.getElementById("search-box"); // Assuming you have a search box with this ID

async function fetchAndDisplayPalette() {
    const searchQuery = input.value; // Get the value from the search box
    if (!searchQuery) {
        colorPaletteDiv.textContent = "Please enter a search term.";
        return;
    }
    
    colorPaletteDiv.textContent = "Loading new palette...";

    try {
        const targetUrl = `https://colormagic.app/api/palette/search?q=${searchQuery}&format=json`;
        const response = await fetch(targetUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        colorPaletteDiv.innerHTML = ""; 

        if (data.length === 0) {
            colorPaletteDiv.textContent = "No palettes found.";
            return;
        }

        data.forEach(color => { 
            const colorBlock = document.createElement("div");
            colorBlock.className = "color-block flex-0";
            colorBlock.style.backgroundColor = color.hex; 
            colorBlock.textContent = color.hex;
            colorPaletteDiv.appendChild(colorBlock);
        });

    } catch (error) {
        console.error("Error fetching color palette:", error);
        colorPaletteDiv.textContent = "Error generating Color Palettes. Please try again later.";
    }
}

generatePaletteBtn.addEventListener('click', fetchAndDisplayPalette);