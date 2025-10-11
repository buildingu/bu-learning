function addEmployee(event) {

    event.preventDefault()

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const sex = document.getElementById("sex").value.trim();
    const pos = document.getElementById("position").value.trim();

    const newEntry = document.createElement("div")
    newEntry.innerHTML = `
    <p class="name" font-style=bold>${name}</p>
    <p class="age">Age: ${age}</p>
    <p class="sex">Sex: ${sex}</p>
    <p class="position">Position: ${pos}</p>
    <button class="delButton">delete</button>
    <button class="editButton">edit</button>
    `;

    //delete
    const delButton = newEntry.querySelector(".delButton")
    delButton.addEventListener("click", function () {
        employees.removeChild(newEntry)
    })

    //edit
    const editButton = newEntry.querySelector(".editButton")
    editButton.addEventListener("click", function () {
        document.getElementById("name").value = newEntry.querySelector(".name").textContent;
        document.getElementById("age").value = newEntry.querySelector(".age").textContent.replace("Age: ", "");
        document.getElementById("sex").value = newEntry.querySelector(".sex").textContent.replace("Sex: ", "");
        document.getElementById("position").value = newEntry.querySelector(".position").textContent.replace("Position: ", "");

    // Optional: remove entry if you want the user to resubmit after editing
        document.getElementById("employees").removeChild(newEntry);
    })


    document.getElementById("employees").appendChild(newEntry)
    
}