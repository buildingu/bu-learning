const fNameInput = document.querySelector('#js-fName-input');
const lNameInput = document.querySelector('#js-lName-input');
const ageInput = document.querySelector('#js-age-input');
const phoneNumInput = document.querySelector('#js-phoneNum-input');
const validateButton = document.querySelector('#js-validate-button');

let formFeedback;

function formValidator(fNameInput, lNameInput, ageInput, phoneNumInput) {
  const errors = [];

  if (!fNameInput.value) {
    errors.push('The first name input is missing');
  }
  if (!lNameInput.value) {
    errors.push('The last name input is missing');
  }
  if (!ageInput.value) {
    errors.push('The age input is missing');
  } else if (ageInput.value < 18) {
    errors.push('Sorry, not old enough for our app.');
  }
  if (!phoneNumInput.value) {
    errors.push('The phone number input is missing');
  } else if (typeof phoneNumInput.value !== 'string') {
    errors.push('The phone number should be a string');
  }

  if (errors.length === 0) {
    return 'WELCOME TO THE ADOS APP.';
  } else {
    return errors;
  }
}

let formContainer = document.getElementById('js-form-container');
let errorContainer = document.createElement('div');
let newParagraph = document.createElement('p');

validateButton.addEventListener('click', () => {
  newParagraph.innerText = '';
  formFeedback = formValidator(fNameInput, lNameInput, ageInput, phoneNumInput);

  if (formFeedback === 'WELCOME TO THE ADOS APP.') {
    formContainer.insertBefore(errorContainer, fNameInput);

    newParagraph.innerText = formFeedback;
    newParagraph.style.color = 'green';

    errorContainer.appendChild(newParagraph);
  } else {
    formContainer.insertBefore(errorContainer, fNameInput);
    formFeedback.forEach((error) => {
      newParagraph.innerText += error + '\n';
      newParagraph.style.color = 'red';
      errorContainer.appendChild(newParagraph);
    });
  }
});
