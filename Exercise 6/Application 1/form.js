function formValidator() { // Form Validator function
    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;
    let age = document.getElementById("age").value;
    let phoneNumber = document.getElementById("phonenumber").value;
    let messageDiv = document.createElement("div");
            messageDiv.style.fontFamily = "Alte Haas Grotesk";
            messageDiv.style.color = "rgb(30, 24, 19)";
            messageDiv.style.textAlign = "center";

        // input missing check
        if (firstName == null || (firstName.trim() === "")) {
            messageDiv.textContent = "The first name input is missing";
            document.body.appendChild(messageDiv);
            return messageDiv;
        }
        if (lastName == null || (lastName.trim() === "")) {
            messageDiv.textContent = "The last name input is missing";
            document.body.appendChild(messageDiv);
            return messageDiv;
        }
        if (age == null || (age.trim() === "")) {
            messageDiv.textContent = "The age input is missing";
            document.body.appendChild(messageDiv);
            return messageDiv;
        }
        if (phoneNumber == null || (phoneNumber.trim() === "")) {
            messageDiv.textContent = "The phone number input is missing";
            document.body.appendChild(messageDiv);
            return messageDiv;
        }
        // var type check
        if (typeof firstName === 'string') {
            messageDiv.textContent = "The first name should be a string";
            document.body.appendChild(messageDiv);
            return messageDiv;
        }
        if (typeof lastName === 'string') {
            messageDiv.textContent = "The last name should be a string";
            document.body.appendChild(messageDiv);
            return messageDiv;
        }
        if (typeof age === 'number' || (isNaN(parseInt(age)))) {
            messageDiv.textContent = "The age should be a number";
            document.body.appendChild(messageDiv);
            return messageDiv;
        }
        if (typeof phoneNumber === 'number' || (isNaN(phoneNumber))) {
            messageDiv.textContent = "The phone number should be a number";
            document.body.appendChild(messageDiv);
            return messageDiv;
        }
        // age verification
        if (parseInt(age) < 18) {
            messageDiv.textContent = "Sorry, not old enough for your app";
            document.body.appendChild(messageDiv);
            return messageDiv;
        }

            messageDiv.textContent = "WELCOME TO THE ADOS APP";
            return messageDiv;
        }