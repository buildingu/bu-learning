const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear any previous error messages
    errorMessage.innerText = '';
    
    let hasError = false;
    
    // Check if Name is empty
    if (nameInput.value.trim() === '') {
        errorMessage.innerText += 'Please fill in the Name field.\n';
        hasError = true;
    }
    
    // Check if Email is empty
    if (emailInput.value.trim() === '') {
        errorMessage.innerText += 'Please fill in the Email field.\n';
        hasError = true;
    }
    
    // Check if Age is empty
    if (ageInput.value.trim() === '') {
        errorMessage.innerText += 'Please fill in the Age field.\n';
        hasError = true;
    }
    
    // Validate Age (should be greater than or equal to 18)
    const age = parseInt(ageInput.value, 10);  // Convert age input to integer
    if (isNaN(age) || age < 18) {
        errorMessage.innerText += 'You must be 18 years or older to register.\n';
        hasError = true;
    }
    
    // Check if Password is empty
    if (passwordInput.value.trim() === '') {
        errorMessage.innerText += 'Please fill in the Password field.\n';
        hasError = true;
    }
    
    // If no errors, submit the form
    if (!hasError) {
        form.reset();
        alert('Form submitted successfully!');
    }
});