// button to generate a random image
const btn=document.getElementById("getDog");

// container for the image
const container=document.getElementById("imageContainer");

// event listener for the button and function for when it's clicked
btn.addEventListener("click", async () =>{
    // fetch a random image
    try {
        const response=await fetch("https://dog.ceo/api/breeds/image/random");
        const data=await response.json();
        container.innerHTML=`<img src="${data.message}" alt="Random Dog">`;
    }
    // handling errors
    catch(error){
        container.innerHTML=`<p>Error fetching image. Try again.</p>`;
    }
});