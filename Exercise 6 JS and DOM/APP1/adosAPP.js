function formValidator(firstName, lastName, age, phone) {
  const params = { firstName, lastName, age, phone };
  const expectedTypes = {
    firstName: "string",
    lastName: "string",
    age: "number",
    phone: "string",
  };

  for (const field in params) {
    if (
      params[field] === undefined ||
      params[field] === null ||
      params[field] === ""
    ) {
      return `❌ The ${field} input is missing.`;
    }
  }

  // Validate data types
  if (typeof firstName !== "string") return "❌ First name should be a string.";
  if (typeof lastName !== "string") return "❌ Last name should be a string.";
  if (typeof phone !== "string") return "❌ Phone number should be a string.";

  const ageNum = Number(age);
  if (isNaN(ageNum)) return "❌ Age should be a number.";
  if (ageNum < 18) return "❌ Sorry, not old enough for our app.";

  return "✅ WELCOME TO THE ADOS APP.";
}

function validateForm() {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const age = document.getElementById("age").value.trim();
  const phone = document.getElementById("phone").value.trim();

  const result = formValidator(firstName, lastName, age, phone);
  const output = document.getElementById("output");
  const menu = document.getElementById("menu");

  if (result.startsWith("✅")) {
    output.style.color = "green";
    output.textContent = result;
    menu.style.display = "block";
  } else {
    output.style.color = "red";
    output.textContent = result;
    menu.style.display = "none";
  }
}
