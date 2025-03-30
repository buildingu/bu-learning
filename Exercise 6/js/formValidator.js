const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const age = document.getElementById('age');
const pn = document.getElementById('pn');

let addItems = () => {
    const alerted = document.getElementById("alert");
    const valid = formValid(fname.value, lname.value, age.value, pn.value);
    if(valid === "WELCOME TO THE ADOS APP."){
        alerted.style.color = 'green';
    }
    else {
        alerted.style.color = 'red';
    }
    alerted.textContent = valid;
}

const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', addItems);

let formValid = (fna, ln, aage, pnumber) => {
    //create an array of each input, and a placeholder to use in strings
    let data = [
        {inp: fna, place: "first name"},
        {inp: ln, place: "last name"},
        {inp: aage, place: "age"},
        {inp: pnumber, place: "phone number"}
    ];

    //check if all inputs are there
    for(let i in data){
        if(data[i].inp === undefined || data[i].inp === "") return (`The ${data[i].place} is missing.`);
    }
    //check if all inputs are strings (except for age, which is i = 2)
    for(let i in data){
        if(typeof(data[i].inp) !== 'string' || i == 2){
            //check if age is a number
            if(i == 2 && isNaN(data[i].inp)) return ("The age should be a number.");
            //otherwise, print a message about the input supposed to be a string
            if(data[i].inp !== aage) return (`The ${data[i].place} should be a string.`);
        } 
    }

    //check if the age is above 18
    if(age < 18){
        return ("Sorry, not old enough for our app.");
    }

    //everything passed, return log in statement
    return ("WELCOME TO THE ADOS APP.");


};

console.log(formValid("AJ", "Gho", 18, "123-456-7890"));