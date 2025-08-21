function formValidator(first, last, age, phone) {
    let valid = true;
    const inputs = [
        { name: "first name", value: first, type: "string"},
        { name: "last name", value: last, type: "string"},
        { name: "age", value: age, type: "number"},
        { name: "phone", value: phone, type: "string"}
    ]
    for(i = 0; i < inputs.length; i++) {
        if(inputs[i].value === "" || inputs[i].value === "null") {
            console.log(`The ${inputs[i].name} is empty`);
            valid = false;
        }
        if(typeof inputs[i].value !== inputs[i].type) {
            console.log(`The ${inputs[i].name} is formatted incorrectly`);
            valid = false;
        }
        let ageval = inputs.find(input => input.name === "age").value;
        if(ageval < 18 && !isNaN(ageval)) {
            console.log("Sorry, not old enough for our app.");
            valid = false;
        }
    }
    if(valid) {
        console.log("WELCOME TO THE ADOS APP.");
    }
}
formValidator("Jane", "Doe", 25, "123-456-7890");