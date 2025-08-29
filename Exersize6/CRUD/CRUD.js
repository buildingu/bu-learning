let fNameVal, lNameVal, positionVal, genderVal;
let selectedEmployeeItem = null; // Will store the list item that's being edited.

const form = document.getElementById("form");
const list = document.getElementById("employeeList");

// Change the submit button text to track mode
const submitButton = form.querySelector("button[type='submit']");
submitButton.textContent = "Add Employee";

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Get values from the form
    fNameVal = document.getElementById("fName").value.trim();
    lNameVal = document.getElementById("lName").value.trim();
    positionVal = document.getElementById("position").value.trim();
    genderVal = document.getElementById("sex").value.trim();

    // If we are in edit mode, update the existing element:
    if (selectedEmployeeItem) {
        const pElements = selectedEmployeeItem.querySelectorAll("p");
        pElements[0].textContent = `First Name: ${fNameVal}`;
        pElements[1].textContent = `Last Name: ${lNameVal}`;
        pElements[2].textContent = `Position: ${positionVal}`;
        pElements[3].textContent = `Gender: ${genderVal}`;
        
        // Reset mode back to add employee.
        submitButton.textContent = "Add Employee";
        selectedEmployeeItem = null;
    } else {
        // Create a new list item (card)
        const employeeItem = document.createElement("li");
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
        // If deleting the item we are editing, reset form mode.
        if (selectedEmployeeItem === event.target.parentElement) {
            selectedEmployeeItem = null;
            submitButton.textContent = "Add Employee";
            form.reset();
        }
        event.target.parentElement.remove();
    }

    // Handle edit click
    if (event.target.classList.contains("edit")) {
        selectedEmployeeItem = event.target.parentElement;
        const pElements = selectedEmployeeItem.querySelectorAll("p");
        // Pre-fill form with the current values
        document.getElementById("fName").value = pElements[0].textContent.replace("First Name: ", "").trim();
        document.getElementById("lName").value = pElements[1].textContent.replace("Last Name: ", "").trim();
        document.getElementById("position").value = pElements[2].textContent.replace("Position: ", "").trim();
        document.getElementById("sex").value = pElements[3].textContent.replace("Gender: ", "").trim();

        submitButton.textContent = "Update Employee";
    }
});




