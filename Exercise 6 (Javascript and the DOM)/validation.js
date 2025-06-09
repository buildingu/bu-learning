export function formValidator(firstName, lastName, age, phonePart1, phonePart2, phonePart3) {
    const errors = [];

    if (!firstName) {
        errors.push("The first name input is missing.");
    } else if (!/^[A-Za-z\s\-,]+$/.test(firstName)) {
        errors.push("The first name should contain only letters.");
    }

    if (!lastName) {
        errors.push("The last name input is missing.");
    } else if (!/^[A-Za-z\s\-,]+$/.test(lastName)) {
        errors.push("The last name should contain only letters.");
    }

    if (age === undefined || age === null || age === "") {
        errors.push("The age input is missing.");
    } else if (isNaN(age)) {
        errors.push("The age should be a number.");
    } else if (age < 18) {
        errors.push("Sorry, not old enough for our app.");
    }

    if (!/^\d{3}$/.test(phonePart1)) {
        errors.push("Phone number part 1 must be exactly 3 digits.");
    }
    if (!/^\d{3}$/.test(phonePart2)) {
        errors.push("Phone number part 2 must be exactly 3 digits.");
    }
    if (!/^\d{4}$/.test(phonePart3)) {
        errors.push("Phone number part 3 must be exactly 4 digits.");
    }

    return errors;
}

