const spellContainer = document.querySelector('#spell-container');
const spellGeneratorBtn = document.querySelector('#generate-spell-button');

async function fetchData() {
  try {
    const response = await fetch(
      'https://potterapi-fedeperin.vercel.app/en/spells/random',
    );

    if (!response.ok) {
      throw new Error('Could not fetch resource');
    }
    const data = await response.json();
    console.log(data);

    spellContainer.innerText = `Spell: ${data.spell} \n Use: ${data.use}`;
  } catch (error) {
    console.log(error);
  }
}
