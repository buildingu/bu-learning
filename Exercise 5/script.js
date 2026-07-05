const firstName = document.getElementById('first_name');
const lastName = document.getElementById('last_name');
const age = document.getElementById('age');
const phone = document.getElementById('phone');

const btn = document.getElementById('btn');

btn.addEventListener('click', function(event) {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const ageValue = Number(age.value.trim());
    const phoneValue = phone.value.trim();
    const isNumericName = /^\d+$/.test(firstNameValue) || /^\d+$/.test(lastNameValue);

    if (firstNameValue === '') {
        alert('Please enter your first name.');
        event.preventDefault();
    } else if (lastNameValue === '') {
        alert('Please enter your last name.');
        event.preventDefault();
    } else if (age.value.trim() === '') {
        alert('Please enter your age.');
        event.preventDefault();
    } else if (phoneValue === '') {
        alert('Please enter your phone number.');
        event.preventDefault();
    } else if (isNumericName) {
        alert('First name and last name must not be numbers.');
        event.preventDefault();
    } else if (Number.isNaN(ageValue)) {
        alert('Age should be a number');
        event.preventDefault();
    } else if (ageValue < 18) {
        alert('Sorry not old enough for our program');
        event.preventDefault();
    } else {
        alert('Welcome to our ADOS app');
        event.preventDefault();
    }
});