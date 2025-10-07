let fNameVal, lNameVal, positionVal, genderVal;
let selectedEmployeeItem = null; 

const form = document.getElementById("form");
const list = document.getElementById("employeeList");


const submitButton = form.querySelector("button[type='submit']");
submitButton.textContent = "Add Employee";

form.addEventListener("submit", function(event) {
    event.preventDefault();
    

    fNameVal = document.getElementById("fName").value.trim();
    lNameVal = document.getElementById("lName").value.trim();
    positionVal = document.getElementById("position").value.trim();
    genderVal = document.getElementById("sex").value.trim();

 
    if (selectedEmployeeItem) {
        const pElements = selectedEmployeeItem.querySelectorAll("p");
        pElements[0].textContent = `First Name: ${fNameVal}`;
        pElements[1].textContent = `Last Name: ${lNameVal}`;
        pElements[2].textContent = `Position: ${positionVal}`;
        pElements[3].textContent = `Gender: ${genderVal}`;
        
     
        submitButton.textContent = "Add Employee";
        selectedEmployeeItem = null;
    } else {
     
        const employeeItem = document.createElement("li");
        list.classList.add("list-group-item")
        employeeItem.innerHTML = `
            <p>First Name: ${fNameVal}</p>
            <p>Last Name: ${lNameVal}</p>
            <p>Position: ${positionVal}</p>
            <p>Gender: ${genderVal}</p>
            <button class="edit"> Edit </button>
            <button class="delete"> Delete </button> 
        `;
        employeeItem.style.borderBlockColor = "black";
        list.appendChild(employeeItem);
    }

    form.reset();
});

list.addEventListener("click", function(event) {
    // Handle delete click
    if (event.target.classList.contains("delete")) {
      
        if (selectedEmployeeItem === event.target.parentElement) {
            selectedEmployeeItem = null;
            submitButton.textContent = "Add Employee";
            form.reset();
        }
        event.target.parentElement.remove();
    }


    if (event.target.classList.contains("edit")) {
        selectedEmployeeItem = event.target.parentElement;
        const pElements = selectedEmployeeItem.querySelectorAll("p");
       
        document.getElementById("fName").value = pElements[0].textContent.replace("First Name: ", "").trim();
        document.getElementById("lName").value = pElements[1].textContent.replace("Last Name: ", "").trim();
        document.getElementById("position").value = pElements[2].textContent.replace("Position: ", "").trim();
        document.getElementById("sex").value = pElements[3].textContent.replace("Gender: ", "").trim();

        submitButton.textContent = "Update Employee";
    }
});




