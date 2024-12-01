const params = {
  firstname: "Timothy",
  lastname: "Tran",
  age: "15",
  phonenumber: "0123456789",
};
let typelist = [
  typeof params.firstname,
  typeof params.lastname,
  typeof params.age,
  typeof params.phonenumber,
];
function formValidator(params) {
  if (typelist[0] === undefined) {
    console.log("First name is missing");
  } else if (typelist[1] === undefined) {
    console.log("Last name is missing");
  } else if (typelist[2] === undefined) {
    console.log("Age is missing");
  } else if (typelist[3] === undefined) {
    console.log("Phone number is missing");
  }
}
if (typelist[0] !== "string") {
  console.log("The first name must be a string");
} else if (typelist[1] !== "string") {
  console.log("The last name must be a string");
} else if (typelist[2] !== "number") {
  console.log("The age must be a number");
} else if (typelist[3] !== "string") {
  console.log("The phonenumber must be a string");
}
{
  if (params.age < 18) {
    console.log("Sorry, not old enough for our app.");
  } else {
    console.log("WELCOME TO THE ADOS APP");
  }
}
formValidator();
