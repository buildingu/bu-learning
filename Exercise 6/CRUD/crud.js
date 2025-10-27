const form = document.querySelector(".employee-form");

let employee_container = document.querySelector(".employee_inner");



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

    employee_item.appendChild(employee_item_name);
    employee_item.appendChild(employee_item_age);
    employee_item.appendChild(employee_item_sex);
    employee_item.appendChild(employee_item_position);

    employee_container.appendChild(employee_item);
    
}