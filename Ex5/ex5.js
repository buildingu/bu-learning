
//TEST CASES////////////////

//formValidator("Jim", "" , 12, 123-456-7890);
//formValidator(10, "Doe", 30, 123-456-7890);
//formValidator("Jake", "Bill", 20, 123-456-7890);
//formValidator("Linda", "Marie", 20, "one");

function formValidator(firstName, lastName, age, phoneNum){
let check = true;

    if(!firstName){
        console.log("Name input is missing.");
        check = false;
    }else if(!lastName){
        console.log("Last name input is missing.");
        check = false;
    }else if(!age){
        console.log("Age input is missing.");
        check = false;
    }else if(!phoneNum){
        console.log("Phone number is missing.");
        check = false;
    }
    
    if((typeof firstName) !== "string"){
        console.log("The first Name should be a string.");
        check = false;
    }else if((typeof lastName) !== "string"){
        console.log("The last Name should be a string.");
        check = false;
    }else if((typeof age) !== "number"){
        console.log("The age should be an number.");
        check = false;
    }else if((typeof phoneNum) !== "number"){
        console.log("The phone number should be an number.");
        check = false;
    }

    if(age < 18){
        console.log("Sorry, not old enough for our app.");
        check = false;
    }

    if(check){
        console.log("Welcome to the ADOS app!");
    }

}
