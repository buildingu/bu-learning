function formValidator(firstName,lastName,age,phoneNumber) {
    // store the parameters in an array
    let userInputs = [firstName,lastName,age,phoneNumber];
    
    // create an array to store the names of each parameter to be referenced
    let inputNames = ["first name","last name","age","phone number"];

    // use a boolean to flag whether or not all parameters are present
    let continueFunction = true; // set to true initially; only changed to false when an error is present

    // create a constant to denote the index of age in the array, which is 2
    const ageIndex = 2;

    // check each index of the array and see if any is missing
    for(let i=0; i<userInputs.length; i++) {
        if (!userInputs[i]) {
            console.log(`${inputNames[i]} is missing.`);
            // set the boolean to false
            continueFunction = false;
        }
    }

    // check the data type of each with typeof
    for(let i=0; i<userInputs.length; i++) {
        // check if the index is at age
        if(i===ageIndex) {
            // if the parameter at the age index is not a number
            if(typeof(userInputs[i]) !== "number") {
                // set the continue boolean to false
                continueFunction=false;

                // can also access the ageIndex-th index of inputNames in console.log()
                console.log("the age parameter should be a number.");
            }
        }
        // if it isn't at the age index, check for a string
        else {
            // if it's not a string
            if(typeof(userInputs[i]) !== "string") {
                // set the boolean variable to false
                continueFunction=false;
                
                // access the i-th index of inputNames in console.log()
                console.log(`${inputNames[i]} should be of type string.`);
            }
        }
    }

    // check the age of the user
    if(typeof(age) === "number" && age<18) {
        console.log("Sorry, you're not old enough to use the app.");
        continueFunction=false;
    }

    // check the state of the continueFunction variable; should only say welcome if true
    if(continueFunction) {
        console.log("Welcome to the ADOS App.");
    }
}