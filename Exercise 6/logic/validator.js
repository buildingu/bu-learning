function formValidator(firstName, lastName, age, phoneNumber) {
    const user = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        phoneNumber: phoneNumber
    };

    let errors = [];

    /* Missing/Empty Checks */
    if (!user.firstName || user.firstName.trim() === "") {
        errors.push("The first name is missing or blank.");
    }
    if (!user.lastName || user.lastName.trim() === "") {
        errors.push("The last name is missing or blank.");
    }
    if (isNaN(user.age) || user.age === undefined || user.age === null) {
        errors.push("The age is missing.");
    }
    if (!user.phoneNumber || user.phoneNumber.trim() === "") {
        errors.push("The phone number is missing or blank.");
    }

    /* Type Checks */
    if (typeof user.firstName !== "string") errors.push("First name must be a string.");
    if (typeof user.lastName !== "string") errors.push("Last name must be a string.");
    if (typeof user.age !== "number" || Number.isNaN(user.age)) {
        errors.push("The age should be a number.");
    }
    
    /* Conditions */
    if (typeof user.age === "number" && user.age < 18) {
        errors.push("Sorry, not old enough for our app.");
    }

    return errors;
}

document.getElementById('v-submit').addEventListener('click', function() {
    const msgBox = document.getElementById('messageBox');
    
    const fName = document.getElementById('v-firstName').value;
    const lName = document.getElementById('v-lastName').value;
    const age = parseInt(document.getElementById('v-age').value); 
    const phone = document.getElementById('v-phoneNumber').value;

    const errors = formValidator(fName, lName, age, phone);

    msgBox.style.display = "block";
    if (errors.length === 0) {
        msgBox.className = "success-msg";
        msgBox.innerHTML = "<strong>WELCOME TO THE ADOS APP.</strong>";
        console.log("SUCCESS");
    } else {
        msgBox.className = "error-msg";
        msgBox.innerHTML = "<strong>Errors:</strong><br>• " + errors.join("<br>• ");
        console.log("Errors:", errors);
    }
});