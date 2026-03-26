function formValidator(firstName, lastName, age, phoneNumber) {
    let isValid = true;

    age = Number(age);
    phoneNumber = Number(phoneNumber);

    if (firstName.trim() === "") {
        console.log("The name input is missing.");
        isValid = false;
    }
    if (lastName.trim() === "") {
        console.log("The last name input is missing.");
        isValid = false;
    }
    if (age === "") {
        console.log("The age input is missing.");
        isValid = false;
    }
    if (phoneNumber === "") {
        console.log("The phone number input is missing.");
        isValid = false;
    }

    if (typeof firstName !== "string") {
        console.log("The first name should be a string.");
        isValid = false;
    }
    if (typeof lastName !== "string") {
        console.log("The last name should be a string.");
        isValid = false;
    }
    if (typeof age !== "number") {
        console.log("The age should be a number.");
        isValid = false;
    }
    if (typeof phoneNumber !== "number") {
        console.log("The phone number should be a number.");
        isValid = false;
    }

    if (age < 18) {
        console.log("Sorry, not old enough for our app.");
        isValid = false;
    }

    if (isValid) {
        console.log("WELCOME TO THE ADOS APP.");
    }
}