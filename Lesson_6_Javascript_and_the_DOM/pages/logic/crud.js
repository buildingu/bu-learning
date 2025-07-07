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
/* Validation Function */
const formValidator = (firstName, lastName, age, phoneNumber) => {
    let information = [MESSAGES.WELCOME, true];

    /* === CHECK FOR MISSING PARAMETERS === */
    
    if (firstName == null || (typeof firstName === 'string' && firstName.trim() === '')) {
        information = [MESSAGES.FIRST_NAME_MISSING, false];
        return information;
    }
    if (lastName == null || (typeof lastName === 'string' && lastName.trim() === '')) {
        information = [MESSAGES.LAST_NAME_MISSING, false];
        return information;
    }
    if (age == null || (typeof age === 'string' && age.trim() === '')) {
        information = [MESSAGES.AGE_MISSING, false];
        return information;
    }
    if (phoneNumber == null || (typeof phoneNumber === 'string' && phoneNumber.trim() === '')) {
        information = [MESSAGES.PHONE_MISSING, false];
        return information;
    }

    /* === VALIDATE PARAMETER TYPES === */

    if (typeof firstName !== 'string') {
        information = [MESSAGES.FIRST_NAME_TYPE, false];
        return information;
    }
    if (typeof lastName !== 'string') {
        information = [MESSAGES.LAST_NAME_TYPE, false];
        return information;
    }
    if (typeof phoneNumber !== 'string') {
        information = [MESSAGES.PHONE_TYPE, false];
        return information;
    }
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum)) {
        information = [MESSAGES.AGE_TYPE, false];
        return information;
    }

    /* === VALIDATE AGE VALUE === */
    
    if (ageNum < 18) {
        information = [MESSAGES.AGE_RESTRICTION, false];
        return information;
    }

    /* === ALL VALIDATIONS PASSED === */
    return information;
}

/* ====== EVENT LISTENERS ===== */

/* Form Submission Listener */
document.getElementById('validationForm').addEventListener('submit', (event) => {

    /* === FORM HANDLING AND ORGANIZATION === */

    event.preventDefault();
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
    
    /* === DETERMINE USER INFORMATION === */
    
    const firstName = document.getElementById('fname').value.trim();
    const lastName = document.getElementById('lname').value.trim();
    const age = document.getElementById('age').value.trim();
    const phoneNumber = document.getElementById('phone').value.trim();
    
    /* === VALIDATION === */
    
    const [message, isValid] = formValidator(firstName, lastName, age, phoneNumber);
    
    /* === MESSAGE DETERMINATION AND DISPLAY === */
    
    const messageElement = document.getElementById(isValid ? 'successMessage' : 'errorMessage');
    const successMessage = editMode ? MESSAGES.UPDATE_SUCCESS : MESSAGES.ADD_SUCCESS;
    let h3 = messageElement.querySelector('h3');
    if (!h3) {
        h3 = document.createElement('h3');
        messageElement.appendChild(h3);
    }
    h3.textContent = isValid ? successMessage : message;
    messageElement.style.display = 'block';

    /* === FUNCTIONALITY === */

    if (isValid) {
        if (!editMode) {
            let userInformation = [firstName, lastName, age, phoneNumber];
            const entryBlock = createEntryBlock(userInformation);
            document.getElementById('userData').appendChild(entryBlock);
        }
        // If valid and editing, update the existing entry
        else if (editMode && currentEditElement) {
            // Create a new entry block with updated data
            const updatedEntry = createEntryBlock([firstName, lastName, age, phoneNumber]);
            
            // Replace the old entry with the updated one
            currentEditElement.replaceWith(updatedEntry);
        
            // Reset form and state
            document.getElementById('validationForm').reset();
            editMode = false;
            currentEditElement = null;
            document.querySelector('.submit-btn span').textContent = 'Add Entry';
        }
    }

});