const addEntry = document.getElementById("entry");
const editEntry = document.getElementById("edit");
const deleteEntry = document.getElementById("delete");
const updateEntry = document.getElementById("update");
    updateEntry.style.display = "none";
const employeeEntriesContainer = document.getElementById("employee-entries-container");
let messageDiv = document.getElementById("messagetext");
    let container = document.querySelector("formContainer");
            messageDiv.style.fontFamily = "Alte Haas Grotesk";
            messageDiv.style.color = "rgb(30, 24, 19)";
            messageDiv.style.textAlign = "center";


function employeeEntry(event) { // Employee Entry Function
    if (event) {
        event.preventDefault();
    }
    const employeeName = document.getElementById("name").value;
    const employeeAge = document.getElementById("age").value;
    const employeeGender = document.getElementById("gender").value;
    const employeePosition = document.getElementById("position").value;
    
    if (!formValidator(employeeName, employeeAge, employeeGender, employeePosition)) {
        return;
    }

    const newEmployeeDiv = document.createElement("div"); 
    newEmployeeDiv.textContent = "Name: " + employeeName + " Age: " + employeeAge + " Gender: " + employeeGender + " Position: " + employeePosition; 
    newEmployeeDiv.classList.add("employee-item"); 
    employeeEntriesContainer.appendChild(newEmployeeDiv);
        employeeEntriesContainer.style.display = "block";

    }
addEntry.addEventListener("click", employeeEntry); // adds Entry logic to the button

function entryDelete(event) { // Employee Entry Delete Function
    if (event) {
        event.preventDefault();
    }
    const employeeName = document.getElementById("name").value;
    const employeeAge = document.getElementById("age").value;
    const employeeGender = document.getElementById("gender").value;
    const employeePosition = document.getElementById("position").value;

    let entryDeleted = false;
    const textMatch = "Name: " + employeeName + " Age: " + employeeAge + " Gender: " + employeeGender + " Position: " + employeePosition; 
    const textEntry = document.querySelectorAll(".employee-item");
    textEntry.forEach(item => {
    const itemTextContent = item.textContent.trim();
    if (textMatch === itemTextContent) {
        item.remove();
        entryDeleted = true;
    } });

    if(entryDeleted == true) {
        messageDiv.textContent = "Entry deleted.";
    } else {
        messageDiv.textContent = "Entry not found.";
    }

}
deleteEntry.addEventListener("click", entryDelete); // delete Entry logic to the button

updateEntry.addEventListener("click", updateEntry); // update button logic
function entryEdit(event) {
    if (event) {
        event.preventDefault();
    }
    const employeeName = document.getElementById("name").value;
    const employeeAge = document.getElementById("age").value;
    const employeeGender = document.getElementById("gender").value;
    const employeePosition = document.getElementById("position").value;

    let entryDeleted = false;
    const textMatch = "Name: " + employeeName + " Age: " + employeeAge + " Gender: " + employeeGender + " Position: " + employeePosition; 
    const textEntry = document.querySelectorAll(".employee-item");
    textEntry.forEach(item => {
    const itemTextContent = item.textContent.trim();
    if (textMatch === itemTextContent) {
        item.remove();
        entryDeleted = true;
    } });

    if(entryDeleted == true) {
        messageDiv.textContent = "Enter updated entry.";
        updateEntry.style.display = "block";
    }

    function updateEntry() {
        const employeeName = document.getElementById("name").value;
        const employeeAge = document.getElementById("age").value;
        const employeeGender = document.getElementById("gender").value;
        const employeePosition = document.getElementById("position").value;

        
        const newEmployeeDiv = document.createElement("div"); 
        newEmployeeDiv.textContent = "Name: " + employeeName + " Age: " + employeeAge + " Gender: " + employeeGender + " Position: " + employeePosition; 
        newEmployeeDiv.classList.add("employee-item"); 
        employeeEntriesContainer.appendChild(newEmployeeDiv);
            employeeEntriesContainer.style.display = "block";
    }
    }  
editEntry.addEventListener("click", entryEdit); // edit Entry logic to the button


function formValidator() { // Form Validator function
    let formName = document.getElementById("name").value;
    let formAge = document.getElementById("age").value;
    let formGender = document.getElementById("gender").value;
    let formPosition = document.getElementById("position").value;

        // input missing check
        if (formName == null || (formName.trim() === "")) {
            messageDiv.textContent = "The name input is missing";
            return false;
        }
        if (formAge == null || (formAge.trim() === "")) {
            messageDiv.textContent = "The age input is missing";
            return false;
        }
        if (formGender == null || (formGender.trim() === "")) {
            messageDiv.textContent = "The gender input is missing";
            return false;
        }
        if (formPosition == null || (formPosition.trim() === "")) {
            messageDiv.textContent = "The position input is missing";
            return false;
        }
        // var type check
        if (!/^[a-zA-Z\s]+$/.test(formName)) {
            messageDiv.textContent = "The gender should only contain letters and spaces";
            return false;
        }
        if (isNaN(parseInt(formAge))) {
            messageDiv.textContent = "The age should be a number";
            return false;
        }
        if (!/^[a-zA-Z\s]+$/.test(formGender)) {
            messageDiv.textContent = "The gender should only contain letters and spaces";
            return false;
        }
        if (!/^[a-zA-Z\s]+$/.test(formPosition)) {
            messageDiv.textContent = "The position should only contain letters and spaces";
            return false;
        }

        messageDiv.textContent = "WELCOME TO THE COMPANY!"
        return true;
}
