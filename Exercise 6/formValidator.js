const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const ageInput = document.getElementById('age');
const phoneNumberInput = document.getElementById('phoneNumber');
const submitBtn = document.getElementById('submitBtn');
const messageDiv = document.getElementById('message');

function formValidator(firstName, lastName, age, phoneNumber) {

    switch(true){

        case (firstName === undefined || firstName === "" || firstName === null):
        
        messageDiv.textContent = "The first name input is missing.";
        messageDiv.className = 'error';
        return;
        
        case (lastName === undefined || lastName === "" || lastName === null):
        
        messageDiv.textContent = "The last name input is missing.";
        messageDiv.className = 'error';
        return;


        case (age === undefined || age === "" || age === null):
        
        messageDiv.textContent = "The age input is missing.";
        messageDiv.className = 'error';
        return;
        
        case (phoneNumber === undefined || phoneNumber === "" || phoneNumber === null):
        
        messageDiv.textContent = "The phone number input is missing.";
        messageDiv.className = 'error';
        return;


        case (typeof firstName !== 'string'):
            messageDiv.textContent = "The first name should be a string.";
            messageDiv.className = 'error';
            return;

        case (typeof lastName !== 'string'):
            messageDiv.textContent = "The last name should be a string.";
            messageDiv.className = 'error';
            return;

        case (typeof phoneNumber !== 'string'):
            messageDiv.textContent = "The phone number should be a string.";
            messageDiv.className = 'error';
            return;

        case (typeof age !== 'number' || isNaN(age)):
            messageDiv.textContent = "The age should be a number.";
            messageDiv.className = 'error';
            return;
        
        case (age < 18):
            messageDiv.textContent = "Sorry, not old enough for our app.";
            messageDiv.className = 'error';
            return;


        default: 
            messageDiv.textContent = "WELCOME TO THE ADOS APP.";
            messageDiv.className = 'success';
            
            // Clear inputs on success
            firstNameInput.value = '';
            lastNameInput.value = '';
            ageInput.value = '';
            phoneNumberInput.value = '';

    }

}

// Submit button click
submitBtn.addEventListener('click', function() {
    
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const age = Number(ageInput.value);
    const phoneNumber = phoneNumberInput.value;
    
    formValidator(firstName, lastName, age, phoneNumber);
    
});