function formValidator(fName, lName, age, phoneNumber){
    //Checking for inputted information
    
    if (fName === " "){
      console.log("Your first name is missing");
    }
   
    else if (lName === " "){
      console.log("Your last name is missing");
    }
   
    else if (age === " ") {
      console.log("Your age is missing");
    }
   
    else if (phoneNumber === " ") {
      console.log("Your phone number is missing");
    }

    //Checking if inputted inforomation is valid
   
    else {
     
        if (typeof(fName) !== "string"){
        console.log("Your first name should be a string");
        }
    
        else if(typeof(lName) !== "string"){
        console.log("Your last name should be a string");
        }
    
        else {
    
            if (typeof(age) === "string"){
            console.log("Your age should be a number");
            }
        
            else if (typeof(phoneNumber) === "string"){
            console.log("Your phone number should consist of numbers");
            }
        
            else {
            if (age < 18) {
            console.log("Sorry, you are not old enough for this app.");
            }
            else {
                console.log("Welcome to the app!");
            }
            
            }
        
        } 
    
    }
   
} 
  
formValidator( "Castel", "Rivero", 19, 1123);
