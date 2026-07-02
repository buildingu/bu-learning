const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const age = document.getElementById("age");
const phoneNum = document.getElementById("phoneNum");

const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

function formValidator(fName, lName, ageValue, phoneValue) {
  let errors = [];

  if (!fName) {
    errors.push("Please enter your first name.");
  } else if (typeof fName !== 'string') {
    message.textContent = "The first name should be a string data type";
    return;
  }

  if (!lName) {
    errors.push("Please enter your last name.");
  } else if (typeof lName !== 'string') {
    message.textContent = "The last name should be a string data type";
    return;
  }

  if (!ageValue) {
    errors.push("Please enter your age.");
  } else if (isNaN(ageValue)) {
    errors.push("Please enter a valid number for your age.");
  } else if (Number(ageValue) < 18) {
    message.textContent = "Access Denied: You must be at least 18 years old.";
    return;
  }

  if (!phoneValue) {
    errors.push("Please enter your phone number.");
  } else if (typeof phoneValue !== 'string') {
    message.textContent = "The phone number should be a string data type";
    return;
  }

  if (errors.length > 0) {
    message.textContent = errors.join(" ");
    return;
  }

  message.textContent = "WELCOME TO THE ADOS APP";
}

submitBtn.addEventListener("click", function () {
  const fName = firstName.value.trim();
  const lName = lastName.value.trim();
  const ageValue = age.value.trim();
  const phoneValue = phoneNum.value.trim();

  formValidator(fName, lName, ageValue, phoneValue);
});