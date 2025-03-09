function formValidator(firstName, lastName, age, phoneNumber) {
    const userInput = { firstName, lastName, age, phoneNumber };
    const requiredFields = [
        { name: 'firstName', type: 'string' },
        { name: 'lastName', type: 'string' },
        { name: 'age', type: 'number' },
        { name: 'phoneNumber', type: 'string' }
    ];

    for (const field of requiredFields) {
        if (!userInput[field.name]) return `The ${field.name} input is missing.`;
        if (typeof userInput[field.name] !== field.type) return `The ${field.name} should be a ${field.type}.`;
    }

    if (userInput.age < 18) return "Sorry, not old enough for our app.";
    return "WELCOME TO THE ADOS APP.";
}