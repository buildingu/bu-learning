function formValidator(firstName, lastName, age, phoneNumber) {
  const user = { firstName, lastName, age, phoneNumber };
  const fields = [
    { key: 'firstName', display: 'first name', expectedType: 'string' },
    { key: 'lastName', display: 'last name', expectedType: 'string' },
    { key: 'age', display: 'age', expectedType: 'number' },
    { key: 'phoneNumber', display: 'phone number', expectedType: 'string' }
  ];
  const errors = [];
  for (const field of fields) {
    const value = user[field.key];
    const isMissing =
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim() === '');
    if (isMissing) {
      errors.push(`The ${field.display} input is missing.`);
    }
  }
  for (const field of fields) {
    const value = user[field.key];
    const expected = field.expectedType;
    if (errors.includes(`The ${field.display} input is missing.`)) continue;
    if (expected === 'number') {
      if (typeof value !== 'number' || Number.isNaN(value)) {
        errors.push('The age should be a number.');
      }
    } else {
      if (typeof value !== expected) {
        if (field.key === 'firstName') {
          errors.push('The first name should be a string.');
        } else if (field.key === 'lastName') {
          errors.push('The last name should be a string.');
        } else if (field.key === 'phoneNumber') {
          errors.push('The phone number should be a string.');
        } else {
          errors.push(`The ${field.display} should be a ${expected}.`);
        }
      }
    }
  }
  if (!errors.includes('The age should be a number.') &&
      !errors.includes('The age input is missing.')) {
    if (user.age < 18) {
      errors.push('Sorry, not old enough for our app.');
    }
  }
  if (errors.length > 0) {
    errors.forEach(msg => console.log(msg));
    return { valid: false, messages: errors };
  } else {
    const welcome = 'WELCOME TO THE ADOS APP.';
    console.log(welcome);
    return { valid: true, messages: [welcome] };
  }
}