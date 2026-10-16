let values = [ {
    firstName: "Garry",
    lastName: "Smith",
    age: 52,
    phoneNumber: "123-456-7890"
}
, {
    firstName: "John",
    lastName: "Doe",
    age: 17,
    phoneNumber: "321-654-0987"
}
, {
    firstName: "Jane",
    lastName: "Doe",
    age: 25,
    phoneNumber: "121-454-7897"
}
]



function formValidator(people) {
    let firstName = people.firstName;
    let lastName = people.lastName;
    let age = people.age;
    let phoneNumber = people.phoneNumber;
    
    if (firstName === undefined) {
        console.log("First name input is missing");
    }
    else if (lastName === undefined) {
        console.log("Last name input is missing");
    }
    else if (age === undefined) {
        console.log("Age input is missing");
    }
    else if (phoneNumber === undefined) {
        console.log("Phone number input is missing");
    }

    else if(typeof(firstName) !== "string") {
        console.log("First name should be a string");
    }
    else if(typeof(lastName) !== "string") {
        console.log("Last name should be a string");
    }
    else if(typeof(age) !== "number") {
        console.log("Age should be a number");
    }
    else if(typeof(phoneNumber) !== "string") {
        console.log("Phone number should be a string");
    }
    
    else if (age < 18) {
        console.log("Sorry, not old enough for our app.");
    }

    else {
        console.log("WELCOME TO THE ADOS APP")
    }
};

formValidator(values[2]);