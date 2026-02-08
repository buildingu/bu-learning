function formValidator(firstName, lastName, age, phoneNumber) {
  const inputs = {
    firstName,
    lastName,
    age,
    phoneNumber
  };

  const requiredFields = ["firstName", "lastName", "age", "phoneNumber"];

  for (let field of requiredFields) {
    if (inputs[field] === undefined) {
      console.log(`The ${field} input is missing.`);
      return;
    }
  }

  if (typeof firstName !== "string") {
    console.log("The first name should be a string.");
    return;
  }

  if (typeof lastName !== "string") {
    console.log("The last name should be a string.");
    return;
  }

  if (typeof phoneNumber !== "string") {
    console.log("The phone number should be a string.");
    return;
  }

  if (typeof age !== "number") {
    console.log("The age should be a number.");
    return;
  }

  if (age < 18) {
    console.log("Sorry, not old enough for our app.");
    return;
  }

  console.log("WELCOME TO THE ADOS APP.");
}

