const firstNameInput = document.querySelector("#first_name_input");

const lastNameInput = document.querySelector("#last_name_input");

const phoneNumberInput = document.querySelector("#phone_number_input");

const ageInput = document.querySelector("#age_input");

function formValidator(firstName, lastName, age, phoneNumber){

    let isAllowed = true;
    let emptyVars = []
    if (firstName === undefined){
        emptyVars.push("First name");
        isAllowed = false;
    }
    if (lastName === undefined){
        emptyVars.push("Last name");
        isAllowed = false;
    }
    if (age === undefined){
        emptyVars.push("Age");
        isAllowed = false;
    }
    if (phoneNumber === undefined){
        emptyVars.push("Phone number");
        isAllowed = false;
    }

    if (emptyVars.length > 0){
        console.log(`Please enter the following parameters as they are missing: ${emptyVars}`);
        alert(`Please enter the following parameters as they are missing: ${emptyVars}`)
    }

    if (typeof firstName !== "string"){
        if (firstName !== undefined){
        console.log("The first name should be a string");
        alert("The first name should be a string")
     }
        
        isAllowed = false;
    }
    if (typeof lastName !== "string"){
        if (lastName !== undefined){
        console.log("The last name should be a string");
        alert("The first name should be a string")
    }

        isAllowed = false;
    }
    if (typeof phoneNumber !== "string"){
        if (phoneNumber !== undefined){
        console.log("The phone number should be a string");
        alert("The phone number should be a string")
        }
        isAllowed = false;
    }
    age = Number(age);
    if (!Number.isFinite(age)){
        if (age !== undefined){
        console.log("The age should be a number")
        alert("The age should be a number");
    }
        isAllowed = false;

    }
    else{
        if (age < 18){
            console.log("Sorry, not old enough for our app.")
            alert("Sorry, not old enough for our app.");
            isAllowed = false;
        }
    }
    if (isAllowed){
        console.log("WELCOME TO THE ADOS APP.");
    }
}

// the anonymous function (arrow function) waits for the click to happen, then it runs
// use an arror function with the function for the addEventListener if parameters are needed, 
// if their aren't any parameters then use the function name
button = document.querySelector("button");
button.addEventListener("click", () => {
    const firstNameValue = firstNameInput.value || undefined;
    const lastNameValue = lastNameInput.value || undefined;
    const phoneNumberValue = phoneNumberInput.value || undefined;
    const ageValue = ageInput.value === "" ? undefined : Number(ageInput.value);

    formValidator(firstNameValue, lastNameValue, ageValue, phoneNumberValue);
})

// formValidator(firstNameValue, lastNameValue, phoneNumberValue, ageValue);