const form = document.getElementById('userForm');
const errorDiv = document.getElementById('errorMessages');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  errorDiv.innerHTML = ''; // clear previous errors

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const age = Number(form.age.value.trim());
  const phoneNumber = form.phoneNumber.value.trim();

  const errors = [];

  // First Name
  if (firstName == null || firstName === "") {
    errors.push("The first name input is missing.");
  }
  else if (typeof firstName !== "string") {
    errors.push("The first name should be a string.");
  }

  // Last Name
  if (lastName == null || lastName === "") {
    errors.push("The last name input is missing.");
  }
  else if (typeof lastName !== "string") {
    errors.push("The last name should be a string.");
  }

  // Age
  if (age == null) {
    errors.push("The age input is missing.");
  }
  else if (typeof age !== "number") {
    errors.push("The age should be a number.");
  }
  else if (age < 18) {
    errors.push("Sorry, not old enough for our app.");
  }

  // Phone Number
  if (phoneNumber.trim() == null || phoneNumber.trim() === "") {
    errors.push("The phone number input is missing.");
  }
  else if (typeof phoneNumber.trim() !== "string") {
    errors.push("The phone number should be a string.");
  }
  else if (phoneNumber.trim().length !== 10) {
    errors.push("The phone number must be exactly 10 digits.");
  }
  else if (isNaN(Number(phoneNumber.trim()))){
    errors.push("The phone number must be all digits.");
  }
  

  // Output
  if (errors.length > 0) {
    for (let i = 0; i < errors.length; i++) {
      console.log(errors[i]);
    }
  }
  else {
    console.log("WELCOME TO THE ADOS APP!");
  }

  // Display errors or success
  if (errors.length > 0) {
    errors.forEach(err => {
      const p = document.createElement('p');
      p.textContent = err;
      errorDiv.appendChild(p);
    });
  } else {
    const success = document.createElement('p');
    success.style.color = "green";
    success.textContent = "WELCOME TO THE ADOS APP!";
    errorDiv.appendChild(success);
  }
});