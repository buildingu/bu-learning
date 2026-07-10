// 1. Your HTML should contain only the necessary input elements and a button.
// 2. The form should have fields for NAME, AGE, SEX, and POSITION.
// 3. When the "Add Entry" button is clicked, the entered information should be displayed on the
// web page.
// 4. Each entry should have a delete and edit button (to be created via DOM manipulation).
// 5. Clicking the “edit” button should allow the user to change the contents of that entry.
// 6. Clicking the “delete” button should remove the selected entry from the page.
// 7. Design is up to you, but ensure the app is well-designed and responsive.

const fNameInput = document.querySelector('#js-fName-input');
const lNameInput = document.querySelector('#js-lName-input');
const ageInput = document.querySelector('#js-age-input');
const sexInput = document.querySelector('#js-sex-input');
const positionInput = document.querySelector('#js-position-input');
const addEntryButton = document.querySelector('#js-add-entry-button');
const employeeContainer = document.querySelector('.employee-container');

let employeeCard;

let formContainer = document.getElementById('js-form-container');
let errorContainer = document.createElement('div');
let newParagraph = document.createElement('p');

addEntryButton.addEventListener('click', () => {
  newParagraph.innerText = '';

  let employee = {
    firstName: fNameInput.value,
    lastName: lNameInput.value,
    Age: ageInput.value,
    Sex: sexInput.value,
    Position: positionInput.value,
  };

  if (checkErrors() === 'No errors') {
    addEmployee(employee);
  } else {
    return;
  }

  console.log(employee);
});

document.addEventListener('click', (event) => {
  if (event.target.matches('.js-delete-button')) {
    const container = event.target.closest('.employee-card');
    if (container) {
      container.remove();
    }
  }
});

function addEmployee(employee) {
  employeeCard = document.createElement('div');
  employeeContainer.appendChild(employeeCard);
  employeeCard.innerHTML = `<div class="employee-card">
        <h3>${employee.firstName} ${employee.lastName}</h3>
        <p>Age: ${employee.Age}</p>
        <p>Sex: ${employee.Sex}</p>
        <p>Position: ${employee.Position}</p>
        <button class="js-edit-button">Edit</button>
        <button class="js-delete-button">Delete</button>
      </div>`;
  clearInputField();
}

function clearInputField() {
  fNameInput.value = '';
  lNameInput.value = '';
  ageInput.value = '';
  positionInput.value = '';
}

function formValidator(fNameInput, lNameInput, ageInput, positionInput) {
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
  if (!positionInput.value) {
    errors.push('The position input is missing');
  } else if (typeof positionInput.value !== 'string') {
    errors.push('The position should be a string');
  }

  if (errors.length === 0) {
    return 'No errors';
  } else {
    return errors;
  }
}

function checkErrors() {
  formFeedback = formValidator(fNameInput, lNameInput, ageInput, positionInput);

  if (formFeedback === 'No errors') {
    return 'No errors';
  } else {
    formContainer.insertBefore(errorContainer, fNameInput);
    formFeedback.forEach((error) => {
      newParagraph.innerText += error + '\n';
      newParagraph.style.color = 'red';
      errorContainer.appendChild(newParagraph);
    });
  }
}
