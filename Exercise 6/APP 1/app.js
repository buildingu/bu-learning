/*
  Form Validator
  - Name: at least 2 letters, letters/spaces only
  - Email: must look like user@example.com
  - Age: number 13–120
  - Password: 8+ chars with a letter and a number
  - Confirm: must match password
*/

// Setup UI container dynamically (so HTML only has inputs+button)
(function initUI(){
  const body = document.body;
  const stack = document.createElement('div');
  stack.className = 'stack';

  const ids = ['name','email','age','password','confirm','validateBtn'];
  ids.forEach(id => stack.appendChild(document.getElementById(id)));

  const errors = document.createElement('div');
  errors.id = 'errors';
  const success = document.createElement('div');
  success.id = 'success';

  stack.appendChild(errors);
  stack.appendChild(success);

  const title = document.createElement('h2');
  title.textContent = 'Form Validator';
  const helper = document.createElement('p');
  helper.textContent = 'Enter details and press Validate.';

  helper.style.color = 'var(--muted)';
  helper.style.marginTop = '-4px';

  stack.prepend(helper);
  stack.prepend(title);

  body.appendChild(stack);
})();

function validate(){
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const age = document.getElementById('age').value.trim();
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm').value;

  const errors = [];

  // Name
  if(!/^[A-Za-z][A-Za-z ]{1,}$/.test(name)){
    errors.push('Name must be at least 2 letters, letters/spaces only.');
  }

  // Email
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    errors.push('Enter a valid email address.');
  }

  // Age
  const ageInt = parseInt(age, 10);
  if(Number.isNaN(ageInt)){
    errors.push('Age must be a number.');
  } else if(ageInt < 13 || ageInt > 120){
    errors.push('Age must be between 13 and 120.');
  }

  // Password
  if(password.length < 8 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)){
    errors.push('Password must be 8+ chars with letters & numbers.');
  }

  // Confirm
  if(password !== confirm){
    errors.push('Passwords do not match.');
  }

  // Display
  const errorsBox = document.getElementById('errors');
  const successBox = document.getElementById('success');
  errorsBox.textContent = '';
  successBox.textContent = '';

  if(errors.length){
    errorsBox.textContent = errors.map(e => `• ${e}`).join('\\n');
  } else {
    successBox.textContent = 'All validations passed';
  }
}

document.getElementById('validateBtn').addEventListener('click', validate);
