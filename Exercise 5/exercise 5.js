function formValidator(firstName, lastName, age, phoneNumber) {

    if (!firstName) {
        return "The first name input is missing.";
    }

    if (!lastName) {
        return "The last name input is missing.";
    }

    if (!age && age !== 0) {
        return "The age input is missing.";
    }

    if (!phoneNumber) {
        return "The phone number input is missing.";
    }

    if (typeof firstName !== "string") {
        return "The first name should be a string.";
    }

    if (typeof lastName !== "string") {
        return "The last name should be a string.";
    }

    if (typeof phoneNumber !== "string") {
        return "The phone number should be a string.";
    }

    if (typeof age !== "number") {
        return "The age should be a number.";
    }

    if (age < 18) {
        return "Sorry, not old enough for our app.";
    }

    return "WELCOME TO THE ADOS APP.";
}

console.log("Node is working!!!");

console.log(formValidator("Sweetha", "Manikandan", 25, "1234567890"));

console.log(formValidator("Sweetha", "", 25, "1234567890"));

console.log(formValidator("Sweetha", "Manikandan", 16, "1234567890"));

console.log(formValidator("Sweetha", "Manikandan", "25", "1234567890"));