function formValidator(firstName, lastName, age, phoneNumber) {

    const user = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        phoneNumber: phoneNumber
    };

    let errors = [];

    /* Missing */
    if (user.firstName === "" || user.firstName === undefined || user.firstName === null) {
        errors.push("The first name is missing.");
    }
    if (user.lastName === "" || user.lastName === undefined || user.lastName === null) {
        errors.push("The last name is missing.");
    }
    if (user.age === "" || user.age === undefined || user.age === null) {
        errors.push("The age is missing.");
    }
    if (user.phoneNumber === "" || user.phoneNumber === undefined || user.phoneNumber === null) {
        errors.push("The phone number is missing.");
    }

    /* Type */
    if (typeof user.firstName !== "string") {
        errors.push("The first name should be a string.");
    }
    if (typeof user.lastName !== "string") {
        errors.push("The last name should be a string.");
    }
    if (typeof user.age !== "number" || Number.isNaN(user.age)) {
        errors.push("The age should be a number.");
    }
    if (typeof user.phoneNumber !== "string") {
        errors.push("The phone number should be a string.");
    }

    /* Empty string checks */
    if (typeof user.firstName === "string" && user.firstName.trim() === "") {
        errors.push("The first name cannot be blank.");
    }
    if (typeof user.lastName === "string" && user.lastName.trim() === "") {
        errors.push("The last name cannot be blank.");
    }
    if (typeof user.phoneNumber === "string" && user.phoneNumber.trim() === "") {
        errors.push("The phone number cannot be blank.");
    }

    /* Conditions */
    if (typeof user.age === "number" && !Number.isNaN(user.age) && user.age < 18) {
        errors.push("Sorry, not old enough for our app.");
    }

    if (errors.length === 0) {
        console.log("WELCOME TO THE ADOS APP.");
    } else {
        console.log("Errors:", errors);
    }

    return errors;
}