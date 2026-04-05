function formValidator(firstName, lastName, age, phoneNumber){
    let isAllowed = true;
    let emptyVars = []
    if (firstName === undefined){
        emptyVars.push("First name");
        isAllowed = false;
    }
    if (lastName === undefined){
        emptyVars.push("Last name");
        isAllowed = false;
    }
    if (age === undefined){
        emptyVars.push("Age");
        isAllowed = false;
    }
    if (phoneNumber === undefined){
        emptyVars.push("Phone number");
        isAllowed = false;
    }

    if (emptyVars.length > 0){
        console.log(`Please enter the following parameters as they are missing: ${emptyVars}`);
    }

    if (typeof firstName !== "string"){
        if (firstName !== undefined){
        console.log("The first name should be a string"); }
        isAllowed = false;
    }
    if (typeof lastName !== "string"){
        if (lastName !== undefined){
        console.log("The last name should be a string");}
        isAllowed = false;
    }
    if (typeof phoneNumber !== "string"){
        if (phoneNumber !== undefined){
        console.log("The phone number should be a string");}
        isAllowed = false;
    }
    if (!Number.isFinite(age)){
        if (age !== undefined){
        console.log("The age should be a number");}
        isAllowed = false;
    }
    else{
        if (age < 18){
            console.log("Sorry, not old enough for our app.");
            isAllowed = false;
        }
    }
    if (isAllowed){
        console.log("WELCOME TO THE ADOS APP.");
    }
}

formValidator();