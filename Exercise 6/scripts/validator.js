function formValidator(first, last, age, phone) {
    let valid = true;
    const inputs = [
        { name: "first name", value: first, type: "string"},
        { name: "last name", value: last, type: "string"},
        { name: "age", value: age, type: "number"},
        { name: "phone", value: phone, type: "string"}
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

const form = document.getElementById("validationForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const first = document.getElementById("fname").value;
    const last = document.getElementById("lname").value;
    const age = document.getElementById("age").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message");

    const result = formValidator(first, last, age, phone);
    message.textContent = result;

    if(result === "WELCOME TO THE ADOS APP.") {
        message.style.color = "green";
    } else {
        message.style.color = "red";
    }
});