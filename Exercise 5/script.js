let userData = {
    fName : "John",
    lName : "Doe",
    age : 21,
    phoneNumber : "123456"
};
let inputValues = [userData.fName,userData.lName,userData.age,userData.phoneNumber];
let types = [typeof(userData.fName), typeof(userData.lName), typeof(userData.age), typeof(userData.phoneNumber)];
let missingParameters = ["First Name", "Last Name", "Age", "Phone Number"];

function formvalidator(inputValues){
    let i = 0
    for(value of inputValues){
        if(value !== undefined){
            missingParameters.splice(i,1)
        }else{
            i++
        }
    }
    if(missingParameters.length !== 0){
        for(parameter of missingParameters){
            console.log(`The input ${parameter} is missing!`)
        }
    }else{
        if(types[0] !== "string"){
            console.log("The First Name Must be a String!")
        }else if(types[1] !== "string"){
            console.log("The Last Name Must be a String!")
        }else if(types[2] !== "number"){
            console.log("The Age Must be a Number!")
        }else if(types[3] !== "string"){
            console.log("The Phone Number Must be a String!")
        }else{
                if(userData.age < 18){
                    console.log("Sorry, You are not old enough for our app.")
                } else{
                    console.log("Welcome to the ADOS app!")
                }
        }
    }
}
formvalidator(inputValues);