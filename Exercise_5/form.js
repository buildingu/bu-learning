function formValidator(firstName, lastName, age, phoneNumber) {
  const errors = [];

  // First Name
  if (firstName == null || firstName === "") {
    errors.push("The firstName input is missing.");
  }
  else if (typeof firstName !== "string") {
    errors.push("The first name should be a string.");
  }

  // Last Name
  if (lastName == null || lastName === "") {
    errors.push("The lastName input is missing.");
  }
  else if (typeof lastName !== "string") {
    errors.push("The last name should be a string.");
  }

  // Age
  if (age == null) {
    errors.push("The age input is missing.");
  }
  else if (typeof age !== "number") {
    errors.push("The age should be a number.");
  }
  else if (age < 18) {
    errors.push("Sorry, not old enough for our app.");
  }

  // Phone Number
  if (phoneNumber == null || phoneNumber === "") {
    errors.push("The phone number input is missing.");
  }
  else if (typeof phoneNumber !== "string") {
    errors.push("The phone number should be a string.");
  }
  else if (phoneNumber.length !== 10) {
    errors.push("The phone number must be exactly 10 digits.");
  }
  else if (isNaN(Number(phoneNumber))){
    errors.push("The phone number must be all digits.");
  }
  

  // Output
  if (errors.length > 0) {
    for (let i = 0; i < errors.length; i++) {
      console.log(errors[i]);
    }
  } else {
    console.log("WELCOME TO THE ADOS APP.");
  }
}

// Test calls
console.log("\nTest 1 (All valid):");
formValidator("Devansh", "Malhotra", 18, "0123456789");

console.log("\nTest 2 (Underage):");
formValidator("Devansh", "Malhotra", 15, "0123456789");

console.log("\nTest 3 (No age and phone number):");
formValidator("Devansh", "Malhotra", null, "");

console.log("\nTest 4 (Wrong types):");
formValidator(123, "Malhotra", "eighteen", 123456);

console.log("\nTest 5 (Empty last name & invalid phone number):");
formValidator("Devansh", "", 20, "01a34b67s9");
