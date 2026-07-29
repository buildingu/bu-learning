const apiButton = document.getElementById("apiButton")
const responseDiv = document.getElementById("apiResponse")

apiButton.addEventListener("click", fetchBrewery);

async function fetchBrewery() {
    apiButton.disabled = true;
    responseDiv.innerHTML = "Loading...";
    try {
        const response = await fetch("https://api.openbrewerydb.org/v1/breweries/random");
        if (!response.ok) {
            throw new Error("Could not get a brewery");
        }
        responseDiv.classList.remove("error");
        const data = await response.json();
        renderBrewery(data[0]);
    } catch (error) {
        responseDiv.classList.add("error");
        responseDiv.innerHTML = "Error: " + error.message;
    } finally {
        apiButton.disabled = false;
    }
}

function renderBrewery(brewery) {
    responseDiv.innerHTML = "";
    const name = document.createElement("h2");
    name.textContent = brewery.name;
    const type = document.createElement("p");
    type.textContent = `Type: ${brewery.brewery_type}`;
    const country = document.createElement("p");
    country.textContent = `Country: ${brewery.country}`;
    const city = document.createElement("p");
    city.textContent = `City: ${brewery.city}`;
    const location = document.createElement("p");
    const address = brewery.address_1 || brewery.address_2;
    location.textContent = `Location: ${address || "Location unknown"}`;
    responseDiv.appendChild(name);
    responseDiv.appendChild(type);
    responseDiv.appendChild(country);
    responseDiv.appendChild(city);
    responseDiv.appendChild(location);
    if (brewery.website_url) {
        const link = document.createElement("a");
        link.href = brewery.website_url;
        link.textContent = "Visit website";
        link.target = "_blank";
        responseDiv.appendChild(link);
    } else {
        const noWebsite = document.createElement("p");
        noWebsite.textContent = "No website available";
        responseDiv.appendChild(noWebsite);
    }
}