const fetchBtn = document.getElementById('fetch-pokemon-btn');
const pokemonDisplay = document.getElementById('pokemon-display');

pokemonDisplay.innerHTML = `
    <div class="welcome-message">
        Welcome to PokeFinder! Click the button above to discover a random Pokemon.
    </div>
`;

fetchBtn.addEventListener('click', async () => {
    fetchBtn.disabled = true;
    fetchBtn.textContent = 'Searching...';
    
    pokemonDisplay.innerHTML = `
        <div class="loading">
            Catching Pokemon...
        </div>
    `;
    
    try {

        const randomId = Math.floor(Math.random() * 1025) + 1;
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        
        const pokemon = await response.json();
        
        displayPokemon(pokemon);
        
    } catch (error) {
        console.error('Error fetching Pokemon:', error);
        pokemonDisplay.innerHTML = `
            <div class="error">
                Failed to fetch Pokemon! Please try again.
            </div>
        `;
    } finally {
        fetchBtn.disabled = false;
        fetchBtn.textContent = 'Get Random Pokemon';
    }
});

function displayPokemon(pokemon) {
    const typeElements = pokemon.types.map(typeInfo => 
        `<span class="type-badge">${typeInfo.type.name}</span>`
    ).join('');
    
    const statsRows = pokemon.stats.map(stat => `
        <div class="stat-row">
            <span class="stat-name">${formatStatName(stat.stat.name)}:</span>
            <span class="stat-value">${stat.base_stat}</span>
        </div>
    `).join('');
    
    pokemonDisplay.innerHTML = `
        <div class="pokemon-content">
            <div class="pokemon-image">
                <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" 
                     alt="${pokemon.name}">
            </div>
            <div class="pokemon-info">
                <h2 class="pokemon-name">${pokemon.name}</h2>
                <div class="pokemon-stats">
                    <h3>Base Stats:</h3>
                    ${statsRows}
                </div>
                <div class="pokemon-details">
                    <p><strong>Pokedex #:</strong> ${pokemon.id}</p>
                    <p><strong>Height:</strong> ${pokemon.height} dm</p>
                    <p><strong>Weight:</strong> ${pokemon.weight} hg</p>
                    <p><strong>Type:</strong> <span class="pokemon-type">${typeElements}</span></p>
                </div>
            </div>
        </div>
    `;
}

function formatStatName(statName) {
    const statMap = {
        'hp': 'HP',
        'attack': 'Attack',
        'defense': 'Defense',
        'special-attack': 'Special Attack',
        'special-defense': 'Special Defense',
        'speed': 'Speed'
    };
    
    return statMap[statName] || statName;
}