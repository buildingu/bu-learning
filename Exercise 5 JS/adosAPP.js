const readline = require("readline");

function formValidator(firstName, lastName, age, phone) {
  const params = { firstName, lastName, age, phone };
  const expectedTypes = {
    firstName: "string",
    lastName: "string",
    age: "number",
    phone: "string",
  };

  // Check for missing
  for (const field in params) {
    if (params[field] === undefined || params[field] === null || params[field] === "") {
      console.log(`❌ The ${field} input is missing.`);
      return false;
    }
  }

  // Check data types
  for (const field in expectedTypes) {
    if (typeof params[field] !== expectedTypes[field]) {
      console.log(`❌ The ${field} should be a ${expectedTypes[field]}.`);
      return false;
    }
  }

  // Age restriction
  if (params.age < 18) {
    console.log("❌ Sorry, not old enough for our app.");
    return false;
  }

  console.log("✅ WELCOME TO THE ADOS APP.");
  return true;
}

// Setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptInputs() {
  rl.question("Enter First Name: ", (firstName) => {
    rl.question("Enter Last Name: ", (lastName) => {
      rl.question("Enter Age: ", (ageInput) => {
        const age = Number(ageInput);
        rl.question("Enter Phone Number: ", (phone) => {
          const valid = formValidator(firstName, lastName, age, phone);

          if (valid) {
            showMenu();
          } else {
            console.log("\n❗ Try again...\n");
            promptInputs();
          }
        });
      });
    });
  });
}

function showMenu() {
  console.log("\n----- Menu -----");
  console.log("Press Ctrl + N → Register New User");
  console.log("Press Ctrl + Esc → Quit");

  // Listen for key combos
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on("data", function (key) {
    if (key.toString() === '\u001b') { // Escape key
      console.log("👋 Exiting app...");
      process.exit();
    }

    if (key.toString().toLowerCase() === '\u000e') { // Ctrl + N
      console.log("\n📄 New User Registration:\n");
      process.stdin.setRawMode(false);
      promptInputs();
    }
  });
}

// Start the program
console.log("🔐 Welcome to ADOS App CLI\n");
promptInputs();
