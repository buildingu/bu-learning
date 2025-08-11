let btn = document.getElementById("submit");


btn.addEventListener("click", addEntry);

function addEntry() {
    const name = document.getElementById("name");
    const age = document.getElementById("age");
    const sex = document.getElementById("sex");
    const position = document.getElementById("position");

    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <p class="1" >Name: ${name.value}</p>
    <p class="2" >Age: ${age.value}</p>
    <p class="3" >Sex: ${sex.value}</p>
    <p class="4">Position: ${position.value}</p>
    `;

    //Delete
    const newDelete = document.createElement("button");
    newDelete.innerText = "Delete";
    newDelete.addEventListener("click", function () {
        newDiv.remove();
    });

    //Edit
    const newEdit = document.createElement("button");
    newEdit.innerText = "Edit";
    newEdit.addEventListener("click", function () {
        alert("Edit your values in the form");
        name.value = newDiv.getElementsByClassName("1").textContent.replace("Name: ", "");
        age.value = newDiv.getElementsByClassName("2").textContent.replace("Age: ", "");
        sex.value = newDiv.getElementsByClassName("3").textContent.replace("Sex: ", "");
        position.value = newDiv.getElementsByClassName("4").textContent.replace("Position: ", "");
    });


    newDiv.appendChild(newEdit)
    newDiv.appendChild(newDelete);
    document.body.appendChild(newDiv);
}


