function formValidator(firstName, lastName, age, phoneNumber) {
    const resultDiv = document.getElementById("result");
  
    if (!firstName) {
      resultDiv.textContent = "The first name input is missing.";
      return;
    }
    if (!lastName) {
      resultDiv.textContent = "The last name input is missing.";
      return;
    }
    if (age === undefined || age === null) {
      resultDiv.textContent = "The age input is missing.";
      return;
    }
    if (!phoneNumber) {
      resultDiv.textContent = "The phone number input is missing.";
      return;
    }
  
    if (typeof firstName !== "string" || !/^[a-zA-Z]+$/.test(firstName)) {
      resultDiv.textContent = "The first name should be a string.";
      return;
    }
    if (typeof lastName !== "string" || !/^[a-zA-Z]+$/.test(lastName)) {
      resultDiv.textContent = "The last name should be a string.";
      return;
    }
    if (typeof phoneNumber !== "string") {
      resultDiv.textContent = "The phone number should be a string.";
      return;
    }
  
    if (typeof age !== "number") {
      resultDiv.textContent = "The age should be a number.";
      return;
    }
  
    if (age < 18) {
      resultDiv.textContent = "Sorry, not old enough for our app.";
      return;
    }
  
    resultDiv.textContent = "WELCOME TO THE ADOS APP.";
  }
  
  document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
  
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const age = parseInt(document.getElementById('age').value, 10);
    const phoneNumber = document.getElementById('phoneNumber').value;
  
    formValidator(firstName, lastName, age, phoneNumber);
  });
  