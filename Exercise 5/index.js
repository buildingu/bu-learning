function formValidator(firstName, lastName, age, phoneNumber) {
  const formData = { firstName, lastName, age, phoneNumber };

  const requiredFields = ["firstName", "lastName", "age", "phoneNumber"];

  for (let i = 0; i < requiredFields.length; i++) {
    let field = requiredFields[i];
    if (formData[field] === undefined || formData[field] === null) {
      return `The ${field} input is missing.`;
    }
  }

  if (typeof firstName !== "string") {
    return "The first name should be a string.";
  }

  if (typeof lastName !== "string") {
    return "The last name should be a string.";
  }

  if (typeof phoneNumber !== "string") {
    return "The phone number should be a string.";
  }

  if (typeof age !== "number") {
    return "The age should be a number.";
  }

  if (age < 18) {
    return "Sorry, not old enough for our app.";
  }

  return "WELCOME TO THE ADOS APP.";
}
