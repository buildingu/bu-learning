
const display = document.getElementById("display")
const display2 = document.getElementById("display2")
document.getElementById("submit").onclick = function(){
    const FirstName = document.getElementById("first_name").value
const LastName = document.getElementById("last_name").value
const ageInput = document.getElementById("age").value
const age = parseInt(ageInput)
console.log(age)
const phone_number = document.getElementById("phone_number").value


    if(FirstName === "" || /\d/.test(FirstName) ){
        display.innerHTML = "The first name input is missing or incorrectly inputted"
        return;
    }
    
    if(LastName === "" || /\d/.test(LastName)){
       display.innerHTML = "The last name input is missing or incorrectly inputted"
       return;
        
    }
    
    if(isNaN(age)||age <= 18 ){
        
      display.innerHTML = "Sorry, not old enough for the app or provided information is incorrect"
      return;
        
        
    }
    
    if(phone_number === ""){
        display.innerHTML ="Phone number input is missing or incorrectly inputted"
        return;
    }
   

    display.innerHTML = "Welcome to the ADOS App!"
    display2.innerHTML = "Here are your details: " + [FirstName, LastName, age, phone_number]
    
    
}
