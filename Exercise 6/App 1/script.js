function formValidator(firstName, lastName, age, phoneNumber) {
  const inputs = { firstName, lastName, age, phoneNumber };
  const requiredFields = ["firstName", "lastName", "age", "phoneNumber"];

  for (let field of requiredFields) {
    if (inputs[field] === undefined) {
      return [`The ${field} input is missing.`];
    }
  }

  if (typeof firstName !== "string") return ["The first name should be a string."];
  if (typeof lastName !== "string") return ["The last name should be a string."];
  if (typeof phoneNumber !== "string") return ["The phone number should be a string."];
  if (typeof age !== "number") return ["The age should be a number."];
  if (age < 18) return ["Sorry, not old enough for our app."];

  return ["WELCOME TO THE ADOS APP."];
}

const firstNameEl = document.getElementById("firstName");
const lastNameEl = document.getElementById("lastName");
const ageEl = document.getElementById("age");
const phoneEl = document.getElementById("phoneNumber");
const messagesEl = document.getElementById("messages");
const submitBtn = document.getElementById("submitBtn");

function showMessages(lines) {
  messagesEl.value = lines.join(" | ");
}

submitBtn.addEventListener("click", () => {
  const rawFirst = firstNameEl.value;
  const rawLast = lastNameEl.value;
  const rawAge = ageEl.value;
  const rawPhone = phoneEl.value;

  const inputs = { firstName: rawFirst, lastName: rawLast, age: rawAge, phoneNumber: rawPhone };
  const requiredFields = ["firstName", "lastName", "age", "phoneNumber"];

  const errors = [];

  for (let field of requiredFields) {
    const val = inputs[field];
    if (val === undefined || String(val).trim() === "") {
      errors.push(`The ${field} input is missing.`);
    }
  }

  if (inputs.firstName !== undefined && String(inputs.firstName).trim() !== "" && typeof rawFirst !== "string") {
    errors.push("The first name should be a string.");
  }

  if (inputs.lastName !== undefined && String(inputs.lastName).trim() !== "" && typeof rawLast !== "string") {
    errors.push("The last name should be a string.");
  }

  if (inputs.phoneNumber !== undefined && String(inputs.phoneNumber).trim() !== "" && typeof rawPhone !== "string") {
    errors.push("The phone number should be a string.");
  }

  const ageIsMissing = rawAge === undefined || String(rawAge).trim() === "";
  const parsedAge = Number(rawAge);
  const ageIsNotNumber = !ageIsMissing && !Number.isFinite(parsedAge);

  if (!ageIsMissing && ageIsNotNumber) errors.push("The age should be a number.");
  if (!ageIsMissing && !ageIsNotNumber && parsedAge < 18) errors.push("Sorry, not old enough for our app.");

  if (errors.length > 0) {
    showMessages(errors);
    return;
  }

  const result = formValidator(rawFirst, rawLast, parsedAge, rawPhone);
  showMessages(result);
});
