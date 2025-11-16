document.getElementById("validateBtn").addEventListener("click", () => {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const ageInput = document.getElementById("age").value;
  const phone = document.getElementById("phone").value;

  const messagesDiv = document.getElementById("messages");
  messagesDiv.style.color = "#d23131";
  messagesDiv.textContent = "";

  const age = ageInput === "" ? undefined : Number(ageInput);

  if (firstName === "") {
    messagesDiv.textContent = "The first name input is missing.";
    return;
  }
  if (lastName === "") {
    messagesDiv.textContent = "The last name input is missing.";
    return;
  }
  if (ageInput === "") {
    messagesDiv.textContent = "The age input is missing.";
    return;
  }
  if (phone === "") {
    messagesDiv.textContent = "The phone number input is missing.";
    return;
  }

  if (typeof firstName !== "string") {
    messagesDiv.textContent = "The first name should be a string.";
    return;
  }
  if (typeof lastName !== "string") {
    messagesDiv.textContent = "The last name should be a string.";
    return;
  }
  if (typeof phone !== "string") {
    messagesDiv.textContent = "The phone number should be a string.";
    return;
  }
  if (typeof age !== "number" || Number.isNaN(age)) {
    messagesDiv.textContent = "The age should be a number.";
    return;
  }

  if (age < 18) {
    messagesDiv.textContent = "Sorry, not old enough for our app.";
    return;
  }

  messagesDiv.style.color = "green";
  messagesDiv.textContent = "WELCOME TO THE ADOS APP.";
});
