var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["age"] = document.getElementById("age").value;
    formData["sex"] = document.getElementById("sex").value;
    formData["position"] = document.getElementById("position").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("workerList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.age;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.sex;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.position;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("sex").value = "";
    document.getElementById("position").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("age").value = selectedRow.cells[1].innerHTML;
    document.getElementById("sex").value = selectedRow.cells[2].innerHTML;
    document.getElementById("position").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.age;
    selectedRow.cells[2].innerHTML = formData.sex;
    selectedRow.cells[3].innerHTML = formData.position;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("workerList").deleteRow(row.rowIndex);
        resetForm();
    }
}

// Form Validator
function validate() {
    let isValid = true;

    // Validate Name
    if (document.getElementById("name").value == "") {
        isValid = false;
        document.getElementById("nameValidationError").classList.remove("hide");
    } else {
        if (!document.getElementById("nameValidationError").classList.contains("hide"))
            document.getElementById("nameValidationError").classList.add("hide");
    }

    // Validate Age
    let age = document.getElementById("age").value;
    if (age == "") {
        isValid = false;
        document.getElementById("ageValidationError").classList.remove("hide");
    } else {
        if (!document.getElementById("ageValidationError").classList.contains("hide"))
            document.getElementById("ageValidationError").classList.add("hide");
    }

    // Validate Sex
    let sex = document.getElementById("sex").value;
    if (sex == "") {
        isValid = false;
        document.getElementById("sexValidationError").classList.remove("hide");
    } else {
        if (!document.getElementById("sexValidationError").classList.contains("hide"))
            document.getElementById("sexValidationError").classList.add("hide");
    }

    // Validate Position
    let position = document.getElementById("position").value;
    if (position == "") {
        isValid = false;
        document.getElementById("positionValidationError").classList.remove("hide");
    } else {
        if (!document.getElementById("positionValidationError").classList.contains("hide"))
            document.getElementById("positionValidationError").classList.add("hide");
    }

    return isValid;
}
