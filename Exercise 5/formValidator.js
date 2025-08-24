function formValidator(firstName, lastName, age, phoneNumber) {
    const errors = [];

    if (!firstName) errors.push("The first name input is missing.");
    if (!lastName) errors.push("The last name input is missing.");
    if (!phoneNumber) errors.push("The phone number input is missing.");
    if (age == null) errors.push("The age input is missing.");

    if (firstName && typeof firstName !== "string") errors.push("The first name should be a string.");
    if (lastName && typeof lastName !== "string") errors.push("The last name should be a string.");
    if (phoneNumber && typeof phoneNumber !== "string") errors.push("The phone number should be a string.");
    if (age != null && typeof age !== "number") errors.push("The age should be a number.");

    if (typeof age === "number" && age < 18) errors.push("Sorry, not old enough for our app.");

    if (errors.length > 0) 
        {
            errors.forEach(e => console.log(e));
        } 
    else 
        {
            console.log("WELCOME TO THE ADOS APP.");
        }
    }