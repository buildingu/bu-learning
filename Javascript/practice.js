function formValidator(user) {
    let valid = true;
    if (user.name[0] == null) {
      console.log("The first name input is missing.");
      valid = false;
    }
    if (user.name[1] == null) {
      console.log("The last name input is missing.");
      valid = false;
    }
    if (user.age == null) {
      console.log("The age input is missing.");
      valid = false;
    }
    else if (user.age < 18) {
      console.log("Sorry, you are not old enough for our app.");
      valid = false;
    }
    if (user.phoneNum == null) {
      console.log("The phone number input is missing.");
      valid = false;
    }
    if (valid) {
      console.log("WELCOME TO THE ADOS APP.");
    }
    return;
}

const person = {
  name: ["John", "Doe"],
  age: 19,
  phoneNum: 1234567890
};

formValidator(person);