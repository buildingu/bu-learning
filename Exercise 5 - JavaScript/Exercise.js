function formValidator(firstName, lastName, age, phone) {
    const variables = [
        { title: "first name", value: firstName },
        { title: "last name", value: lastName },
        { title: "age", value: age },
        { title: "phone number", value: phone }
    ];
    for (const elem of variables) {
        if (elem.value === undefined || elem.value === "") {
            console.log(`The ${elem.title} input is missing.`);
            return;
        }
        if (elem.title === "age" && typeof(elem.value) !== "number") {
            console.log(`The ${elem.title} should be a number`);
            return;
        } else if (elem.title !== "age" && typeof(elem.value) !== "string") {
            console.log(`The ${elem.title} should be a string`);
            return;
        }
    }
    if (age < 18) {
        console.log("Sorry, not old enough for our app.");
        return;
    }
    console.log("WELCOME TO THE ADOS APP.");
}
