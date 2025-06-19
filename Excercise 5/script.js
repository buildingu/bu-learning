
let fName = document.querySelector('input[name="1name"]');
let lName = document.querySelector('input[name="2name"]');
let Age = document.querySelector('input[type="number"]');
let Phone = document.querySelector('input[type="tel"]');
let verified = document.querySelector('p[class=hide]');
let Info = [fName, lName, Age, Phone];
CanEnter = false;

let submit = document.querySelector('button[type="Submit"]');
submit.addEventListener('click', function (e) {
    e.preventDefault();
    const values = Info.map(input => input.value);
    FormValidator(...values);
});

let reset = document.querySelector('button[type="reset"]');
reset.addEventListener('click', enterSite);

function enterSite() {
   if (CanEnter) {
      verified.style.visibility = "visible";
      console.log("Access granted!");
      CanEnter=false;
    } else {
      verified.style.visibility = "hidden";
      console.log("Access denied.");
    }
};


function FormValidator(fname, lname, age, phone) {
    const data = [fname, lname, age, phone];
    const labels = ["First Name", "Last Name", "Age", "Phone Number"];
    CanEnter=true;
    data.forEach(function (detail, desc) {
        if (!detail || detail.trim() === "") {
            alert(labels[desc] + " is not there");
            CanEnter = false;
            return;
        }
        function isDataString(detail) {
            return /^[a-zA-Z\s]+$/.test(detail);
        };

        if (desc !== 2 && desc !== 3 && !isDataString(detail)) {
            alert(labels[desc] + " should be of type string");
            CanEnter = false;
        }
        else if ((desc === 2 || desc === 3) && isNaN(detail)) {
            alert(labels[desc] + " should be numbers");
            CanEnter = false;
        }
        else if (desc === 2 && data[desc] < 18) {
            alert("Sorry, you are not old enough for ths app.");
            CanEnter = false;
        }

    });
    console.log("enter");
    enterSite();

};