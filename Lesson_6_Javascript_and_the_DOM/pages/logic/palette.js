// palette.js

/**
 * Fetches color palettes from the ColorMagic API
 * @param {string} query - The color to search for
 * @returns {Promise<Array>} - Array of palette objects
 */
async function fetchColorPalettes(query) {
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const apiUrl = `https://colormagic.app/api/palette/search?q=${encodeURIComponent(query)}`;
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    return await response.json();
}

function createColorBox(color) {
    const colorBox = document.createElement('div');
    colorBox.className = 'color-box';
    colorBox.style.backgroundColor = color;
    colorBox.title = color;
    return colorBox;
}

function createPaletteElement(palette) {
    const paletteDiv = document.createElement('div');
    paletteDiv.className = 'palette';
    
    const title = document.createElement('h3');
    title.textContent = palette.text;
    
    const colorsDiv = document.createElement('div');
    colorsDiv.className = 'color-container';
    
    // Create and append color boxes
    palette.colors.forEach(color => {
        colorsDiv.appendChild(createColorBox(color));
    });
    
    paletteDiv.append(title, colorsDiv);
    return paletteDiv;
}

function displayPalettes(palettes) {
    const container = document.getElementById('paletteContainers');
    container.innerHTML = ''; // Clear previous results
    
    if (!palettes || palettes.length === 0) {
        container.innerHTML = '<p>No palettes found. Try a different color!</p>';
        return;
    }
    
    palettes.forEach(palette => {
        container.appendChild(createPaletteElement(palette));
    });
}

/* Handles errors by displaying them in the container */
function handleError(error) {
    console.error("Error:", error.message);
    const container = document.getElementById('paletteContainers');
    container.innerHTML = `<p class="error">Error loading palettes: ${error.message}</p>`;
}

/* Show/hide loading animation */
function showLoadingAnim() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'block';
    }
}
function hideLoadingAnim() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'none';
    }
}

/* Main function to get and display color palettes */
async function getColorPalettes(color) {
    try {
        const palettes = await fetchColorPalettes(color);
        displayPalettes(palettes);
    } catch (error) {
        handleError(error);
    }
}

/* Initialize the function when the user enters a color */
document.getElementById('paletteForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const color = document.getElementById('query').value;
    /* Loading Animation Triggers synced to function call */
    showLoadingAnim();
    getColorPalettes(color).then(() => {
        hideLoadingAnim();
    });
});