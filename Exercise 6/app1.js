const fields = {
  username:        document.getElementById('username'),
  email:           document.getElementById('email'),
  age:             document.getElementById('age'),
  password:        document.getElementById('password'),
  confirmPassword: document.getElementById('confirmPassword'),
};

const errors = {
  username:        document.getElementById('usernameError'),
  email:           document.getElementById('emailError'),
  age:             document.getElementById('ageError'),
  password:        document.getElementById('passwordError'),
  confirmPassword: document.getElementById('confirmPasswordError'),
};

const successBanner = document.getElementById('successBanner');

function setError(field, msg) {
  errors[field].textContent = msg ? '✕ ' + msg : '';
  fields[field].classList.toggle('error', !!msg);
  fields[field].classList.toggle('valid', !msg);
}

function validateUsername() {
  const val = fields.username.value.trim();
  if (!val) return setError('username', 'Username is required.');
  if (val.length < 3) return setError('username', 'Must be at least 3 characters.');
  if (val.length > 20) return setError('username', 'Must be 20 characters or fewer.');
  if (!/^[a-zA-Z0-9_]+$/.test(val)) return setError('username', 'Only letters, numbers, and underscores.');
  setError('username', '');
  return true;
}

function validateEmail() {
  const val = fields.email.value.trim();
  if (!val) return setError('email', 'Email is required.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return setError('email', 'Enter a valid email address.');
  setError('email', '');
  return true;
}

function validateAge() {
  const val = fields.age.value.trim();
  if (!val) return setError('age', 'Age is required.');
  const num = Number(val);
  if (!Number.isInteger(num)) return setError('age', 'Age must be a whole number.');
  if (num < 18) return setError('age', 'You must be at least 18.');
  if (num > 120) return setError('age', 'Enter a realistic age (≤ 120).');
  setError('age', '');
  return true;
}

function validatePassword() {
  const val = fields.password.value;
  if (!val) return setError('password', 'Password is required.');
  if (val.length < 8) return setError('password', 'Must be at least 8 characters.');
  if (!/[0-9]/.test(val)) return setError('password', 'Must contain at least one number.');
  setError('password', '');
  return true;
}

function validateConfirmPassword() {
  const val = fields.confirmPassword.value;
  if (!val) return setError('confirmPassword', 'Please confirm your password.');
  if (val !== fields.password.value) return setError('confirmPassword', 'Passwords do not match.');
  setError('confirmPassword', '');
  return true;
}

fields.username.addEventListener('blur', validateUsername);
fields.email.addEventListener('blur', validateEmail);
fields.age.addEventListener('blur', validateAge);
fields.password.addEventListener('blur', validatePassword);
fields.confirmPassword.addEventListener('blur', validateConfirmPassword);

fields.password.addEventListener('input', () => {
  if (fields.confirmPassword.value) validateConfirmPassword();
});

document.getElementById('submitBtn').addEventListener('click', () => {
  const results = [
    validateUsername(),
    validateEmail(),
    validateAge(),
    validatePassword(),
    validateConfirmPassword(),
  ];

  successBanner.classList.remove('show');

  if (results.every(r => r === true)) {
    successBanner.classList.add('show');
    successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});