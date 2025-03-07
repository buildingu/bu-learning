let users = [];

function formValidator(firstName, lastName, age, phoneNumber){
    const parameters = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        phoneNumber: phoneNumber
    };


    for(let i in parameters){
        if(parameters[i] === undefined){
            console.log(`The ${i} input is missing`);
            return;
        };
    };

    if(typeof firstName !== 'string' || firstName.trim() === ''){
        console.log(`The first name should be a non-empty string.`);
        return;
    };

    if(typeof lastName !== 'string' || lastName.trim() === ''){
        console.log(`The last name should be a non-empty string.`);
        return;
    };

    if(typeof phoneNumber !== 'string' || phoneNumber.trim() === ''){
        console.log(`The phone number should be a non-empty string.`);
        return;
    };

    if(typeof age !== 'number'){
        console.log(`The age should be a number.`);
        return;
    };

    if(age < 18){
        console.log(`Sorry, not old enough for our app.`);
        return;
    };

    const userInfo = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        age: age,
        phoneNumber: phoneNumber.trim()
    };

    users.push(userInfo);

    console.log(`WELCOME TO THE ADOS APP.`);
    console.log(`User information:`, userInfo);
    return true;
};

formValidator(`Ksyusha`, `Barzdova`, 17, `+123189038`);
formValidator(`John`, `Kennedy`, 24, `+12318567`);
formValidator(`Ann`, `Jackson`, 18, `+124689038`);

console.log(`All users:`, users);
