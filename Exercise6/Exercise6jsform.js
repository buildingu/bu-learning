const validBtn = document.getElementById("validBtn")

const errorMessage = document.querySelector("#errorMessage")
errorMessage.textContent = "";

const fName = document.querySelector("#fName")

const lName = document.querySelector("#lName")

const age = document.querySelector("#age")

const phoneNumber = document.querySelector("#phoneNumber")


validBtn.addEventListener('click', function() {
    const fNamereader = fName.value;
    const lNamereader = lName.value;
    if(age === undefined || age.value.length == 0) {
        errorMessage.textContent = "The age input is missing.";
        return;
    } 
    const agereader = Number(age.value);
    const phoneNumberreader = phoneNumber.value;
    formValidator(fNamereader, lNamereader, agereader, phoneNumberreader);
});

function formValidator(fName, lName, age, phoneNumber) {
    if(fName === undefined || fName.length == 0) {
        errorMessage.textContent = "The first name input is missing";
        return;
    }
    if(lName === undefined || lName.length == 0) {
        errorMessage.textContent = "The last name input is missing.";
        return;
    }
  
    if(phoneNumber === undefined || phoneNumber.length == 0) {
        errorMessage.textContent = "The phone number input is missing."
        return;
    }
  
    if(typeof(fName) !== "string") {
        errorMessage.textContent = "The first name MUST be a String data type";
        return;
    }
  
    if(typeof(lName) !== "string") {
        errorMessage.textContent = "The last name MUST be a String data type";
        return;
    }
  
    if(typeof(phoneNumber) !== "string") {
        errorMessage.textContent = "The phone number MUST be a String data type";
        return;
    }
  
    if(typeof(age) !== "number") {
        errorMessage.textContent = "The age MUST be a Number data type";
        return;
    }
  
    if(age < 18) {
        errorMessage.textContent = "Sorry, not old enough for our app.";
        return;
    }
  
    else {
        errorMessage.textContent = "WELCOME TO THE ADOS APP.";
    }
}