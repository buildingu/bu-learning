function formValidator(firstName, lastName, age, phoneNumber) {
    const inputs = { firstName, lastName, age, phoneNumber };
    const expectedTypes = {
        firstName: 'string',
        lastName: 'string',
        age: 'number',
        phoneNumber: 'string'
    };

    const errors = [];

    for (const key in inputs) {
        const value = inputs[key];

        if (value === undefined || value === null || value === '') {
            errors.push("The " + key + " input is missing.");
        } 

        else if (typeof value !== expectedTypes[key]) {
            if (key === 'age') {
                errors.push("The age should be a number.");
            } else {
                errors.push("The " + key + " should be a string.");
            }
        }
    }

    if (typeof age === 'number' && age < 18) {
        errors.push("Sorry, not old enough for our app.");
    }

    if (errors.length > 0) {
        errors.forEach(function(error) {
            console.log(error);
        });

    } else {
        console.log("WELCOME TO THE ADOS APP.");
    }
}
