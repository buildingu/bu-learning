function formValidator(parameters) {
  const req = ["first_name", "last_name", "age", "phone_number"];
  const types=["string","string","number","string"];
  const missing = req.filter(
    param => !(param in parameters) || parameters[param] == null
  );
  if (missing.length > 0) {
    return `Missing parameters: ${missing}`;
  }
  for (let i = 0; i < req.length; i++) {
    if (typeof parameters[req[i]] !== types[i]) {
      return `${req[i]} must be a ${types[i]}`;
    }
  }
  if (parameters["age"]<18){
    return "Sorry, not old enough for our app."
  }
  return "WELCOME TO THE ADOS APP."
}

console.log(formValidator({first_name:"jane",last_name: "Doe", age: 25, phone_number:"9"})); 
