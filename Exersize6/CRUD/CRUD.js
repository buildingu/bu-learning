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

    if (age < 18) {
        return "Sorry, not old enough for our App";

    }

    return "Welcome to the ADOS App";



}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    
    const fNameVal = document.getElementById("fName").value.trim();
    const lNameVal = document.getElementById("lName").value.trim();
    const ageVal = document.getElementById("age").value.trim();
    const pNumberVal = document.getElementById("pNumber").value.trim();
    const message = document.getElementById("result");

    // Run validator
    const result = formValidator(fNameVal, lNameVal, ageVal, pNumberVal);
    message.textContent = result

    if(message === "Welcome to ADOS APP") {
        
    } 

    else {
        message.style.backgroundColor = "red";
    }
});
