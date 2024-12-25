function formValidator(firstName, lastName, age, phoneNumber) {
    if(firstName==null || firstName==undefined){
        console.log("First name is required");
       return -1;
    }
    else if(lastName==null || lastName==undefined){
        console.log("Last name is required");
        return -1;
    }
    else if(age==null || age==undefined){
        console.log("Age is required");
        return -1;
    }
    else if(phoneNumber==null || phoneNumber==undefined){
        console.log("Phone number is required");
        return -1;
    }
    

    if(typeof firstName != "string"){
        console.log("First name must be a string");
        return -1;
    }
    else if(typeof lastName != "string"){
        console.log("Last name must be a string");
        return -1;
    }
    else if(typeof phoneNumber != "string"){
        console.log("Phone Number must be a string");
        return -1;
    }
    else if(typeof age != "number"){
        console.log("Age must be a number");
        return -1;
    }


    if(age<18){
        console.log("Sorry, not old enough for our app.");
        return -1;
    }
    
    
    console.log("WELCOME TO THE ADOS APP");





}


formValidator("Anay", "Singh", 25, "1234567890");
