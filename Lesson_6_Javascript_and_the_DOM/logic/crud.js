/* ========== GLOBAL VARIABLES ========== */
/* Trackables for Edit Logic */
let editMode = false; // Tracks edit mode (currently affecting sent data)
let currentEditElement = null; // Will store the DOM element being edited
/* User Messages */
const MESSAGES = {
    WELCOME: 'Welcome to the ADOS app',
    FIRST_NAME_MISSING: 'The first name input is missing.',
    LAST_NAME_MISSING: 'The last name input is missing.',
    AGE_MISSING: 'The age input is missing.',
    PHONE_MISSING: 'The phone number input is missing.',
    FIRST_NAME_TYPE: 'The first name should be a string',
    LAST_NAME_TYPE: 'The last name should be a string',
    PHONE_TYPE: 'The phone number should be a string',
    AGE_TYPE: 'The age should be a number',
    AGE_RESTRICTION: 'Sorry, not old enough for our app.',
    UPDATE_SUCCESS: 'Entry updated successfully',
    ADD_SUCCESS: 'Welcome to ADOS app'
};

/* ====== ELEMENT CREATION FUNCTIONS ===== */

/* Delete Button Creation Function */
const createDeleteButton = () => {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        // Hide any visible messages
        document.getElementById('errorMessage').style.display = 'none';
        document.getElementById('successMessage').style.display = 'none';
        const entryBlock = deleteButton.parentElement;
        // If we're deleting the entry that's currently being edited
        if (currentEditElement === entryBlock) {
            // Reset the form and edit state
            document.getElementById('validationForm').reset();
            editMode = false;
            currentEditElement = null;
            document.querySelector('.submit-btn span').textContent = 'Add Entry';
        }
        entryBlock.remove();
    });
    return deleteButton;
}
/* Edit Button Creation Function */
const createEditButton = (userInformation, entryBlock) => {
    const editButton = document.createElement('button');
    editButton.classList.add('btn');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents event bubbling (going to parent elements)
        // Hide any visible messages
        document.getElementById('errorMessage').style.display = 'none';
        document.getElementById('successMessage').style.display = 'none';
        refillForm(userInformation);
        editMode = true;
        currentEditElement = entryBlock; // Sets Global variable to the entry block being edited
        document.querySelector('.submit-btn span').textContent = 'Update Entry';
    });
    return editButton;
}
/* Full Entry Block Creation Function */
const createEntryBlock = (userInformation) => {
    const entryBlock = document.createElement('div');
    const editButton = createEditButton(userInformation, entryBlock);
    const deleteButton = createDeleteButton();
    
    entryBlock.classList.add('entry-block');
    entryBlock.innerHTML = `
        <div class="pfp">${userInformation[0].charAt(0).toUpperCase()}</div>
        <p><strong>First Name:</strong> ${userInformation[0]}</p>
        <p><strong>Last Name:</strong> ${userInformation[1]}</p>
        <p><strong>Age:</strong> ${userInformation[2]}</p>
        <p><strong>Phone Number:</strong> ${userInformation[3]}</p>
    `;
    
    entryBlock.appendChild(editButton);
    entryBlock.appendChild(deleteButton);
    return entryBlock;
}

/* ====== UTILITY FUNCTIONS ===== */

/* Refill form with User Data */
const refillForm = (userInformation) => {
    const [firstName, lastName, age, phoneNumber] = userInformation;
    document.getElementById('fname').value = firstName;
    document.getElementById('lname').value = lastName;
    document.getElementById('age').value = age;
    document.getElementById('phone').value = phoneNumber;
}

/* == VALIDATION FUNCTIONS == */

