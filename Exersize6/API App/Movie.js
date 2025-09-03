const result = document.getElementById("result")
const searchButton = document.getElementById("submit")
let monsters = [];

// Load monsters
async function loadMonsters() {
    const response = await fetch('https://mhw-db.com/monsters');
    monsters = await response.json();

    console.log(monsters);
}

// Search function
function searchMonster() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    result.innerHTML = "";

    for (let i = 0; i < monsters.length; i++) {
        if (monsters[i].name.toLowerCase() === query) {
            return `
                <h1> Name: ${monsters[i].name} </h1> 
                Type: ${monsters[i].type}
                Species: ${monsters[i].species}
            `;
        }
    }
    return "Monster not found!";
}

// Event listener
searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    const output = searchMonster();
    result.innerHTML = output;
});

// Load monsters on start
loadMonsters();
