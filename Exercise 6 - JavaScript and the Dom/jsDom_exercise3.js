input = document.querySelector("#Input");
button = document.querySelector("#search_button");
div = document.querySelector("#display_details");

button.addEventListener("click", () =>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${input.value}`)
    .then(response => {
        if (!response.ok){
            throw new Error("Could not fetch resource");
        }
        return response.json();
    })
    .then(data => printDetail(data.weight))
    .catch(error => console.error(error));
})

function printDetail(data){
    info = document.createElement("p");
    info.textContent = data;
    div.appendChild(info);
}