function formValidator(fName, lName, age, pNumber) {
     if (fName === null || fName.length === 0) {
        return "The first name input is missing";  
    }

    else if (lName === null || lName.length === 0) {
        return "The last name input is missing";
    }

    else if (age === null) {
        return "The age input is missing";
    }

    else if (pNumber === null || pNumber.length === 0) {
        return "The phone number is missing";
    }


    if (typeof fName !== 'string') {
        return "first Name should be a string";
    }

    else if (typeof lName !== 'string') {
        return "lastt Name should be a string";
    }

    else if (!Number.isInteger(age)) {
        return "Age should be a number";
    }
    
    else if (typeof pNumber !== 'string') {
        return "Phone Number should be a string";
    }

    if(age < 18) {
        return "Sorry, not old enough for our App";

    }

    return "Welcome to the ADOS App";



}
// TESTING
console.log(formValidator("John", "Doe", 18, "555-555-5555"));
console.log(formValidator("John", "Doe", 17, 55));
console.log(formValidator(null, "Doe", 18, "555-555-5555"));
console.log(formValidator("John", "" ,18, "555-555-5555"));