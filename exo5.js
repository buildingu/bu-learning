function formValidator(firstName, lastName, age, phoneNumber) {
  const userInfo = {firstName, lastName, age, phoneNumber};
  const errorMessages = [];
  for (const key in userInfo) {
    if (typeof userInfo[key] === 'undefined') {
      errorMessages.push(`The ${key} input is missing.`);
    }
  }
  for (const key in userInfo) {
    if (typeof userInfo[key] !== (key === 'age' ? 'number' : 'string')) {
      errorMessages.push(`The ${key} should be a ${key === 'age' ? 'number' : 'string'}, but received ${typeof userInfo[key]}.`);
    }
  }
  if (userInfo.age < 18) {
    errorMessages.push("Sorry, not old enough for our app.");
  }
  if (errorMessages.length > 0) {
    return errorMessages.join('\n');
  } else {
    return "WELCOME TO THE ADOS APP.";
  }
}
console.log(formValidator('John', 'Doe', 25, '1234567890'));
console.log(formValidator('John', 'Doe', 'twentyfive', '1234567890'));
console.log(formValidator('John', 'Doe', 17, '1234567890'));
console.log(formValidator('John', 'Doe', 25, '123456789'));