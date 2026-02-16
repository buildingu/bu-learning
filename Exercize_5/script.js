function formValidator(firstName, lastName, age, phoneNumber) {
   
    const inputs = [
        { name: "First Name", value: firstName, type: "string" },
        { name: "Last Name", value: lastName, type: "string" },
        { name: "Age", value: age, type: "number" },
        { name: "Phone Number", value: phoneNumber, type: "string" }
    ];


    for (let input of inputs) {
        if (input.value === undefined || input.value === null || input.value === "") {
            console.log(`The ${input.name} input is missing.`);
            return;
        }
    }

 
    for (let input of inputs) {
        if (typeof input.value !== input.type) {
            console.log(`The ${input.name} should be a ${input.type}.`);
            return;
        }
    }


    if (age < 18) {
        console.log("Sorry, not old enough for our app.");
        return;
    }

   
    console.log("WELCOME TO THE ADOS APP.");
}

formValidator("Jane", "Doe", 25, "123-456-7890");
