const validateButton = document.getElementById("validateButton");
const errorMessage = document.getElementById("error");
errorMessage.textContent = "";
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const age = document.getElementById("age");
const phoneNumber = document.getElementById("phoneNumber");

validateButton.addEventListener("click", function() {
    if (age === undefined || age.value === "") {
        errorMessage.style.color = "red";
        errorMessage.textContent = `The age input is missing.`;
        return;
    }
    const ageValue = Number(age.value);
    formValidator(firstName.value, lastName.value, ageValue, phoneNumber.value);
});

function formValidator(firstName, lastName, age, phone) {
    const variables = [
        { title: "first name", value: firstName },
        { title: "last name", value: lastName },
        { title: "age", value: age },
        { title: "phone number", value: phone }
    ];
    for (const elem of variables) {
        if (elem.value === undefined || elem.value === "") {
            errorMessage.style.color = "red";
            errorMessage.textContent = `The ${elem.title} input is missing.`;
            return;
        }
        if (elem.title === "age" && typeof(elem.value) !== "number") {
            errorMessage.style.color = "red";
            errorMessage.textContent = `The age should be a number.`;
            return;
        } else if (elem.title !== "age" && typeof(elem.value) !== "string") {
            errorMessage.style.color = "red";
            errorMessage.textContent = `The ${elem.title} should be a string.`;
            return;
        }
    }
    if (age < 18) {
        errorMessage.style.color = "red";
        errorMessage.textContent = "Sorry, not old enough for our app.";
        return;
    }
    errorMessage.style.color = "green";
    errorMessage.textContent = "WELCOME TO THE ADOS APP.";
}
