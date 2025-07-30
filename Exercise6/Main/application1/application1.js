const btn=document.getElementById("btn");
const resetBtn=document.getElementById("resetBtn");
btn.addEventListener("click",submitForm);
resetBtn.addEventListener("click",resetForm);

function submitForm() {
    let continueFunction=true;
    const firstName=document.getElementById("firstName").value.trim();
    const lastName=document.getElementById("lastName").value.trim();
    const age=document.getElementById("age").value.trim();
    const phoneNumber=document.getElementById("phoneNumber").value.trim();

    if (!firstName || !lastName || !age || !phoneNumber) {
        alert("All fields are required.");
        continueFunction=false;
    }
    if(isNaN(age)){
        alert("You must enter a number for age.");
        continueFunction=false;
    }
    else if(age<18){
        alert("You must be at least 18 years old.");
        continueFunction=false;
    }
    if(continueFunction){
        alert("Success! You are eligible to use the website.")
    }
}

function resetForm(){
    firstName.value="";
    lastName.value="";
    age.value="";
    phoneNumber.value="";
}