const btn = document.getElementById("btn");
const imgContainer = document.getElementById("container");

const fetchData = async() => {

    try{

        let response = await fetch('https://picsum.photos/500/500/?blur=2');
        
        let image = `<img src=${response.url}>`

        imgContainer.innerHTML = image;

    }catch(error){
        console.log(error);
    }

}

btn.addEventListener("click", fetchData);
