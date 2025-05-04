async function getPokemon(){
    
    let pokemonName = document.getElementById("pokemon_name").value.toLowerCase()

    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        if(!response.ok){
            throw new Error("Could not find resource")
        }
        const json = await response.json()
    console.log(json)
    let PokemonSprite = json.sprites.front_default
    let PokemonType = json.types.map(typeInfo => typeInfo.type.name).join(", ")
    let PokemonWeight = json.weight
    let PokemonNumber = json.id
    let PokemonAbility = json.abilities.map(aInfo => aInfo.ability.name).join(", ")
    let PokemonShiny = json.sprites.front_shiny
    let PokemonImage = document.getElementById("pokemonSprite")
    let Name = document.getElementById("Pokemon")
    let Type = document.getElementById("Type")
    let Weight = document.getElementById("Weight")
    let Number = document.getElementById("Number")
    let Ability = document.getElementById("Ability")

    const randomChance = Math.random()
    const shinyChance = 0.03

    if(randomChance < shinyChance){
        PokemonImage.src = PokemonShiny
       
    }
    else{
        PokemonImage.src = PokemonSprite;
    
       

    }
     PokemonImage.style.display = "block"


   
    Name.innerHTML= pokemonName.charAt(0).toUpperCase()+pokemonName.slice(1)
    Type.innerHTML = "Type: " + PokemonType
    Type.style.display = "block"
    //Weight.innerHTML = "Weight: "+ PokemonWeight
    //Weight.style.display = "block"
    Number.innerHTML = "Pokedex #: " + PokemonNumber
    Number.style.display = "block"
    Ability.innerHTML = "Abilities: " + PokemonAbility
    Ability.style.display = "block"

    }
    
    catch(error){
        console.error(error.message)

    }
}