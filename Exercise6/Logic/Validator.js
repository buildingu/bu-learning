const button = document.getElementById("submit");
const Fname = document.getElementById("First name");
const Lname = document.getElementById("Last Name");
const Age = document.getElementById("Age");
const number = document.getElementById("number");
const checker = document.querySelector(".checker");

function Check() {
    
  if (Fname.value === "") {
    alert("First name is required");
  
    return false;
  }
  if (Lname.value === "") {
    alert("Last name is required");
  
    return false;
  }
  if (Age.value === "" || parseInt(Age.value) <= 18) {
    alert("Age is required and must be over 18");
  
    return false;
  }
  if (number.value === "") {
    alert("Phone number is required");
   
    return false;
  }
  
  alert("Form submitted successfully!");
  return true;
}

button.addEventListener("click", Check);
