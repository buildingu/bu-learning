function formValidator(firstName, lastName, age, phoneNumber) {
  if (typeof firstName === 'undefined') {
    return "The name input is missing.";
  }
  if (typeof lastName === 'undefined') {
    return "The last name input is missing.";
  }
  if (typeof age === 'undefined') {
    return "The age input is missing.";
  }
  if (typeof phoneNumber === 'undefined') {
    return "The phone number input is missing.";
  }

  if (typeof firstName !== 'string') {
    return `The first name should be a string, but received ${typeof firstName}.`;
  }
  if (typeof lastName !== 'string') {
    return `The last name should be a string, but received ${typeof lastName}.`;
  }
  if (typeof phoneNumber !== 'string') {
    return `The phone number should be a string, but received ${typeof phoneNumber}.`;
  }
  if (typeof age !== 'number') {
    return "The age should be a number.";
  }

  if (age < 18) {
    return "Sorry, not old enough for our app.";
  }


  return "WELCOME TO THE ADOS APP.";
}
//TEST
console.log(formValidator('John', 'Doe', 25, '1234567890'));
console.log(formValidator('John', 'Doe', 'twentyfive', '1234567890'));
console.log(formValidator('John', 'Doe', 17, '1234567890'));
console.log(formValidator('John', 'Doe', 25, '123456789'));


