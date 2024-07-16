function formValidator(firstName, lastName, age, phoneNumber) {
    if (firstName === undefined) {
        console.log("The first name input is missing.");
        return;
    }
    if(lastName === undefined) {
        console.log("The last name input is missing.");
        return;
    }
    if (age === undefined) {
        console.log("The age input is missing.");
        return;
    }
    if (phoneNumber === undefined) {
        console.log("The phone number input is missing.");
        return;
    }

    if (typeof firstName !== 'string') {
        console.log("The first name should be a string.");
        return;
    }
    if (typeof lastName !== 'string') {
        console.log("The last name should be a string.");
        return;
    }
    if (typeof age !== 'number') {
        console.log("The age should be a number.");
        return;
    }
    if (typeof phoneNumber !== 'string') {
        console.log("The phone number should be a string.");
        return;
    }

    if (age<18) {
        console.log("Sorry, not old enough for our app.");
        return;
    }

    console.log("WELCOME TO THE ADOS APP.");
}

formValidator("Hanan", "Mashal", 17, "123456789")