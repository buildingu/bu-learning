const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const ageInput = document.getElementById('age');
const phoneNumberInput = document.getElementById('phoneNumber');
const validateBtn = document.getElementById('validateBtn');
const resultsDiv = document.getElementById('results');
const errorMessagesDiv = document.getElementById('errorMessages');
const successMessageDiv = document.getElementById('successMessage');

function formValidator(firstName, lastName, age, phoneNumber) {
    const errors = [];
    
    if (!firstName) errors.push("The first name input is missing.");
    if (!lastName) errors.push("The last name input is missing.");
    if (!phoneNumber) errors.push("The phone number input is missing.");
    if (age == null) errors.push("The age input is missing.");
    
    if (firstName && typeof firstName !== "string") errors.push("The first name should be a string.");
    if (lastName && typeof lastName !== "string") errors.push("The last name should be a string.");
    if (phoneNumber && typeof phoneNumber !== "string") errors.push("The phone number should be a string.");
    if (age != null && typeof age !== "number") errors.push("The age should be a number.");
    
    if (typeof age === "number" && age < 18) errors.push("Sorry, not old enough for our app.");
    
    return errors;
}

function displayErrors(errors) {
    errorMessagesDiv.innerHTML = '';
    
    if (errors.length > 0) {
        errors.forEach(error => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = error;
            errorMessagesDiv.appendChild(errorDiv);
        });
        
        showElement(errorMessagesDiv);
        hideElement(successMessageDiv);
    } else {
        hideElement(errorMessagesDiv);
        showElement(successMessageDiv);
    }
}

function showElement(element) {
    element.classList.remove('hidden');
}

function hideElement(element) {
    element.classList.add('hidden');
}

function validateForm() {
    const firstName = firstNameInput.value.trim() || null;
    const lastName = lastNameInput.value.trim() || null;
    const phoneNumber = phoneNumberInput.value.trim() || null;
    const ageValue = ageInput.value.trim();
    
    let age = null;
    if (ageValue !== '') {
        const parsedAge = parseFloat(ageValue);
        if (!isNaN(parsedAge)) {
            age = parsedAge;
        }
    }
    
    const errors = formValidator(firstName, lastName, age, phoneNumber);

    displayErrors(errors);
    showElement(resultsDiv);
    

    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

validateBtn.addEventListener('click', validateForm);

[firstNameInput, lastNameInput, ageInput, phoneNumberInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            validateForm();
        }
    });
});

[firstNameInput, lastNameInput, ageInput, phoneNumberInput].forEach(input => {
    input.addEventListener('input', () => {
        hideElement(resultsDiv);
    });
});