function formValidator(fName, lastName, age, pNumber) {


    let isValid = true;


    if (!fName) {
        console.log("The name input is missing.");
        isValid = false;
    } else if (typeof fName !== 'string') {
        console.log("The first Name should be a string.");
        isValid = false;
    }

    if (!lastName) {
        console.log("The last name input is missing.");
        isValid = false;
    } else if (typeof lastName !== 'string') {
        console.log("The last Name should be a string.");
        isValid = false;
    }


    if (!age) {
        console.log("The age input is missing.");
        isValid = false;
    } else if (typeof age !== 'number') {
        console.log("The age should be a number.");
        isValid = false;
    } else if (age < 18) {
        console.log("Sorry, not old enough for our app.");
        isValid = false;
    }


    if (!pNumber) {
        console.log("The phone number input is missing.");
        isValid = false;
    } else if (typeof pNumber !== 'string') {
        console.log("The phone number should be a string.");
        isValid = false;
    }


    if (isValid) {
        console.log("WELCOME TO THE ADOS APP.");
    }
}

formValidator("John", "Doe", 20, "1234567890");
