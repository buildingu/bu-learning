const pokemonInfoTable = document.getElementById("pokemonInfoTable");
const pokemonImgElement = document.getElementById("pokemonImg");
const pokemonNameElement = document.getElementById("pokemonName");
const pokemonWeightElement = document.getElementById("pokemonWeight");
const pokemonHeightElement = document.getElementById("pokemonHeight");
const pokemonIdElement = document.getElementById("pokemonId");


async function fetchData() {
    try{
        const pokemonSearchName = document.getElementById("pokemonSearch").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSearchName}`);

        //Throwing an error if pokemon isn't found
        if(!response.ok) {
            alert("Pokemon not found");
            throw new Error("Couldn't fetch the data");
        }

        const data = await response.json();

        console.log(data)

        //Getting data from JSON
        const pokemonImg = data.sprites.front_default;
        const pokemonName = data.name;
        const pokemonWeight = data.weight;
        const pokemonHeight = data.height;
        const pokemonId = data.id;
        

        //Executing
        pokemonImgElement.src = pokemonImg;
        pokemonNameElement.innerHTML = pokemonName.toUpperCase();
        pokemonWeightElement.innerHTML = pokemonWeight;
        pokemonHeightElement.innerHTML = pokemonHeight;
        pokemonIdElement.innerHTML = pokemonId;
        pokemonInfoTable.style.display = "block";
    }
    catch(error) {
        console.error(error);
    }

}