export function employeeValidator(name, age, sex, position) {

    const errors = [];

    if (!name) {
        errors.push("The first name input is missing.");
    } else if (!/^[A-Za-z\s\-,]+$/.test(name)) {
        errors.push("The first name should contain only letters.");
    }

    if (!sex) {
        errors.push("The first name input is missing.");
    } else if (!/^[A-Za-z\s\-,]+$/.test(sex)) {
        errors.push("The first name should contain only letters.");
    }

    if (!position) {
        errors.push("The first name input is missing.");
    } else if (!/^[A-Za-z\s\-,]+$/.test(position)) {
        errors.push("The first name should contain only letters.");
    }

    if (age === undefined || age === null || age === "") {
        errors.push("The age input is missing.");
    } else if (isNaN(age)) {
        errors.push("The age should be a number.");
    } 
}