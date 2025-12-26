function formValidator() {
    // Grabbing form values
    const first_name = document.myform.first_name.value;
    const last_name = document.myform.last_name.value;
    const age = document.myform.age.value; 
    const phone_number = document.myform.phone.value;

    // Array to store validation errors
    const errors = [];

    // Checking if all parameters are present
    if (!first_name) {
        errors.push("The first name input is missing.");
    }
    if (!last_name) {
        errors.push("The last name input is missing.");
    }
    if (!age) {
        errors.push("The age input is missing.");
    }
    if (!phone_number) {
        errors.push("The phone number input is missing.");
    }

    // Checking datatypes
    if (typeof first_name !== "string") {
        errors.push("The first name should be a string.");
    }
    if (typeof last_name !== "string") {
        errors.push("The last name should be a string.");
    }
    if (typeof parseInt(age) !== "number" || isNaN(parseInt(age))) {
        errors.push("The age should be a number.");
    }
    if (typeof phone_number !== "string") {
        errors.push("The phone number should be a string.");
    }

    // Checking if age is 18 or older
    if (age < 18) {
        errors.push("Sorry, not old enough to use the app.");
    }

    // Displaying errors or success message
    if (errors.length > 0) {
        // Display errors
        alert(errors.join("\n"));
        return false;
    } else {
        // Display success message
        alert("WELCOME TO THE ADOS APP")
        return true
    }
}



