function formValidator(fName, lName, age, phoneNum) {
  if (!fName) {
    return 'The first name input is missing';
  } else if (!lName) {
    return 'The last name input is missing';
  } else if (!age) {
    return 'The age input is missing';
  } else if (!phoneNum) {
    return 'The phone number input is missing';
  } else if (typeof fName !== 'string') {
    return 'The first name should be a string';
  } else if (typeof lName !== 'string') {
    return 'The last name should be a string';
  } else if (typeof age !== 'number') {
    return 'The age should be a number';
  } else if (typeof phoneNum !== 'string') {
    return 'The phone number should be a string';
  } else if (age < 18) {
    return 'Sorry, not old enough for our app.';
  } else {
    return 'WELCOME TO THE ADOS APP.';
  }
}

console.log(formValidator('Saeed', 'Mamani', 19, '6143334444'));
