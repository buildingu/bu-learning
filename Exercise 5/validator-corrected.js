const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function formValidator(firstName, lastName, age, phoneNumber) {
    const errors = [];
    
    if (!firstName) errors.push("The first name input is missing.");
    if (!lastName) errors.push("The last name input is missing.");
    if (age === undefined || age === null || age === '') errors.push("The age input is missing.");
    if (!phoneNumber) errors.push("The phone number input is missing.");

    if (firstName && !/^[a-zA-Z]+$/.test(firstName)) {
        errors.push("The first name should only contain letters.");
    }
    if (lastName && !/^[a-zA-Z]+$/.test(lastName)) {
        errors.push("The last name should only contain letters.");
    }

    if (age !== undefined && age !== null && age !== '') {
        if (typeof age !== "number" || isNaN(age)) {
            errors.push("The age should be a number.");
        } else if (age < 18) {
            errors.push("Sorry, not old enough for our app ^_^");
        }
    }

    if (phoneNumber && !/^\d{9}$/.test(phoneNumber)) {
        errors.push("The phone number should be exactly 9 digits.");
    }

    if (errors.length > 0) {
        errors.forEach(err => console.log(err));
    } else {
        console.log("WELCOME TO THE ADOS APP.");
    }
}

readline.question('Enter your first name: ', firstName => {
    readline.question('Enter your last name: ', lastName => {
        readline.question('Enter your age: ', ageInput => {
            readline.question('Enter your phone number: ', phoneNumber => {
                const age = Number(ageInput); // convert input to number
                formValidator(firstName, lastName, age, phoneNumber);
                readline.close();
            });
        });
    });
});
