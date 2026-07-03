const appendAlert = (message, type) => {
    const alertPlaceholder = document.getElementById('alert')
    alertPlaceholder.innerHTML = '' // Clear previous alerts
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')
    alertPlaceholder.append(wrapper)
}

const AppendResults = (picture, title, cost) => {
    const resultsPlaceholder = document.getElementById('results')
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="col-sm-6 mb-3 mb-sm-0">`,
        `   <div class="card" style="width: 18rem;">`,
        `       <img src="${picture}" class="card-img-top" alt="${title}">`,
        `       <div class="card-body">`,
        `           <h5 class="card-title">${title}</h5>`,
        `           <p class="card-text">$${cost}</p>`,
        `       </div>`,
        `   </div>`,
        `</div>`
    ].join('')
    resultsPlaceholder.append(wrapper)
}
const btn = document.getElementById("Search");
btn.addEventListener("click", async function(event) {
    event.preventDefault();
    const Name = document.getElementById("Name").value;
    
    
    
    if (Name === "") {
        appendAlert('Game Name is required.', 'danger')
        event.preventDefault();
    }
    else{
        try {
            const encodedName = encodeURIComponent(Name);
            const response = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${encodedName}`);
            const data = await response.json();
            
            console.log("API Response:", data);
            
            document.getElementById("results").innerHTML = "";
            if (data.length === 0) {
                appendAlert('Game not found.', 'danger')
            }
            else {
                for (const game of data.slice(0, 5)) { // Limit to first 5 results
                    console.log("Game Data:", game);
                    AppendResults(game.thumb, game.external, game.cheapest);
                }   
                appendAlert('Game found successfully.', 'success')
                // Clear input after successful search
                document.getElementById("Name").value = "";
            }
        } catch (error) {
            console.error("Error:", error);
            appendAlert('Error searching game.', 'danger')
        }
    }    
});
