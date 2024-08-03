const alerter = document.getElementById("alerter");

const missingAlertUI = function (param) {
    alerter.style.color = "red";
    alerter.textContent = `The ${param} input is missing!`;
    setTimeout(() => (alerter.textContent = ""), 3000);
};

const incorrectTypeUI = function (parameter) {
    alerter.style.color = "red";
    if (parameter === "phone number") {
        alerter.textContent = "The phone number must contain only digits.";
    } else {
        alerter.textContent = `The ${parameter} input must be a string!`;
    }
    setTimeout(() => (alerter.textContent = ""), 3000);
};

const ageWarning = function () {
    alerter.style.color = "red";
    alerter.textContent = "Sorry, you are not old enough for our app.";
    setTimeout(() => (alerter.textContent = ""), 3000);
};

const welcome = function () {
    alerter.style.color = "green";
    alerter.textContent = "WELCOME TO THE ADOS APP.";
    setTimeout(() => (document.getElementById("alerter").textContent = ""), 3000);
};

const isString = function (str) {
    return /^[a-zA-Z]+$/.test(str);
};

const isNumeric = function (str) {
    return /^\d+$/.test(str);
};

const btn = document.getElementById("submitButton");
btn.addEventListener("click", () => {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let age = document.getElementById("age").value;
    let phoneNumber = document.getElementById("phoneNumber").value;

    if (!firstName) {
        missingAlertUI("first name");
    } else if (!lastName) {
        missingAlertUI("last name");
    } else if (!age) {
        missingAlertUI("age");
    } else if (!phoneNumber) {
        missingAlertUI("phone number");
    } else {
        age = Number(age);
        if (!isString(firstName)) {
            incorrectTypeUI("first name");
        } else if (!isString(lastName)) {
            incorrectTypeUI("last name");
        } else if (isNaN(age)) {
            incorrectTypeUI("age");
        } else if (!isNumeric(phoneNumber)) {
            incorrectTypeUI("phone number");
        } else {
            if (age < 18) {
                ageWarning();
            } else {
                welcome();
            }
        }
    }
});
