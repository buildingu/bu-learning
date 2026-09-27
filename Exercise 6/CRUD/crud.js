const btn = document.getElementById("button");

const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const sexInput = document.getElementById("sex");
const positionInput = document.getElementById("position");

const output = document.getElementById("output");
const formMessage = document.getElementById("formMessage");


btn.addEventListener("click", addItem);


function validateInput(name, age, sex, position) {

    if (!name || !age || !sex || !position) {
        return "All fields are required.";
    }

    if (age < 18) {
        return "Sorry, not old enough for our app.";
    }

    return "";
}


function addItem(event) {

    event.preventDefault();

    const name = nameInput.value;
    const age = Number(ageInput.value);
    const sex = sexInput.value;
    const position = positionInput.value;

    const message = validateInput(name, age, sex, position);

    if (message !== "") {
        formMessage.textContent = message;
        formMessage.style.color = "red";
        return;
    }


    const employeeBox = document.createElement("div");


  
    const nameText = document.createElement("p");
    nameText.textContent = "Name: " + name;


    const ageText = document.createElement("p");
    ageText.textContent = "Age: " + age;


   
    const sexText = document.createElement("p");
    sexText.textContent = "Sex: " + sex;

    const positionText = document.createElement("p");
    positionText.textContent = "Position: " + position;


    const editButton = document.createElement("button");
    editButton.textContent = "Edit";


    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    editButton.addEventListener("click", function() {
        nameInput.value = name;
        ageInput.value = age;
        sexInput.value = sex;
        positionInput.value = position;
        employeeBox.remove();
    });
    deleteButton.addEventListener("click", function() {

        employeeBox.remove();

    });

    
    employeeBox.appendChild(nameText);
    employeeBox.appendChild(ageText);
    employeeBox.appendChild(sexText);
    employeeBox.appendChild(positionText);
    employeeBox.appendChild(editButton);
    employeeBox.appendChild(deleteButton);


   
    output.appendChild(employeeBox);


  
    nameInput.value = "";
    ageInput.value = "";
    sexInput.value = "";
    positionInput.value = "";
}