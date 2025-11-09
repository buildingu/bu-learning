function formValidator(event) {
    event.preventDefault();

    let firstName = document.getElementById("first-name").value.trim();
    let lastName = document.getElementById("last-name").value.trim();
    let age = document.getElementById("age").value.trim();
    let phoneNum = document.getElementById("phone").value.trim();

    if (firstName === "") {
        alert("First name is missing");
        return;
    }
    else if (lastName === "") {
        alert("Last name is missing");
        return;
    }
    else if (age === "") {
        alert("Age is missing");
        return;
    }
    
    else if (phoneNum === "") {
        alert("Phone number is missing")
        return;
    }

    else if (typeof firstName !== "string") {
        alert("First name should be a string");
        return;
    }
    else if (typeof lastName !== "string") {
        alert("Last name should be a string");
        return;
    }
    else if (typeof phoneNum !== "string") {
        alert("Phone number should be a string");
        return;
    }

    else if (age < 18) {
        alert("Sorry, not old enough");
        return;
    }

    else {
        alert("Ur welcome!!!");
    }
}