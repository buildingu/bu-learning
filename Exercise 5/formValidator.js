function formValidator(firstName, lastName, age, phoneNumber) {
  const inputs = {
    firstName,
    lastName,
    age,
    phoneNumber
  };

  const messages = [];

  Object.keys(inputs).forEach(key => {
    if (inputs[key] === undefined || inputs[key] === null || inputs[key] === "") {
      messages.push(`The ${key} input is missing.`);
    }
  });

  if (messages.length) {
    return messages.join(" ");
  }

  const typeChecks = [
    { key: "firstName", type: "string", message: "The first Name should be a string." },
    { key: "lastName", type: "string", message: "The last Name should be a string." },
    { key: "phoneNumber", type: "string", message: "The phone Number should be a string." },
    { key: "age", type: "number", message: "The age should be a number." }
  ];

  typeChecks.forEach(check => {
    if (typeof inputs[check.key] !== check.type) {
      messages.push(check.message);
    }
  });

  if (messages.length) {
    return messages.join(" ");
  }

  if (inputs.age < 18) {
    return "Sorry, not old enough for our app.";
  }

  return "WELCOME TO THE ADOS APP.";
}