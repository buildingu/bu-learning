function formValidator() {
  const req = ["first_name", "last_name", "age", "phone_number"];
  const parameters = {
    first_name: document.getElementById("first_name"),
    last_name: document.getElementById("last_name"),
    age: document.getElementById("age"),
    phone_number: document.getElementById("phone_number"),
  };

  // Expected types
  const types = ["string", "string", "number", "number"];

  // Check missing fields
  const missing = req.filter(param => parameters[param].value.trim() === "");
  if (missing.length > 0) {
    return `Missing parameters: ${missing.join(", ")}`;
  }

  // Type checking
  for (let i = 0; i < req.length; i++) {
    let value = parameters[req[i]].value;
    if (types[i] === "number") {
      if (isNaN(Number(value))) {
        return `${req[i]} must be a number`;
      }
    } else {
      if (typeof value !== types[i]) {
        return `${req[i]} must be a ${types[i]}`;
      }
    }
  }

  // Age check
  if (Number(parameters["age"].value) < 18) {
    return "Sorry, not old enough for our app.";
  }

  return "WELCOME TO THE ADOS APP.";
}

function click_alert() {
  alert(formValidator());
}