/* Check for missing parameters */
const validateMissingParams = (userData) => {
    if (userData[0] == null || (typeof userData[0] === 'string' && userData[0].trim() === '')) {
        return [MESSAGES.FIRST_NAME_MISSING, false];
    }
    if (userData[1] == null || (typeof userData[1] === 'string' && userData[1].trim() === '')) {
        return [MESSAGES.LAST_NAME_MISSING, false];
    }
    if (userData[2] == null || (typeof userData[2] === 'string' && userData[2].trim() === '')) {
        return [MESSAGES.AGE_MISSING, false];
    }
    if (userData[3] == null || (typeof userData[3] === 'string' && userData[3].trim() === '')) {
        return [MESSAGES.PHONE_MISSING, false];
    }
    return null; // No missing parameters, no error to return
}
/* Check for valid parameter types */
const validateParamTypes = (userData) => {
    if (typeof userData[0] !== 'string') {
        return MESSAGES.FIRST_NAME_TYPE;
    }
    if (typeof userData[1] !== 'string') {
        return MESSAGES.LAST_NAME_TYPE;
    }
    if (typeof userData[3] !== 'string') {
        return MESSAGES.PHONE_TYPE;
    }
    const ageNum = parseInt(userData[2], 10);
    if (isNaN(ageNum)) {
        return MESSAGES.AGE_TYPE;
    }
    
    return null; // All types are valid, no error to return
}
/* Check for valid age value */
const validateAgeValue = (ageNum) => {
    if (ageNum < 18) {
        return MESSAGES.AGE_RESTRICTION;
    }
    return null; // Age is valid, no error to return
}

/* === Main Validation Function === */

const formValidator = (userData) => {
    /* === CHECK FOR MISSING PARAMETERS === */
    const missingParamError = validateMissingParams(userData);
    if (missingParamError) return [missingParamError, false];
    
    /* === VALIDATE PARAMETER TYPES === */
    const paramTypeError = validateParamTypes(userData);
    if (paramTypeError) return [paramTypeError, false];
    
    /* === VALIDATE AGE VALUE === */
    const ageNum = parseInt(userData[2], 10);
    const ageValidation = validateAgeValue(ageNum);
    if (ageValidation) return [ageValidation, false];
    
    /* === ALL VALIDATIONS PASSED === */
    return [MESSAGES.WELCOME, true]; // default return
}

/* ====== EVENT LISTENERS ===== */

/* ====== FORM SUBMISSION HELPERS ===== */

/* Reset Form and Edit State */
const resetFormAndState = () => {
    document.getElementById('validationForm').reset();
    editMode = false;
    currentEditElement = null;
    document.querySelector('.submit-btn span').textContent = 'Add Entry';
}
/* Display Form Message */
const displayFormMessage = (isValid, message) => {
    const messageElement = document.getElementById(isValid ? 'successMessage' : 'errorMessage');
    const successMessage = editMode ? MESSAGES.UPDATE_SUCCESS : MESSAGES.ADD_SUCCESS;
    
    let h3 = messageElement.querySelector('h3');
    if (!h3) {
        h3 = document.createElement('h3');
        messageElement.appendChild(h3);
    }
    
    h3.textContent = isValid ? successMessage : message;
    messageElement.style.display = 'block';
}
/* Handle New Entry Creation */
const handleNewEntry = (userData) => {
    const [firstName, lastName, age, phoneNumber] = userData;
    const entryBlock = createEntryBlock([firstName, lastName, age, phoneNumber]);
    document.getElementById('userData').appendChild(entryBlock);
}
/* Handle Entry Update */
const handleEntryUpdate = (userData) => {
    if (!currentEditElement) return;
    
    const [firstName, lastName, age, phoneNumber] = userData;
    const updatedEntry = createEntryBlock([firstName, lastName, age, phoneNumber]);
    currentEditElement.replaceWith(updatedEntry);
}

/* ====== MAIN FORM SUBMISSION LISTENER ===== */

document.getElementById('validationForm').addEventListener('submit', (event) => {
    /* === FORM HANDLING AND ORGANIZATION === */
    event.preventDefault();
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
    
    /* === PACK USER INFORMATION === */
    const userData = [
        document.getElementById('fname').value.trim(),
        document.getElementById('lname').value.trim(),
        document.getElementById('age').value.trim(),
        document.getElementById('phone').value.trim()
    ];
    
    /* === VALIDATION === */
    const [message, isValid] = formValidator(userData);
    
    /* === MESSAGE DISPLAY === */
    displayFormMessage(isValid, message);

    /* === FUNCTIONALITY === */
    if (isValid) {
        if (!editMode) {
            handleNewEntry(userData);
        } else {
            handleEntryUpdate(userData);
        }
        resetFormAndState(); // only reset if the entry was succesful so users dont have to reset if they input wrong
    }
});