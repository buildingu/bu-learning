const fetchBtn = document.getElementById('fetchBtn');
const displayDiv = document.getElementById('displayDiv');

function getDogPhoto() {
    
    
    // Fetch 
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            
            // Create image element
            const img = document.createElement('img');
            img.src = data.message;
            
            // Clear div and add image
            displayDiv.innerHTML = '';
            displayDiv.appendChild(img);
            
        })
}

fetchBtn.addEventListener('click', 
    function() {
        getDogPhoto();
    }
);