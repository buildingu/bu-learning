const submit = document.getElementById("entry");
submit.addEventListener("click", employeeEntry);
const employeeEntriesContainer = document.getElementById("employee-entries-container");
let messageDiv = document.getElementById("messagetext");
let container = document.querySelector(".formContainer");
messageDiv.style.fontFamily = "Alte Haas Grotesk";
messageDiv.style.color = "rgba(61, 50, 42, 1)";
messageDiv.style.textAlign = "center";

function employeeEntry(event) { // Employee Entry Function
    if (event) {
        event.preventDefault();} // prevents form clearing
    const employeeName = document.getElementById("name").value;
    const employeeAge = document.getElementById("age").value;
    const employeeGender = document.getElementById("gender").value;
    const employeePosition = document.getElementById("position").value;
    
    if (!formValidator()) {return;} // form validation
    
    const newEmployeeDiv = document.createElement("div");
    newEmployeeDiv.classList.add("employee-item");
    newEmployeeDiv.innerHTML = `
        <p  style="color: rgba(61, 50, 42, 1);">Name: ${employeeName}, Age: ${employeeAge}, Gender: ${employeeGender}, Position: ${employeePosition}</p>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>`
    newEmployeeDiv.style.textAlign = "center";
    newEmployeeDiv.querySelector(".delete-btn").addEventListener("click", () => { newEmployeeDiv.remove(); messageDiv.textContent = "Entry deleted."; }); // deletes entry by deleting the div
    newEmployeeDiv.querySelector(".edit-btn").addEventListener("click", function() { entryEdit(newEmployeeDiv)});

    employeeEntriesContainer.appendChild(newEmployeeDiv);
    employeeEntriesContainer.style.display = "block";

function entryEdit(employeeDiv) {
    currentEmployeeDivToEdit = employeeDiv;

    const employeeName = document.getElementById("name").value;
    const employeeAge = document.getElementById("age").value;
    const employeeGender = document.getElementById("gender").value;
    const employeePosition = document.getElementById("position").value;

    employeeDiv.innerHTML = `
        <p style="color: rgba(61, 50, 42, 1);">Name: ${employeeName}, Age: ${employeeAge}, Gender: ${employeeGender}, Position: ${employeePosition}</p>
        <button class="edit-btn">Edit</button>
        <button class="update-btn">Update</button>
        <button class="delete-btn">Delete</button>`;
    employeeDiv.querySelector(".update-btn").addEventListener("click", updateEntry);
    newEmployeeDiv.querySelector(".delete-btn").addEventListener("click", () => { newEmployeeDiv.remove(); messageDiv.textContent = "Entry deleted."; });
    employeeDiv.querySelector(".edit-btn").addEventListener("click", function() { entryEdit(employeeDiv); });
}
    employeeDiv.querySelector(".edit-btn").addEventListener("click", function(event) { entryEdit(event); });
function updateEntry() {
    const employeeName = document.getElementById("name").value;
    const employeeAge = document.getElementById("age").value;
    const employeeGender = document.getElementById("gender").value;
    const employeePosition = document.getElementById("position").value;

    if (currentEmployeeDivToEdit) {
        currentEmployeeDivToEdit.innerHTML = `
            <p style="color: rgba(61, 50, 42, 1);">Name: ${employeeName}, Age: ${employeeAge}, Gender: ${employeeGender}, Position: ${employeePosition}</p>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>`;
        currentEmployeeDivToEdit.style.textAlign = "center";
        currentEmployeeDivToEdit.querySelector(".edit-btn").addEventListener("click", function() { entryEdit(currentEmployeeDivToEdit); });
        newEmployeeDiv.querySelector(".delete-btn").addEventListener("click", () => { newEmployeeDiv.remove(); messageDiv.textContent = "Entry deleted."; });
        messageDiv.textContent = "Entry updated successfully.";
        currentEmployeeDivToEdit = null;
    document.getElementById("entry").style.display = 'block';
}}  
    document.getElementById("update-btn").style.display = 'none';
}  

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
