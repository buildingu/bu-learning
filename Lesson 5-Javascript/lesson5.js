function validateInput(input) {
    let isValid = true;
    let errorMessage = '';

    switch (input.name) {
        case 'first_name':
        case 'last_name':
            if (!/^[a-zA-Z]+$/.test(input.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid name (with letters only)';
            }
            break;
        case 'age':
            if (!/^\d+$/.test(input.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid age (with numbers only)';
            } else if (parseInt(input.value, 10) < 18) {
                isValid = false;
                errorMessage = 'Sorry, not old enough for our app';
            }
            break;
        case 'phone_no':
            if (!/^\d+$/.test(input.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
            break;
    }

    return { isValid, errorMessage };
}

function validateAndShowErrors(form) {
    const requiredFields = [
        { input: form.first_name, errorSpan: 'first_name_error' },
        { input: form.last_name, errorSpan: 'last_name_error' },
        { input: form.age, errorSpan: 'age_error' },
        { input: form.phone_no, errorSpan: 'phone_no_error' }
    ];
    let isFormValid = true;

    requiredFields.forEach(({ input, errorSpan }) => {
        const errorElement = document.getElementById(errorSpan);
        errorElement.textContent = '';
        errorElement.style.visibility = 'hidden';
        input.classList.remove('invalid-input');
    });

    requiredFields.forEach(({ input, errorSpan }) => {
        const errorElement = document.getElementById(errorSpan);

        if (!input.value) {
            errorElement.textContent = `${input.name.replace('_', ' ')} is required`;
            errorElement.style.visibility = 'visible';
            input.classList.add('invalid-input');
            isFormValid = false;
        } else {
            const validationResult = validateInput(input);
            if (!validationResult.isValid) {
                errorElement.textContent = validationResult.errorMessage;
                errorElement.style.visibility = 'visible';
                input.classList.add('invalid-input');
                isFormValid = false;
            }
        }
    });
    return isFormValid;
}

document.getElementById('myForm').addEventListener('submit', function(event) {
    const isFormValid = validateAndShowErrors(this);

    if (!isFormValid) {
        event.preventDefault();
        return;
    }

    event.preventDefault();
    document.getElementById('submissionSuccess').style.display = 'block';
    this.reset();
});
