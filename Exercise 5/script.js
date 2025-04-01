function formValidator(first, last, age, number) {
    // Check if any input is missing
    if (typeof(first) === "undefined"){
        console.log("The first name input is missing.");
        return 0;
    }
    if (typeof(last) === "undefined"){
        console.log("The last name input is missing.");
        return 0;
    }
    if (typeof(age) === "undefined"){
        console.log("The age input is missing.");
        return 0;
    }
    if (typeof(number) === "undefined"){
        console.log("The phone number input is missing.");
        return 0;
    }

    // Check if inputs are of the correct type
    if (typeof(first) !== "string"){
        console.log("The first name should be a string.");
        return 0;
    }
    if (typeof(last) !== "string"){
        console.log("The last name should be a string.");
        return 0;
    }
    if (typeof(age) !== "number"){
        console.log("The age input should be a number.");
        return 0;
    }
    if (typeof(number) !== "string"){
        console.log("The phone number should be a string.");
        return 0;
    }

    // Check if the user is old enough
    if (age < 18){
        console.log("Sorry, not old enough for our app.");
        return 0;
    }

    // If everything is valid
    console.log("WELCOME TO THE ADOS APP!");
}

// Example usage
formValidator("Om", "Gautam", 22, "1234567890");
