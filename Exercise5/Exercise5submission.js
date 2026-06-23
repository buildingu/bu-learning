function formValidator(fName, lName, phoneNumber, age) {
    if(fName === undefined) {
        console.log("The first name input is missing.");
        return;
    }
  
    if(lName === undefined) {
        console.log("The last name input is missing.");
        return;
    }
  
    if(phoneNumber === undefined) {
        console.log("The phone number input is missing.");
        return;
    }
  
    if(age === undefined) {
        console.log("The age input is missing.");
        return;
    } 
  
    if(typeof(fName) !== "string") {
        console.log("The first name MUST be a String data type");
        return;
    }
  
    if(typeof(lName) !== "string") {
        console.log("The last name MUST be a String data type");
        return;
    }
  
    if(typeof(phoneNumber) !== "string") {
        console.log("The phone number MUST be a String data type");
        return;
    }
  
    if(typeof(age) !== "string") {
        console.log("The age MUST be a String data type");
        return;
    }
  
    if(age < 18) {
        console.log("Sorry, not old enough for our app.");
        return;
    }
  
    else {
        console.log("WELCOME TO THE ADOS APP.");
    }
}

const fName="Jomithy";
const lName= "Jimothy";
const phoneNumber= "+1-234-5678";
const age= "19";

formValidator(fName, lName, phoneNumber, age);