// palette.js

/* === API CALL FUNCTION === */

async function fetchColorPalettes(query) {
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const apiUrl = `https://colormagic.app/api/palette/search?q=${encodeURIComponent(query)}`;
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    return await response.json();
}

/* === ELEMENT CREATION FUNCTIONS === */

/* Create Tooltip */
function createTooltip() {
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.textContent = 'Click to copy';
    return tooltip;
}
/* Create Color Box */
function createColorBox(color) {
    const colorBox = document.createElement('div');
    colorBox.className = 'color-box';
    colorBox.style.backgroundColor = color;
    colorBox.setAttribute('data-color', color);
    
    // Add tooltip  
    const tooltip = createTooltip();
    colorBox.appendChild(tooltip);
    
    // Add individual color click to copy functionality
    colorBox.addEventListener('click', () => {
        navigator.clipboard.writeText(color);
        tooltip.textContent = 'Copied!';
        setTimeout(() => {
            tooltip.textContent = 'Click to copy';
        }, 2000);
    });
    
    return colorBox;
}
/* Create Copy all button */
function createCopyAllButton(palette) {
    const copyAllBtn = document.createElement('button');
    copyAllBtn.className = 'copy-all-btn';
    copyAllBtn.textContent = 'Copy All Hex Codes';
    copyAllBtn.addEventListener('click', () => {
        const allColors = palette.colors.join(' ');
        navigator.clipboard.writeText(allColors);
        
        // Show feedback
        const originalText = copyAllBtn.textContent;
        copyAllBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyAllBtn.textContent = originalText;
        }, 2000);
    });
    return copyAllBtn;
}
/* Create palette element */
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
    
    // Add copy all button
    const copyAllBtn = createCopyAllButton(palette);

    paletteDiv.append(title, colorsDiv, copyAllBtn);
    return paletteDiv;
}
/* Display palettes */
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

/* === UTILITY FUNCTIONS === */

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

/* Initialize the function when the user enters a query */
document.getElementById('paletteForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const color = document.getElementById('query').value;
    /* Loading Animation Triggers synced to function call */
    showLoadingAnim();
    getColorPalettes(color).then(() => {
        hideLoadingAnim();
    });
});