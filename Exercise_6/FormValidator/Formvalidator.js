//Exercise 6 - Timothy Tran

const btn = document.getElementById("submit");

btn.addEventListener("click", formValidator);

function formValidator() {
  let firstname = document.getElementById("fname").value.trim();
  let lastname = document.getElementById("lname").value.trim();
  let age = document.getElementById("age").value.trim();
  let phonenumber = document.getElementById("pnumber").value.trim();

  if (firstname === "") {
    alert("First name is missing");
  }
  if (lastname === "") {
    alert("Last name is missing");
  }
  if (age === "") {
    alert("Age is missing");
  }
  if (phonenumber === "") {
    alert("Phone number is missing");
  }
  if (typeof firstname !== "string") {
    alert("The first name must be a string");
  }
  if (typeof lastname !== "string") {
    alert("The last name must be a string");
  }
  if (isNaN(age)) {
    alert("The age must be a number");
  }
  if (typeof phonenumber !== "string") {
    alert("The phone number must be a string");
  }
  if (age < 18) {
    alert("Sorry, not old enough for our app.");
  } else {
    alert("WELCOME TO THE ADOS APP");
  }
}
