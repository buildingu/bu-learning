function formValidator(firstName, lastName, age, phoneNumber) { // Form Validator function

        // input missing check
        if (firstName == null || (firstName === "")) {
            return "The first name input is missing";
        }
        if (lastName == null || (lastName === "")) {
            return "The last name input is missing";
        }
        if (age == null || (age === "")) {
            return "The age input is missing";
        }
        if (phoneNumber == null || (phoneNumber === "")) {
            return "The phone number input is missing";
        }

        // var type check
        if (firstName !== "string") {
            return "The first name should be a string";
        }
        if (lastName !== "string") {
            return "The last name should be a string";
        }
        if (age !== "number") {
            return "The age should be a number";
        }
        if (phoneNumber !== "string") {
            return "The phone number should be a string";
        }

        // age verification
        if (age < 18) {
            return "Sorry, not old enough for your app";
        }

        else {
            return "WELCOME TO THE ADOS APP";
        }
}