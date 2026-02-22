function formValidator(firstName, lastName, age, phoneNumber) {

    switch(true){

        case (firstName === undefined || firstName === "" || firstName === null):
            console.log("First Name field is missing/invalid");
            return;
        
        case (lastName === undefined || lastName === "" || lastName === null):
            console.log("Last Name field is missing/invalid");
            return;

        case (age === undefined || age === "" || age === null):
            console.log("Age field is missing/invalid");
            return;
        
        case (phoneNumber === undefined || phoneNumber === "" || phoneNumber === null):
            console.log("Phone Number field is missing/invalid");
            return;

        case (typeof firstName !== 'string'):
            console.log("First name should be a string.");
            return;

        case (typeof lastName !== 'string'):
            console.log("Last name should be a string.");
            return;

        case (typeof phoneNumber !== 'string'):
            console.log("Phone Number should be a string.");
            return;

        case (typeof age !== 'number'):
            console.log("The age should be a number.");
            return;
        
        case (age < 18):
            console.log("Sorry, not old enough for our app.");
            return;

        default: 
            console.log("WELCOME TO THE ADOS APP.");
    }
}

formValidator("V", "P", 19, "123-456-7890");