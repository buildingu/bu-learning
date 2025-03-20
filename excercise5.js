const prompt = require("prompt-sync")()
function formValidtor(){
    let first_name = prompt("Enter first name: ");
    
    if(first_name === "" || typeof first_name !== "string"){
        console.log("The first name input is missing or incorrectly inputted")
        return
    }
    let last_name = prompt("Enter last name: ");
    if(last_name === "" || typeof last_name !== "string"){
        console.log("The last name input is missing or incorrectly inputted")
        return
    }
    let age = prompt("Enter your age: ")
    age = Number(age)
    if(isNaN(age)||age <= 18 || typeof age !== "number" ){
        
        console.log("Sorry, not old enough for the app or provided information is incorrect")
        return
        
    }
    let phone_number = prompt("Enter your phone number: ")
    if(phone_number === "" || typeof phone_number !== "string"){
        console.log("phone number input is missing or incorrectly inputted")
        return
    }

    if(first_name !== "" && last_name !== "" && age >=18 && phone_number !== ""){
        console.log("Welcome to the ADOS App!")
        console.log("Here are your details: " + [first_name, last_name, age, phone_number])
    }
    else{
        console.log("Something is not right. Please go back and fix your details")
    }
 
    
    
    
}

formValidtor()