info = {
    fName: "Jack",
    lname: "Smith",
    Age: 19,
    phone: "123-456-7890"
}

function formValidator(fName, lName, Age, phone) {
    if (typeof(fName) != 'string'){
        return "The first name should be a string"
    }
    else if(fName == null || fName == ""){
        return "The first name input is missing."
    }    
    if (typeof(lName) != 'string'){
        return "The last name should be a string"
    }
    else if(lName == null || lName == ""){
        return "The last name input is missing."
    } 
    if (!Number.isInteger(Age)){
        return "The Age should be a number"
    }
    else if(Age == null || Age == 0){
        return "The age input is missing/invalid."
    } 
    if (typeof(phone) != 'string'){
        return "The phone number should be a string"
    }
    else if(phone == null || phone == ""){
        return "The phone number input is missing."
    } 
   if(Age < 18){
    return "Sorry, not old enough for our app."
   }
   else{
    return "WELCOME TO THE ADOS APP."
   }

}

console.log(formValidator(info.fName, info.lname, info.Age, info.phone))