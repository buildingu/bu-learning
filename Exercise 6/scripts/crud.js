const form = document.getElementById("validationForm");

function formValidator(first, last, age, sex, position) {
    let valid = true;
    const inputs = [
        { name: "first name", value: first, type: "string"},
        { name: "last name", value: last, type: "string"},
        { name: "age", value: age, type: "number"},
        { name: "sex", value: sex, type: "string"},
        { name: "position", value: position, type: "string"}
    ]
    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].value === "" || inputs[i].value === null) {
            valid = false;
            return `The ${inputs[i].name} is empty`;
        }
        if (/\d/.test(first) || /\d/.test(last)) {
            return "Names cannot contain numbers";
        }
    }
    const parseAge = parseInt(age);
    if (isNaN(parseAge)) {
        return "Age must be a number";
    }
    if (parseAge < 18) {
        return "You must be at least 18 years old to use this app.";
    }
    if(valid) {
        return "WELCOME TO THE ADOS APP.";
    }
}
function addUser(first, last, age, sex, position) {
    const userData = document.getElementById("userData");

    // Create a new container div for this user's info
    const newCol = document.createElement("div");
    newCol.classList.add("col-4");
    newCol.classList.add("align-center");

    // Create and populate the <p> elements
    const fname = document.createElement("p");
    fname.textContent = `First Name: ${first}`;

    const lname = document.createElement("p");
    lname.textContent = `Last Name: ${last}`;

    const userAge = document.createElement("p");
    userAge.textContent = `Age: ${age}`;

    const userSex = document.createElement("p");
    userSex.textContent = `Sex: ${sex}`;

    const userPos = document.createElement("p");
    userPos.textContent = `Position: ${position}`;

    const editBtn = document.createElement("button");
    editBtn.id = "editBtn";
    editBtn.textContent = "Edit";
    const deleteBtn = document.createElement("button");
    deleteBtn.id = "deleteBtn";
    deleteBtn.textContent = "Delete";

    // Append <p> tags inside the new column div
    newCol.appendChild(fname);
    newCol.appendChild(lname);
    newCol.appendChild(userAge);
    newCol.appendChild(userSex);
    newCol.appendChild(userPos);
    newCol.appendChild(editBtn);
    newCol.appendChild(deleteBtn);

    // Append the new column div inside the container
    userData.appendChild(newCol);
    form.reset();

    document.getElementById("deleteBtn").addEventListener("click", function() {
        userData.removeChild(newCol);
    });
    document.getElementById("editBtn").addEventListener("click", function() {
        edit(first, last, age, sex, position, form);
    });
}
function edit(first, last, age, sex, position, form) {
    form.querySelector("#fname").value = first;
    form.querySelector("#lname").value = last;
    form.querySelector("#age").value = age;
    form.querySelector("#sex").value = sex;
    form.querySelector("#position").value = position;

}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const first = document.getElementById("fname").value;
    const last = document.getElementById("lname").value;
    const age = document.getElementById("age").value;
    const sex = document.getElementById("sex").value;
    const position = document.getElementById("position").value;
    const message = document.getElementById("message");
    
    const result = formValidator(first, last, age, sex, position);
    
    if(result === "WELCOME TO THE ADOS APP.") {
        addUser(first, last, age, sex, position);
        message.textContent = null;
    } else {
        message.textContent = result;
        message.style.color = "red";
    }
});