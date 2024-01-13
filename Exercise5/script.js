function formValidator(first, last, age, number) {
    
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

    if (age < 18){
        console.log("Sorry, not old enough for our app.")
        return 0;
    }

    console.log("WELCOME TO THE ADOS APP!");
    
}

formValidator("Om", "Gautam", 18, "123-456-7890")