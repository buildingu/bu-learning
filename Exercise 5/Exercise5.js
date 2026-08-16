function formValidator(fName, lName, age, phone) {
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
    if(typeof age !== "number"){
        return "The age should be a number."
    }
    if(typeof phone !== "string"){
        return "The phone should be a string."
    }
    if(typeof fName !== "string"){
        return "The first name should be a string."
    }
    if(typeof lName !== "string"){
        return "The last name should be a string."
    }
    if(age<18){
        return "Sorry, not old enough for our app."
    }
    
    return "WELCOME TO THE ADOS APP."
    

}
const user1 = {
    fName: "Madhu",
    lName: "Kumar",
    age: 18,
    phone: "123-456-7890"
}
console.log(formValidator(user1.fName, user1.lName, user1.age, user1.phone))
