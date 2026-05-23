const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const age = document.getElementById("age");
const phoneNum = document.getElementById("phoneNum");

const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

function formValidator(fName, lName, ageValue, phoneValue) {

  if (!fName) {
    message.textContent = "Please enter your first name";
    return;
  } else if (typeof fName !== 'string') {
    message.textContent = "The first name should be a string data type";
    return;
  }

  if (!lName) {
    message.textContent = "Please enter your last name";
    return;
  } else if (typeof lName !== 'string') {
    message.textContent = "The last name should be a string data type";
    return;
  }

  if (!ageValue) {
    message.textContent = "Please enter your age";
    return;
  } else if (typeof ageValue !== 'number' || isNaN(ageValue)) {
    message.textContent = "The age should be a number";
    return;
  } else if (ageValue < 18) {
    message.textContent = "Access Denied: You must be at least 18 years old.";
    return;
  }

  if (!phoneValue) {
    message.textContent = "Please enter your phone number";
    return;
  } else if (typeof phoneValue !== 'string') {
    message.textContent = "The phone number should be a string data type";
    return;
  }

  message.textContent = "WELCOME TO THE ADOS APP";
}

submitBtn.addEventListener("click", function () {

  const fName = firstName.value.trim();
  const lName = lastName.value.trim();
  const ageValue = Number(age.value);
  const phoneValue = phoneNum.value.trim();

  formValidator(fName, lName, ageValue, phoneValue);

});