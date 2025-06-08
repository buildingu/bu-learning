function formValidator(firstName, lastName, age, phonePart1, phonePart2, phonePart3) {
    const errors = [];

    if (!firstName) {
        errors.push("The first name input is missing.");
    } else if (!/^[A-Za-z\s\-,]+$/.test(firstName)) {
        errors.push("The first name should contain only letters.");
    }

    if (!lastName) {
        errors.push("The last name input is missing.");
    } else if (!/^[A-Za-z\s\-,]+$/.test(lastName)) {
        errors.push("The last name should contain only letters.");
    }

    if (age === undefined || age === null || age === "") {
        errors.push("The age input is missing.");
    } else if (isNaN(age)) {
        errors.push("The age should be a number.");
    } else if (age < 18) {
        errors.push("Sorry, not old enough for our app.");
    }

    if (!/^\d{3}$/.test(phonePart1)) {
        errors.push("Phone number part 1 must be exactly 3 digits.");
    }
    if (!/^\d{3}$/.test(phonePart2)) {
        errors.push("Phone number part 2 must be exactly 3 digits.");
    }
    if (!/^\d{4}$/.test(phonePart3)) {
        errors.push("Phone number part 3 must be exactly 4 digits.");
    }

    return errors;
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const age = Number(document.getElementById("age").value.trim());
        const phonePart1 = document.getElementById("phonePart1").value.trim();
        const phonePart2 = document.getElementById("phonePart2").value.trim();
        const phonePart3 = document.getElementById("phonePart3").value.trim();

        const errors = formValidator(firstName, lastName, age, phonePart1, phonePart2, phonePart3);

        if (errors.length > 0) {
            alert("Please fix the following errors:\n\n" + errors.join("\n"));
        } else {
            alert("WELCOME TO THE ADOS APP.");

            document.getElementById("firstName").value = "";
            document.getElementById("lastName").value = "";
            document.getElementById("age").value = "";
            document.getElementById("phonePart1").value = "";
            document.getElementById("phonePart2").value = "";
            document.getElementById("phonePart3").value = "";
        }
    });
});
