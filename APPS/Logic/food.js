async function fetchImage() {
    try {
        const response = await fetch('https://foodish-api.com/api/');
        const data = await response.json();
        const imageUrl = data.image;

        const imageContainer = document.getElementById('image-container');
        imageContainer.innerHTML = `<img src="${imageUrl}" alt="Random Food Dish">`;
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}