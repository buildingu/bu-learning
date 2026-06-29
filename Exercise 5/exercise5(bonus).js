// Implementation with arrays and objects

function formValidator(user) {
  const errors = [];

  if (!user.fName) {
    errors.push('The first name input is missing');
  } else if (typeof user.fName !== 'string') {
    errors.push('The first name should be a string');
  }
  if (!user.lName) {
    errors.push('The last name input is missing');
  } else if (typeof user.lName !== 'string') {
    errors.push('The last name should be a string');
  }
  if (!user.age) {
    errors.push('The age input is missing');
  } else if (typeof user.age !== 'number') {
    errors.push('The age should be a number');
  } else if (user.age < 18) {
    errors.push('Sorry, not old enough for our app.');
  }
  if (!user.phoneNum) {
    errors.push('The phone number input is missing');
  } else if (typeof user.phoneNum !== 'string') {
    errors.push('The phone number should be a string');
  }

  if (errors.length === 0) {
    return 'WELCOME TO THE ADOS APP.';
  } else {
    return errors;
  }
}

console.log(
  formValidator({
    fName: 'Saeed',
    lName: 'Mamani',
    age: 19,
    phoneNum: '6143334444',
  }),
);
