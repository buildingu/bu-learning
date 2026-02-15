function formValidator(firstName, lastName, age, phoneNumber) {
    console.log(firstName, lastName, age, phoneNumber);
    if (!firstName){
     console.log("The first name is missing");
     return;
    }
  
    if (!lastName){
     console.log("The last name is missing");
     return;
    }
  
    if (!age){
     console.log("The age is missing");
     return;
    }
  
    if (age < 18) {
    console.log("Sorry, not old enough for our app.");
    return;
    }
  
    if (!phoneNumber){
     console.log("The phone number is missing");
     return;
    }

    if (typeof firstName !== "string") {
    console.log("The first name should be a string.");
    return;
    }
  
    if (typeof lastName !== "string") {
    console.log("The last name should be a string.");
    return;
    }
  
    if (typeof age !== "number") {
    console.log("The age should be a number.");
    return;
    }
  
    if (typeof phoneNumber !== "string") {
    console.log("The phone number should be a string.");
    return;
    }


  
    console.log("WELCOME TO THE ADOS APP.");
}
