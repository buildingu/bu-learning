function formValidator(firstName, lastName, age, phoneNumber) {
  const errors = [];

  const formData = { firstName, lastName, age, phoneNumber };

  const requiredFields = ["firstName", "lastName", "age", "phoneNumber"];

  requiredFields.forEach(field => {
    if (!formData[field]) {
      errors.push(`The ${field} input is missing.`);
    }
  });

  if (firstName && typeof firstName !== "string") {
    errors.push("The first name should be a string.");
  }

  if (lastName && typeof lastName !== "string") {
    errors.push("The last name should be a string.");
  }

  if (phoneNumber && typeof phoneNumber !== "string") {
    errors.push("The phone number should be a string.");
  }

  if (age && typeof age !== "number") {
    errors.push("The age should be a number.");
  }

  if (typeof age === "number" && age < 18) {
    errors.push("Sorry, not old enough for our app.");
  }

  return errors;
}

document.getElementById("submitButton").addEventListener("click", () => {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const age = Number(document.getElementById("age").value);
  const phoneNumber = document.getElementById("phoneNumber").value;

  const messageBox = document.getElementById("messageBox");
  messageBox.innerHTML = "";

  const errors = formValidator(firstName, lastName, age, phoneNumber);

  if (errors.length > 0) {
    errors.forEach(error => {
      const p = document.createElement("p");
      p.classList.add("error");
      p.textContent = error;
      messageBox.appendChild(p);
    });
  } else {
    const success = document.createElement("p");
    success.classList.add("success");
    success.textContent = "WELCOME TO THE ADOS APP.";
    messageBox.appendChild(success);
  }
});
