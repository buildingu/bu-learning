
let fName = document.querySelector('input[name="1name"]');
let lName = document.querySelector('input[name="2name"]');
let Age = document.querySelector('input[type="number"]');
let Phone = document.querySelector('input[type="tel"]');
let verified = document.querySelector('p[class=hide]');
let Info = [fName, lName, Age, Phone];
allValid = false;

let submit = document.querySelector('button[type="Submit"]');
submit.addEventListener('click', function (e) {
    e.preventDefault();
    const values = Info.map(input => input.value);
    FormValidator(...values);
});

let reset = document.querySelector('button[type="reset"]');
reset.addEventListener('click', function () {
    enterSite(allValid);
});

function enterSite(permission) {
    if (permission) {
        verified.style.visibility = "visible";
        console.log("Access granted!");
        allValid = false;
        console.log("acess taken back");
    } else {
        verified.style.visibility = "hidden";
        console.log("Access denied.");
    };
};


function FormValidator(fname, lname, age, phone) {
    const data = [fname, lname, age, phone];
    const labels = ["First Name", "Last Name", "Age", "Phone Number"];
    allValid = true;

    data.forEach(function (detail, desc) {
        function isDataString(detail) {
            return /^[a-zA-Z\-\'\s]+$/.test(detail);
        };
        function isPhoneFormat(detail) {
            const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
            return phonePattern.test(detail);
        };

        if (desc !==2 && (!detail || detail.trim() === "")) {
            alert(labels[desc] + " is not there");
            allValid = false;
        }

        else if ((desc !== 2 && desc !== 3) && !isDataString(detail)) {
            alert(labels[desc] + " should be of type string");
            allValid = false;

        }
        else if (desc === 3 && !isPhoneFormat(detail)) {
            alert(labels[desc] + " should be of type string, 10 digits, and seperated by '-' according to US telephone number format");
            allValid = false;
        }
        else if ((desc === 2) && isNaN(detail)) {
            alert(labels[desc] + " should be a number");
            allValid = false;

        }
        else if (desc === 2 && data[desc] < 18) {
            alert("Sorry, you are not old enough for ths app.");
            allValid = false;
        };

    });
    enterSite(allValid);

};