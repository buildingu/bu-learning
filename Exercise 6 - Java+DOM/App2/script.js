const name = document.getElementById("name");
const age = document.getElementById("age");
const sex = document.getElementById("sex");
const position = document.getElementById("position");
const saveButton = document.getElementById("saveButton");
const entriesList = document.getElementById("entriesList");

function checkEntry(name, age, sex, position) {
    if (name === "" || age === "" || sex === "" || position === "") {
        alert("Please fill in all fields");
        return false;
    }
    if (typeof(name) !== "string" || typeof(position) !== "string") {
        alert("Name and position should be strings");
        return false;
    }
    if (age === undefined || age < 0 || typeof(age) !== "number") {
        alert("Please enter a valid age");
        return false;
    }
    if (sex !== "Male" && sex !== "Female" && sex !== "Other") {
        alert("Please enter a valid gender");
        return false;
    }
    return true;
}

function createEntry(name, age, sex, position) {
    const entry = document.createElement("li");
    entriesList.appendChild(entry);
    const entryText = document.createElement("span");
    entryText.textContent = `Name: ${name}, Age: ${age}, Gender: ${sex}, Position: ${position}`;
    entry.appendChild(entryText);
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("save-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
        entriesList.removeChild(entry);
    });
    entry.appendChild(deleteButton);
    const editButton = document.createElement("button");
    editButton.classList.add("save-button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function() {
        const details = entryText.textContent.split(", ")
        const editName = document.createElement("input");
        editName.type = "text";
        editName.value = details[0].split(": ")[1];
        const editAge = document.createElement("input");
        editAge.type = "number";
        editAge.value = details[1].split(": ")[1];
        const editSex = document.createElement("input");
        editSex.type = "text";
        editSex.value = details[2].split(": ")[1];
        const editPosition = document.createElement("input");
        editPosition.type = "text";
        editPosition.value = details[3].split(": ")[1];
        entry.appendChild(editName);
        entry.appendChild(editAge);
        entry.appendChild(editSex);
        entry.appendChild(editPosition);
        const saveEditButton = document.createElement("button");
        saveEditButton.classList.add("save-button");
        saveEditButton.textContent = "Save";
        entry.appendChild(saveEditButton);
        saveEditButton.addEventListener("click", function() {
            if (!checkEntry(editName.value, Number(editAge.value), editSex.value, editPosition.value)) {
                return;
            }
            entryText.textContent = `Name: ${editName.value}, Age: ${editAge.value}, Gender: ${editSex.value}, Position: ${editPosition.value}`;
            entry.removeChild(editName);
            entry.removeChild(editAge);
            entry.removeChild(editSex);
            entry.removeChild(editPosition);
            entry.removeChild(saveEditButton);
        });
    });
    entry.appendChild(editButton);
}

saveButton.addEventListener("click", function() {
    if (!checkEntry(name.value, Number(age.value), sex.value, position.value)) {
        return;
    }
    createEntry(name.value, Number(age.value), sex.value, position.value);
    name.value = "";
    age.value = "";
    sex.value = "";
    position.value = "";
});