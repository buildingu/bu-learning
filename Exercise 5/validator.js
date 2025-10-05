function formValidator(firstName, lastName, age, phoneNumber) {
    const inputs = {
        "First Name": firstName,
        "Last Name": lastName,
        "Age": age,
        "Phone Number": phoneNumber
    };

    for (const key in inputs) {
        if (inputs[key] === undefined || inputs[key] === null || inputs[key] === '') {
            console.log(`The ${key.toLowerCase()} input is missing.`);
            return;
        }
    }

    if (typeof firstName !== "string") {
        console.log("The first name should be a string/words.");
        return;
    }
    if (typeof lastName !== "string") {
        console.log("The last name should be a string/words.");
        return;
    }
    if (typeof age !== "number") {
        console.log("The age should be a number.");
        return;
    }
    if (typeof phoneNumber !== "string") {
        console.log("The phone number should be a string.");
        return;
    }
    if (age < 18) {
        console.log("Sorry, not old enough for our app ^_^");
        return;
    }

    console.log("WELCOME TO THE ADOS APP.");
} 

// attempting to test the function...:)
formValidator("Yasmina", "Al Shawa", 19, "1111111");
