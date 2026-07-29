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
    if (age === undefined || isNaN(age) || age < 0 || typeof(age) !== "number") {
        alert("Please enter a valid age");
        return false;
    }
    if (sex !== "Male" && sex !== "Female" && sex !== "Other") {
        alert("Please enter a valid gender");
        return false;
    }
    return true;
}

function createEntry(data) {
    const entry = document.createElement("li");
    entriesList.appendChild(entry);
    createRow(entry, data);
}

function makeSexSelect(value) {
    const select = document.createElement("select");
    const options = ["Male", "Female", "Other"];
    options.forEach((option) => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        if (option === value) {
            opt.selected = true;
        }
        select.appendChild(opt);
    });
    return select;
}

function makeField(label, value) {
    const field = document.createElement("div");
    field.classList.add("entry-field");
    const labelEl = document.createElement("span");
    labelEl.classList.add("entry-label");
    labelEl.textContent = label;
    const valueEl = document.createElement("span");
    valueEl.classList.add("entry-value");
    valueEl.textContent = value;
    field.appendChild(labelEl);
    field.appendChild(valueEl);
    return { field, valueEl };
}

function createRow(entry, data) {
    entry.innerHTML = "";
    entry.classList.add("entry-card");
    const nameField = makeField("NAME", data.name);
    const ageField = makeField("AGE", data.age);
    const sexField = makeField("SEX", data.sex);
    const positionField = makeField("POSITION", data.position)
    const details = document.createElement("div");
    details.classList.add("entry-details");
    details.appendChild(nameField.field);
    details.appendChild(ageField.field);
    details.appendChild(sexField.field);
    details.appendChild(positionField.field);
    entry.appendChild(details);
    const actions = document.createElement("div");
    actions.classList.add("entry-buttons");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("save-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
        entriesList.removeChild(entry);
    });
    const editButton = document.createElement("button");
    editButton.classList.add("save-button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function() {
        createEditRow(entry, data);
    });
    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    entry.appendChild(actions);
}

function createEditRow(entry, data) {
    entry.innerHTML = "";
    const container = document.createElement("div");
    const editName = document.createElement("input");
    editName.type = "text";
    editName.value = data.name;
    const editAge = document.createElement("input");
    editAge.type = "number";
    editAge.value = data.age;
    const editSex = makeSexSelect(data.sex);
    const editPosition = document.createElement("input");
    editPosition.value = data.position;
    container.appendChild(editName);
    container.appendChild(editAge);
    container.appendChild(editSex);
    container.appendChild(editPosition);
    entry.appendChild(container);
    const saveEditButton = document.createElement("button");
    saveEditButton.textContent = "Save";
    saveEditButton.addEventListener("click", function() {
        const updatedAge = editAge.value === "" ? undefined : Number(editAge.value);
        if (!checkEntry(editName.value, updatedAge, editSex.value, editPosition.value)) return;
        data.name = editName.value;
        data.age = updatedAge;
        data.sex = editSex.value;
        data.position = editPosition.value;
        createRow(entry, data);
    });
    entry.appendChild(saveEditButton);
}

saveButton.addEventListener("click", function() {
    const ageValue = age.value === "" ? undefined : Number(age.value);
    if (!checkEntry(name.value, ageValue, sex.value, position.value)) {
        return;
    }
    createEntry({
        name: name.value,
        age: ageValue,
        sex: sex.value,
        position: position.value
    });
    name.value = "";
    age.value = "";
    sex.value = "Male";
    position.value = "";
});