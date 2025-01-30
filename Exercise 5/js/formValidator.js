let formValid = (fname, lname, age, pnum) => {
    //create an array of each input, and a placeholder to use in strings
    let data = [
        {inp: fname, place: "first name"},
        {inp: lname, place: "last name"},
        {inp: age, place: "age"},
        {inp: pnum, place: "phone number"}
    ];

    //check if all inputs are there
    for(let i in data){
        if(data[i].inp === undefined) return (`The ${data[i].place} is missing.`);
    }
    //check if all inputs are strings (except for age, which is i = 2)
    for(let i in data){
        if(typeof(data[i].inp) !== 'string' || i == 2){
            //check if age is a number
            if(i == 2 && typeof(data[i].inp) !== 'number') return ("The age should be a number.");
            //otherwise, print a message about the input supposed to be a string
            if(data[i].inp !== age) return (`The ${data[i].place} should be a string.`);
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