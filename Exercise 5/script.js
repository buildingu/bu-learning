function formValidator(firstName, lastName, age, phoneNumber) {
    if (!firstName) {
        return "The first name input is missing.";
    }

    if (typeof firstName !== 'string') {
        return "The first name should be a string.";
    }

    if (!lastName) {
        return "The last name input is missing.";
    }
    if (typeof lastName !== 'string') {
        return "The last name should be a string.";
    }

    if (typeof age !== 'number') {
        return "The age should be a number.";
    }
    if (age < 18) {
        return "Sorry, not old enough for our app.";
    }

    if (!phoneNumber) {
        return "The phone number input is missing.";
    }
    if (typeof phoneNumber !== 'string') {
        return "The phone number should be a string.";
    }

    return "WELCOME TO THE ADOS APP.";
}

console.log(formValidator("John", "Doe", 25, "1234567890"));
console.log(formValidator("Johnson", "Smith", 35, "1234567890"));
console.log(formValidator("", "Jay", 23, "1234567890"));
console.log(formValidator("Jay", "", 23, "1234567890"));
console.log(formValidator("Alice", "Smith", "twenty", "1234567890"));
console.log(formValidator("Alice", "Smith", 20, ""));
console.log(formValidator("Bob", "Dough", 17, "1234567890")); 
