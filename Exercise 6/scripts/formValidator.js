const alerter = document.getElementById("alerter");
const missingAlertUI = function (param) {
  alerter.style.color = "red";
  alerter.style.backgroundColor = "beige";
  alerter.textContent = `The input ${param} is missing!`;
  setTimeout(() => (alerter.textContent = ""), 3000);
};
const incorrectTypeUI = function (parameter) {
  alerter.style.color = "red";
  alerter.style.backgroundColor = "beige";
  if ((parameter = "Age")) {
    alerter.textContent = "The input Age must be a number!";
    setTimeout(() => (alerter.textContent = ""), 3000);
  } else {
    let typeAlert = `The input ${parameter} must be a string!`;
    alerter.textContent = typeAlert;
    setTimeout(() => (alerter.textContent = ""), 3000);
  }
};
const ageWarning = function () {
  alerter.style.color = "red";
  alerter.style.backgroundColor = "beige";
  let ageWarn = "Sorry, You are not old enough for our app.";
  alerter.textContent = ageWarn;
  setTimeout(() => (alerter.textContent = ""), 3000);
};
const welcome = function () {
  alerter.style.color = "green";
  alerter.style.backgroundColor = "beige";
  let welcomeMessage = "Welcome to the ADOS app!";
  alerter.textContent = welcomeMessage;
  setTimeout(() => (document.getElementById("alerter").textContent = ""), 3000);
};

const btn = document.getElementById("submitButton");
btn.addEventListener("click", () => {
  let fName = document.getElementById("firstNameInput").value;
  let lName = document.getElementById("lastNameInput").value;
  let age = Number(document.getElementById("ageInput").value);
  let phoneNumber = document.getElementById("phoneNumberInput").value;
  let types = [typeof fName, typeof lName, typeof age, typeof phoneNumber];
  if (fName === "") {
    missingAlertUI("First Name");
  } else if (lName === "") {
    missingAlertUI("Last Name");
  } else if (age === 0) {
    missingAlertUI("Age");
  } else if (phoneNumber === "") {
    missingAlertUI("Phone Number");
  } else {
    if (types[0] !== "string") {
      incorrectTypeUI("First Name");
    } else if (types[1] !== "string") {
      incorrectTypeUI("Phone Number");
    } else if (isNaN(age)) {
      incorrectTypeUI("Age");
    } else if (types[3] !== "string") {
      incorrectTypeUI("Phone Number");
    } else {
      if (age < 18) {
        ageWarning();
      } else {
        welcome();
      }
    }
  }
});
