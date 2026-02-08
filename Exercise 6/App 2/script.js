const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const sexInput = document.getElementById("sex");
const positionInput = document.getElementById("position");
const addBtn = document.getElementById("addBtn");
const employeeList = document.getElementById("employeeList");

let editingEmployee = null;

addBtn.addEventListener("click", () => {
  const name = nameInput.value;
  const age = ageInput.value;
  const sex = sexInput.value;
  const position = positionInput.value;

  if (!name || !age || !sex || !position) return;

  if (editingEmployee) {
    updateEmployee(editingEmployee, name, age, sex, position);
    editingEmployee = null;
    addBtn.textContent = "Add Entry";
  } else {
    createEmployee(name, age, sex, position);
  }

  clearForm();
});

function createEmployee(name, age, sex, position) {
  const div = document.createElement("div");
  div.classList.add("employee");

  const info = document.createElement("p");
  info.textContent = `${name} | Age: ${age} | Sex: ${sex} | Position: ${position}`;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete");

  editBtn.addEventListener("click", () => {
    const parts = info.textContent.split(" | ");
    nameInput.value = parts[0];
    ageInput.value = parts[1].replace("Age: ", "");
    sexInput.value = parts[2].replace("Sex: ", "");
    positionInput.value = parts[3].replace("Position: ", "");

    editingEmployee = div;
    addBtn.textContent = "Save Changes";
  });

  deleteBtn.addEventListener("click", () => {
    div.remove();
  });

  div.appendChild(info);
  div.appendChild(editBtn);
  div.appendChild(deleteBtn);
  employeeList.appendChild(div);
}

function updateEmployee(div, name, age, sex, position) {
  div.querySelector("p").textContent =
    `${name} | Age: ${age} | Sex: ${sex} | Position: ${position}`;
}

function clearForm() {
  nameInput.value = "";
  ageInput.value = "";
  sexInput.value = "";
  positionInput.value = "";
}
