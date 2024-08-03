function formValidator(firstName, lastName, age, phoneNumber) {
    if (firstName === undefined) {
        console.log("The first name input is missing.");
    } else if (lastName === undefined) {
        console.log("The last name input is missing.");
    } else if (age === undefined) {
        console.log("The age input is missing.");
    } else if (phoneNumber === undefined) {
        console.log("The phone number input is missing.");
    } else if (typeof firstName !== 'string') {
        console.log("The first name should be a string.");
    } else if (typeof lastName !== 'string') {
        console.log("The last name should be a string.");
    } else if (typeof age !== 'number') {
        console.log("The age should be a number.");
    } else if (typeof phoneNumber !== 'string') {
        console.log("The phone number should be a string.");
    } else if (age<18) {
        console.log("Sorry, not old enough for our app.");
    } else {
        console.log("WELCOME TO THE ADOS APP."); 
    }
}

formValidator("Hanan", "Mashal", 17, "123456789");