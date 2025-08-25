function validateForm(form) {
    const firstNameInput = form.first_name;
    const lastNameInput = form.last_name;
    const ageInput = form.age;
    const phoneNoInput = form.phone_no;

    let isValid = true;

    isValid = validateAndShowErrors(form);

    return isValid;
}

function resetForm(form) {
    form.reset();
    form.first_name.setCustomValidity('');
    form.last_name.setCustomValidity('');
    form.age.setCustomValidity('');
    form.phone_no.setCustomValidity('');
}

function validateInput(input) {
    let isValid = true;

    input.setCustomValidity('');

    switch (input.name) {
        case 'first_name':
        case 'last_name':
            if (!/^[a-zA-Z]+$/.test(input.value)) {
                input.setCustomValidity('Please enter a valid name');
                isValid = false;
            }
            break;
        case 'age':
            if (!/^\d+$/.test(input.value)) {
                input.setCustomValidity('Please enter a valid age');
                isValid = false;
            } else if (parseInt(input.value, 10) < 18) {
                input.setCustomValidity('Sorry, not old enough for our app');
                isValid = false;
            }
            break;
        case 'phone_no':
            if (!/^\d+$/.test(input.value)) {
                input.setCustomValidity('Please enter a valid phone number');
                isValid = false;
            }
            break;
    }

    return isValid;
}

function validateAndShowErrors(form) {
    const requiredFields = [
        { input: form.first_name, errorSpan: 'first_name_error' },
        { input: form.last_name, errorSpan: 'last_name_error' },
        { input: form.age, errorSpan: 'age_error' },
        { input: form.phone_no, errorSpan: 'phone_no_error' }
    ];
    let allFilled = true;

    requiredFields.forEach(({ input, errorSpan }) => {
        document.getElementById(errorSpan).style.visibility = 'hidden';
        input.classList.remove('invalid-input');
    });

    requiredFields.forEach(({ input, errorSpan }) => {
        if (!input.value) {
            const errorElement = document.getElementById(errorSpan);
            errorElement.textContent = 'This field is required';
            errorElement.style.visibility = 'visible';
            input.classList.add('invalid-input');
            allFilled = false;
        }
    });

    return allFilled;
}


