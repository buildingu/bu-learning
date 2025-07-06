const formValidator = (firstName, lastName, age, phoneNumber) => {
    let information = ["Welcome to the ADOS app", true];
    // 3: Check for missing parameters (null/undefined/empty string) — Ordered precisely to ensure no errors with short circuit evaluation
    if (firstName == null || (typeof firstName === 'string' && firstName.trim() === '')) {
        information = ["The first name input is missing.", false];
        return information;
    }
    if (lastName == null || (typeof lastName === 'string' && lastName.trim() === '')) {
        information = ["The last name input is missing.", false];
        return information;
    }
    if (age == null || (typeof age === 'string' && age.trim() === '')) {
        information = ["The age input is missing.", false];
        return information;
    }
    if (phoneNumber == null || (typeof phoneNumber === 'string' && phoneNumber.trim() === '')) {
        information = ["The phone number input is missing.", false];
        return information;
    }

    // 4: Validate parameter types (string, number) — Assumes Input is of correct types regardless of form input collection
    if (typeof firstName !== 'string') {
        information = ["The first name should be a string", false];
        return information;
    }
    if (typeof lastName !== 'string') {
        information = ["The last name should be a string", false];
        return information;
    }
    if (typeof phoneNumber !== 'string') {
        information = ["The phone number should be a string", false];
        return information;
    }
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum)) {
        information = ["The age should be a number", false];
        return information;
    }

    // 5: Validate age value (18+)
    if (ageNum < 18) {
        information = ["Sorry, not old enough for our app.", false];
        return information;
    }

    // 6: All validations passed
    return information;
}

document.getElementById('validationForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Hide any previous messages
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
    
    // Get form values
    const firstName = document.getElementById('fname').value.trim();
    const lastName = document.getElementById('lname').value.trim();
    const age = document.getElementById('age').value.trim();
    const phoneNumber = document.getElementById('phone').value.trim();
    
    // Validate
    const [message, isValid] = formValidator(firstName, lastName, age, phoneNumber);
    
    // Show appropriate message
    const messageElement = document.getElementById(isValid ? 'successMessage' : 'errorMessage');
    // Create a new h3 within error message element to match the styling
    const h3 = document.createElement('h3');
    h3.textContent = message;
    // Clear previous content (stray h3s and text nodes) and add the new message
    messageElement.innerHTML = '';
    messageElement.appendChild(h3);
    messageElement.style.display = 'block';
});