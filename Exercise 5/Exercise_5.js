let users = [];

function formValidator(firstName, lastName, age, phoneNum) {
    let user = {};
    if (firstName === undefined) {
        console.log("First name is missing");
        return;
    }
    if (lastName === undefined) {
        console.log("Last name is missing");
        return;
    }
    if (age === undefined) {
        console.log("Age is missing");
        return;
    }
    if (phoneNum === undefined) {
        console.log("Phone number is missing")
        return;
    }

    if (typeof firstName !== "string") {
        console.log("First name should be a string");
        return;
    }
    if (typeof lastName !== "string") {
        console.log("Last name should be a string");
        return;
    }
    if (typeof age !== "number") {
        console.log("Age should be a number");
        return;
    }
    if (typeof phoneNum !== "string") {
        console.log("Phone number should be a string");
        return;
    }

    if (age < 18) {
        console.log("Sorry, not old enough");
        return;
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.age = age;
    user.phoneNum = phoneNum;

    users.push(user);

    console.log(firstName + ", WELCOME TO THE ADOS APP.");
}

 formValidator("Jasur", "Abduxakimov", 19, "123-345-484");
 formValidator("Some", "One", 25, "394-343434")


 console.log(users);