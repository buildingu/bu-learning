function formValidator(fName, lName, age, phone) {
    const ageNumber = Number(age);

    if(!fName){
        return "The first name input is missing."
    }
    if(!lName){
        return "The last name input is missing."
    }
    if(!age){
        return "The age input is missing."
    }
    if(!phone){
        return "The phone input is missing."
    }
    if(isNaN(ageNumber)){
        return "The age should be a number."
    }
    if(ageNumber < 18){
        return "Sorry, not old enough for our app."
    }
    
    return "WELCOME TO THE ADOS APP."
}

const form = document.getElementById("form");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const fName = document.getElementById("fName").value.trim();
    const lName = document.getElementById("lName").value.trim();
    const age = document.getElementById("age").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = formValidator(fName, lName, age, phone);

    formMessage.textContent = message;

    if(message === "WELCOME TO THE ADOS APP.") {
        formMessage.style.color = "green";
    } else {
        formMessage.style.color = "red";
    }
});
