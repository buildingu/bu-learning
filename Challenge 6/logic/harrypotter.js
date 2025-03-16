function getCharacterData(){
    const searchBar = document.getElementById('searchBar');
    const characterName = searchBar.value.trim();
    const characterCard = document.getElementById('characterCard');
    const errorDiv = document.getElementById('error');

    characterCard.innerHTML = '';
    errorDiv.innerHTML = '';

    if (!characterName) {
        errorDiv.innerHTML = 'Please enter a character name.';
        return;
    }

    characterCard.innerHTML = '<p>Loading...</p>';

    fetch('https://hp-api.onrender.com/api/characters')
        .then(response => response.json())
        .then(data => {
            const characters = data.filter(character =>
                character.name.toLowerCase().includes(characterName.toLowerCase())
            );

            if(characters.length === 0){
                errorDiv.innerHTML = 'No character found with that name.';
                return;
            }

            const character = characters[0];

            characterCard.innerHTML = `
                <div class="character">
                    <h2>${character.name}</h2>
                    <p><strong>House:</strong> ${character.house || 'Unknown'}</p>
                    <p><strong>Species:</strong> ${character.species || 'Unknown'}</p>
                    <p><strong>Gender:</strong> ${character.gender || 'Unknown'}</p>
                    <p><strong>Date of Birth:</strong> ${character.dateOfBirth|| 'Unknown'}</p>
                    <p><strong>Patronus:</strong> ${character.patronus || 'Unknown'}</p>
                    <p><strong>Ancestry:</strong> ${character.ancestry || 'Unknown'}</p>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            errorDiv.innerHTML = 'An error occurred while fetching data.';
        });
}