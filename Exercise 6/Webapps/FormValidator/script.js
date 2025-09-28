document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const age = document.getElementById("age").value.trim();
  const phoneNumber = document.getElementById("phoneNumber").value.trim();

  const parsedAge = Number(age);

  formValidator(firstName, lastName, parsedAge, phoneNumber);
});

function formValidator(firstName, lastName, age, phoneNumber) {
  const inputs = { firstName, lastName, age, phoneNumber };
  const expectedTypes = {
    firstName: 'string',
    lastName: 'string',
    age: 'number',
    phoneNumber: 'string'
  };

  const errors = [];
  const errorDiv = document.getElementById("errors");
  errorDiv.innerHTML = "";

  for (const key in inputs) {
    const value = inputs[key];

    if (value === undefined || value === null || value === '') {
      errors.push(`The ${key} input is missing.`);
    } 
    else if (typeof value !== expectedTypes[key] || (key === "age" && isNaN(value))) {
      if (key === 'age') errors.push("The age should be a number.");
      else errors.push(`The ${key} should be a string.`);
    }
  }

  if (typeof age === 'number' && !isNaN(age) && age < 18) {
    errors.push("Sorry, not old enough for our app.");
  }

  if (errors.length > 0) {
    errors.forEach(error => {
      const p = document.createElement("p");
      p.textContent = error;
      p.style.color = "red";
      errorDiv.appendChild(p);
    });
  } else {
    const p = document.createElement("p");
    p.textContent = "WELCOME TO THE ADOS APP.";
    p.style.color = "green";
    errorDiv.appendChild(p);
  }
}
