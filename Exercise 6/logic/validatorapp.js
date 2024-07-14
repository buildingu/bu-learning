const form = document.getElementById('form').value;
const name = document.getElementById('name').value; 
const emailInput = document.getElementById('email').value;
const ageInput = document.getElementById('age').value;
const passwordInput = document.getElementById('password').value;
const errorMessage = document.getElementById('error-message').value;

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    let hasError = false;
    
    if (nameInput.value === '') {
        errorMessage.innerText = 'Please fill in the Name field.';
        hasError = true;
    }
    
    if (emailInput.value === '') {
        errorMessage.innerText = 'Please fill in the Email field.';
        hasError = true;
    }
    
    if (ageInput.value === '') {
        errorMessage.innerText = 'Please fill in the Age field.';
        hasError = true;
    }
    if (ageInput.value <= 18){
        errorMessage.innerText = 'You must be 18 years or older to register.';
        hasError = true;
    }
    
    if (passwordInput.value === '') {
        errorMessage.innerText = 'Please fill in the Password field.';
        hasError = true;
    }
    
    if (!hasError) {
        // Form submission logic (you can add more validation here)
        errorMessage.innerText = '';
        form.reset();
        alert('Form submitted successfully!');
    }
});



// function validateForm() {
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const age = document.getElementById('age').value;
//     const password = document.getElementById('password').value;

//     document.getElementById('nameError').innerText = name ? '' : 'Please fill out the name section';
//     document.getElementById('emailError').innerText = email ? '' : 'Please fill out the email section';
//     document.getElementById('ageError').innerText = age ? '' : 'Please fill out the age section';
//     document.getElementById('passwordError').innerText = password ? '' : 'Please fill out the password section';

//     return name && email && age && password;
// }