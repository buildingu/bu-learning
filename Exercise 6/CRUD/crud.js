const form = document.querySelector(".employee-form");

let employee_container = document.querySelector(".employee_inner");
let employee_item_edit_btns = document.querySelectorAll(".employee_item_edit-btn");
let employee_list_title = document.querySelector("#employee-list-title");



form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const sex = document.getElementById("sex").value.trim();
    const position = document.getElementById("position").value.trim();
    
    form.reset();

    createEmployeeCard(name, age, sex, position);
})

function createEmployeeCard(name, age, sex, position) {
    // Create employee card container
    let employee_item = document.createElement("div")
    employee_item.classList.add("employee_item")

    // Create elements to save info and assigning the values
    let employee_item_name = document.createElement("div");
    employee_item_name.classList.add("employee_item-name");
    employee_item_name.textContent = name;
    let employee_item_age = document.createElement("div");
    employee_item_age.classList.add("employee_item-age");
    employee_item_age.textContent = age;
    let employee_item_sex = document.createElement("div");
    employee_item_sex.classList.add("employee_item-sex");
    employee_item_sex.textContent = sex;
    let employee_item_position = document.createElement("div");
    employee_item_position.classList.add("employee_item-position");
    employee_item_position.textContent = position;
    let employee_item_edit_btn = document.createElement("button");
    employee_item_edit_btn.classList.add("employee_item_edit-btn");
    employee_item_edit_btn.textContent = "Edit";
    let employee_item_delete_btn = document.createElement("button");
    employee_item_delete_btn.classList.add("employee_item_delete-btn");
    employee_item_delete_btn.textContent = "Delete";

    employee_item.appendChild(employee_item_name);
    employee_item.appendChild(employee_item_age);
    employee_item.appendChild(employee_item_sex);
    employee_item.appendChild(employee_item_position);
    employee_item.append(employee_item_edit_btn);
    employee_item.append(employee_item_delete_btn);

    employee_list_title.style.display = "block";
    employee_container.appendChild(employee_item);
}

employee_container.addEventListener('click', (e) => {
    const edit = e.target.closest('.employee_item_edit-btn');
    const del = e.target.closest('.employee_item_delete-btn');

    if (edit) {
        const btn = edit;
        const employee = btn.closest('.employee_item');
        const nameEl = employee.querySelector(".employee_item-name");
        const ageEl = employee.querySelector(".employee_item-age");
        const sexEl = employee.querySelector(".employee_item-sex");
        const positionEl = employee.querySelector(".employee_item-position");

        let newName = null;
        while(true) {
            newName = prompt("Enter new name:", nameEl.textContent);
            if (newName != "") {
                break;
            }
            alert("Enter some value");
        }

        let newAge = null;
        while (true) {
            const num = prompt("Enter new age:", ageEl.textContent);
            const trimmed = num.trim();
            const asNumber = Number(trimmed);
            if (trimmed !== "" && Number.isInteger(asNumber) && asNumber > 0) {
                newAge = trimmed;
                break;
            }
            alert('Please enter a valid positive integer for age.');
        }
        let newSex = null;
        while (true) {
            newSex = prompt("Enter new sex (Male or Female):", sexEl.textContent);
            const normalized = newSex.trim().toLowerCase();
            if (normalized === "male" || normalized === "female") {
                if (normalized === "male") {
                    newSex = "Male";
                } else {
                    newSex = "Female";
                }
                break;
            }
            alert("Please enter 'Male' or 'Female'.");
        }
        let newPosition = null;
        while(true) {
            newPosition = prompt("Enter new position:", positionEl.textContent);
            if (newPosition != "") {
                break;
            }
            alert("Enter some value");
        }


        if (newName !== null) nameEl.textContent = newName.trim();
        if (newAge !== null) ageEl.textContent = newAge.trim();
        if (newSex !== null) sexEl.textContent = newSex.trim();
        if (newPosition !== null) positionEl.textContent = newPosition.trim();
    }

    if (del) {
        const employee = del.closest('.employee_item');
        employee.remove();
    }
});

function deleteEmployee() {
    employee_item_delete_btns = document.querySelectorAll(".employee_item_delete-btn"); 
    employee_item_delete_btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const employee = btn.closest(".employee_item");
            employee.remove();
        })
    })
}