function formValidator(fName, lName, age, pNumber){
     if (fName === null || fName.length === 0) {
        console.log("The first name input is missing");
    }
    else if (lName === null || lName.length === 0) {
        console.log("The last name input is missing");
    }
    else if(age === null) {
        console.log("The age input is missing");
    }
    else if (pNumber === null || pNumber.length === 0) {
        console.log("The phone number is missing");
    }


    if (typeof fName !== 'string') {
        console.log("first Name should be a string");
    }
    else if (typeof lName !== 'string') {
        console.log("lastt Name should be a string");
    }
    else if (!Number.isInteger(age)) {
        console.log("Age should be a number");
    }
    else if (typeof pNumber !== 'string') {
        console.log("Phone Number should be a string");
    }



}