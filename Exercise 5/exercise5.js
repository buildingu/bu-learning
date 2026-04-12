function formValidator(firstName, lastName, age, phoneNumber) {
    if (firstName === undefined) 
        return "The firstName input is missing.";
    if (lastName === undefined) 
        return "The lastName input is missing.";
    if (age === undefined) 
        return "The age input is missing.";
    if (phoneNumber === undefined) 
        return "The phoneNumber input is missing.";

    if (typeof firstName !== "string")
        return `The firstName should be a string.`;
    if (typeof lastName !== "string")
        return `The lastName should be a string.`;
    if (typeof phoneNumber !== "string")
        return `The phoneNumber should be a string.`;

    if (typeof age !== "number") 
        return "The age should be a number.";

    if (age < 18) 
        return "Sorry, not old enough for our app.";

    return "WELCOME TO THE ADOS APP.";
}