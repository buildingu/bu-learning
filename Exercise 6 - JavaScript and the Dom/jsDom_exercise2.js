const nameInput = document.querySelector("#name_input");
const ageInput = document.querySelector("#age_input");
const genderInput = document.querySelector("#gender_input");
const positionInput = document.querySelector("#position_input");

const unordered_list = document.querySelector("#storage");
function add_details(name, age, gender, position){
    const item = document.createElement("li");
    const text = document.createElement("span");
    text.textContent = `${name} is ${age} years old, and is a ${gender}, and a ${position}`;
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    item.appendChild(text);
    item.appendChild(editButton);
    item.appendChild(deleteButton);
    unordered_list.appendChild(item);

    deleteButton.addEventListener("click", () => {
        unordered_list.removeChild(item);
    })

    editButton.addEventListener("click", () => {
        const newName = prompt("Enter new name:");
        const newAge = prompt("Enter new age:");
        const newGender = prompt("Enter new gender:");
        const newPosition = prompt("Enter new position:");
        text.textContent = `${newName} is ${newAge} years old, and is a ${newGender}, and a ${newPosition}`;
    })
}

add_entry = document.querySelector("#add_Button");
add_entry.addEventListener("click", () => {
    const name_value = nameInput.value || undefined;
    const age_value = ageInput.value || undefined;
    const gender_value = genderInput.value || undefined;
    const position_value = positionInput.value || undefined;

    add_details(name_value, age_value, gender_value, position_value);
})