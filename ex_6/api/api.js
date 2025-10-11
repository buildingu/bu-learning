
function genBook(event) {

    event.preventDefault()

    const query = encodeURIComponent(document.getElementById("userInput").value.trim())

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`).then(response => response.json())
    .then(data => {
        const output=document.getElementById("output")
        output.textContent = "";

        if (!data.items || data.items.length === 0){
            output.textContent = "No Book Found"
            return
        }

        data.items.forEach(book => {
            const info = book.volumeInfo

            const bookRes = document.createElement("div")
            bookRes.innerHTML = `
                <h3>${info.title}</h3>
                <p class="author">Author(s): ${info.authors?.join(", ") || "unknown"}</p>
                <p class="sex">Date Published: ${info.publishedDate || "unknown"}</p>
                <p class="position">Description: ${info.description || "unknown"}</p>
            `;
            output.appendChild(bookRes)

        })
    })
    .catch(error =>{
        document.getElementById("output").textContent = "Encountered Error"
    }
    )
}

