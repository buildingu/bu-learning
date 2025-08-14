function formValidator(firstName, lastName, age, phoneNumber) {
    // Store parameter names and values in an object for easy reference
    const inputs = {
        "first name": firstName,
        "last name": lastName,
        "age": age,
        "phone number": phoneNumber
    };

    // 1. Check for missing parameters
    for (let key in inputs) {
        if (inputs[key] === undefined || inputs[key] === null || inputs[key] === "") {
            console.log(`The ${key} input is missing.`);
            return;
        }
    }

    // 2. Data type validation
    const stringParams = ["first name", "last name", "phone number"];
    for (let param of stringParams) {
        if (typeof inputs[param] !== "string") {
            console.log(`The ${param} should be a string.`);
            return;
        }
    }
    if (typeof inputs["age"] !== "number") {
        console.log(`The age should be a number.`);
        return;
    }

    // 3. Age check
    if (inputs["age"] < 18) {
        console.log("Sorry, not old enough for our app.");
        return;
    }

    // 4. Success message
    console.log("WELCOME TO THE ADOS APP.");
}

// Example usage:
formValidator("John", "Doe", 20, "123-456-7890"); 
// Outputs: WELCOME TO THE ADOS APP.
