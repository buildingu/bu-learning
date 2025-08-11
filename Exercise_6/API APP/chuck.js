const btn = document.getElementById("fetchData");
const joke = document.getElementById("joke");

const fetchData = async()=>{

    try{
        const response = await fetch("https://geek-jokes.sameerkumar.website/api?format=json");
        let text = await response.json();
        console.log(text.joke);
        joke.innerHTML= text.joke;
    }
    catch(error){

        console.log(error);
    
    }

}
btn.addEventListener("click", fetchData)