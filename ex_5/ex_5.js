
const readline = require('readline')

function formValidator(firstName, lastName, age, phoneNum) {

    let reqsMet = true

    // check that no inputs are missing
    let items = [firstName, lastName, age, phoneNum]
    let titles = ["first name", "last name", "age", "phone number"]
    for (let i = 0; i < 4; i++) {
        let thing = items[i]
        if (thing == undefined || thing == '' || thing == null) {
            console.log("The " + titles[i] + " input is missing.")
            reqsMet = false
        }
    }

    // check that everything is the right datatype
    let type = ["string", "string", "number", "number"]
    for (let i = 0; i < 4; i++) {
        if (/^[A-Za-z]+$/.test(items[i])) { //its a string
            if (type[i] !== "string") {
                console.log("The " + titles[i] + " should be a "+ type[i])
                reqsMet = false
            }
        }
        else if (type [i] !== "number") {
            console.log("The " + titles[i] + " should be a " + type[i])
            reqsMet = false
        }
    }

    if (age < 18) {
        console.log("Sorry, not old enough for our app.")
        reqsMet = false
    }

    if (reqsMet) {
        console.log("WELCOME TO THE ADOS APP.")
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function takeInputs() {
    rl.question("Enter your first name: ", function(firstName) {
        rl.question("Enter your last name: ", function(lastName) {
            rl.question("Enter your age: ", function(ageStr) {
                const age = Number(ageStr)
                rl.question("Enter your phone number: ", function(numPhone) {
                    formValidator(firstName, lastName, age, numPhone)
                    rl.close()
                })
            })
        })
    })
}

takeInputs()
