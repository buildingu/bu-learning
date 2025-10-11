function formValidator(firstName, lastName, age, phoneNumber) {

    let returnStrin = "WELCOME TO THE ADOS APP."

    let items = [firstName, lastName, age, phoneNumber]
    let titles = ["first name", "last name", "age", "phone number"]
    let type = ["string", "string", "number", "number"]

    // check that everything is the right datatype
    for (let i = 0; i < 4; i++) {
        if (/^[A-Za-z]+$/.test(items[i])) { //its a string
            if (type[i] !== "string") {
                returnStrin = "ERROR: The " + titles[i] + " should be a "+ type[i]
            }
        }
        else if (type [i] !== "number") {
            returnStrin = "ERROR: The " + titles[i] + " should be a " + type[i]
        }
    }

    // check age requirement
    if (age < 18) {
        returnStrin = "ERROR: Sorry, not old enough for our app."
    }

    // check that no inputs are missing
    for (let i = 0; i < 4; i++) {
        let thing = items[i]
        if (thing == undefined || thing == '' || thing == null) {
            returnStrin = "ERROR: The " + titles[i] + " input is missing."
        }
    }

    return returnStrin
}

function valForm(event) {

    event.preventDefault()

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const age = document.getElementById("age").value.trim();
    const numPhone = document.getElementById("phoneNumber").value.trim();

    const retStr = formValidator(firstName, lastName, age, numPhone)
    const output = document.getElementById("output")
    output.textContent = retStr;
}
