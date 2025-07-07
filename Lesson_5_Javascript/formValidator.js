// Rule 1: function name:"formValidator"
// Rule 2: parameters: (firstName, lastName, age, phoneNumber)
const formValidator = (firstName, lastName, age, phoneNumber) => {
    // Rule 3: Check for missing parameters (null/undefined/empty string) — Ordered precisely to ensure no errors with short circuit evaluation
    if (firstName == null || (typeof firstName === 'string' && firstName.trim() === '')) return "The first name input is missing.";
    if (lastName == null || (typeof lastName === 'string' && lastName.trim() === '')) return "The last name input is missing.";
    if (age == null || (typeof age === 'string' && age.trim() === '')) return "The age input is missing.";
    if (phoneNumber == null || (typeof phoneNumber === 'string' && phoneNumber.trim() === '')) return "The phone number input is missing.";

    // Rule 4: Validate parameter types (string, number) — Assumes Input is of correct types regardless of form input collection
    if (typeof firstName !== 'string') return "The first name should be a string";
    if (typeof lastName !== 'string') return "The last name should be a string";
    if (typeof phoneNumber !== 'string') return "The phone number should be a string";
    if (typeof age !== 'number') return "The age should be a number";

    // Rule 5: Validate age value (18+)
    if (age < 18) return "Sorry, not old enough for our app.";

    // Rule 6: All validations passed
    return "WELCOME TO THE ADOS APP";
}