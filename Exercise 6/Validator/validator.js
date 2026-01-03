function formValidator(event) {
    event.preventDefault();

    let firstName = document.getElementById("first-name").value.trim();
    let lastName = document.getElementById("last-name").value.trim();
    let age = document.getElementById("age").value.trim();
    let phoneNum = document.getElementById("phone").value.trim();

    let errors = [];
    // First name
    if (firstName === "") {
        errors.push("First name is missing");
    }

    // Last name
    if (lastName === "") {
        errors.push("Last name is missing");
    }
    
    // Age
    if (age === "") {
        errors.push("Age is missing");
    }
    else if (isNaN(Number(age))) {
        errors.push("Age should be a number");
    }
    else if (Number(age) < 18) {
        errors.push("Sorry, not old enough");
    }
    
    // Phone number
    if (phoneNum === "") {
        errors.push("Phone number is missing")
    }
    else if (typeof phoneNum !== "string") {
        errors.push("Phone number should be a string");
    }


    if (errors.length === 0) {
        alert("Welcome")
    } else {
        alert(errors)
    }
}