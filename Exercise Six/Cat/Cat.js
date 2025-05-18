function fetchCat() {
    const statusInput = document.getElementById('statusInput');
    const catImage = document.getElementById('catImage');
    const errorMessage = document.getElementById('errorMessage');
    const statusCode = statusInput.value;

    // Clear previous error message
    errorMessage.textContent = '';

    // Validate input
    if (!statusCode || statusCode < 100 || statusCode > 599) {
        errorMessage.textContent = 'Please enter a valid HTTP status code (100-599)';
        catImage.style.display = 'none';
        return;
    }

    // Show loading state
    catImage.src = '';
    catImage.style.display = 'none';
    errorMessage.textContent = 'Loading...';

    // Create image object to test if the image exists
    const img = new Image();
    img.onload = function() {
        catImage.src = img.src;
        catImage.style.display = 'block';
        errorMessage.textContent = '';
    };
    
    img.onerror = function() {
        errorMessage.textContent = `No cat image available for status code ${statusCode}`;
        catImage.style.display = 'none';
    };

    img.src = `https://http.cat/${statusCode}`;
}

// Add event listener for Enter key
document.getElementById('statusInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchCat();
    }
});
