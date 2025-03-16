let users = [];

function formValidator(firstName, lastName, age, phoneNumber) {
    const parameters = {
        "first name": firstName,
        "last name": lastName,
        "age": age,
        "phone number": phoneNumber
    };

    for (let key in parameters) {
        if (!parameters[key] || parameters[key] === '') {
            return `The ${key} input is missing.`;
        }
    }

    if (typeof firstName !== 'string' || firstName.trim() === '') {
        return `The first name should be a non-empty string.`;
    }

    if (typeof lastName !== 'string' || lastName.trim() === '') {
        return `The last name should be a non-empty string.`;
    }

    if (typeof phoneNumber !== 'string' || phoneNumber.trim() === '') {
        return `The phone number should be a non-empty string.`;
    }

    const ageNumber = Number(age);
    if (isNaN(ageNumber)) {
        return `The age should be a number.`;
    }

    if (age < 18) {
        return `Sorry, not old enough for our app.`;
    }

    const userInfo = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        age: age,
        phoneNumber: phoneNumber.trim()
    };

    users.push(userInfo);

    return true;
}

document.getElementById('validationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;
    const age = document.getElementById('age').value;
    const phoneNumber = document.getElementById('phone').value;

    const validationResult = formValidator(firstName, lastName, age, phoneNumber);

    const messageDiv = document.getElementById('message');
    if (validationResult === true) {
        messageDiv.innerText = "WELCOME TO THE ADOS APP.";
        messageDiv.style.color = "green";
    } else {
        messageDiv.innerText = validationResult;
        messageDiv.style.color = "red";
    }
});
