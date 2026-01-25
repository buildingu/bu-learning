function formValidator(fName, lastName, age, pNumber) {
    // We use a flag to track if any validation failed.
    // It starts as true, and turns false if we find ANY mistake.
    let isValid = true;

    // 1. Check First Name
    if (!fName) {
        console.log("The name input is missing.");
        isValid = false;
    } else if (typeof fName !== 'string') {
        console.log("The first Name should be a string.");
        isValid = false;
    }

    // 2. Check Last Name
    if (!lastName) {
        console.log("The last name input is missing.");
        isValid = false;
    } else if (typeof lastName !== 'string') {
        console.log("The last Name should be a string.");
        isValid = false;
    }

    // 3. Check Age
    if (!age) {
        // Note: 0 is falsy, so checking !age catches 0 too.
        // If 0 is valid for "presence" but invalid for age limit, we might need stricter checks,
        // but for this exercise !age is usually sufficient for "missing".
        console.log("The age input is missing.");
        isValid = false;
    } else if (typeof age !== 'number') {
        console.log("The age should be a number.");
        isValid = false;
    } else if (age < 18) {
        console.log("Sorry, not old enough for our app.");
        isValid = false;
    }

    // 4. Check Phone Number
    if (!pNumber) {
        console.log("The phone number input is missing.");
        isValid = false;
    } else if (typeof pNumber !== 'string') {
        console.log("The phone number should be a string.");
        isValid = false;
    }

    // FINAL CHECK: Only print Welcome if isValid is still true
    if (isValid) {
        console.log("WELCOME TO THE ADOS APP.");
    }
}

formValidator("Abdul", "Hanan", 19, "8523985");
