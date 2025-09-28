document.getElementById("employeeForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const sex = document.getElementById("sex").value.trim();
  const position = document.getElementById("position").value.trim();

  if (name && age && sex && position) {
    addEmployee(name, age, sex, position);
    document.getElementById("employeeForm").reset();
  }
});

function addEmployee(name, age, sex, position) {
  const list = document.getElementById("employeeList");

  const card = document.createElement("div");
  card.className = "employee-card";

  const profile = document.createElement("div");
  profile.className = "profile-circle";
  profile.textContent = name.charAt(0).toUpperCase();

  const info = document.createElement("div");
  info.className = "employee-info";

  const nameEl = document.createElement("p");
  nameEl.textContent = `Name: ${name}`;
  const ageEl = document.createElement("p");
  ageEl.textContent = `Age: ${age}`;
  const sexEl = document.createElement("p");
  sexEl.textContent = `Sex: ${sex}`;
  const posEl = document.createElement("p");
  posEl.textContent = `Position: ${position}`;

  info.append(nameEl, ageEl, sexEl, posEl);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => editEmployee(card, info);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => card.remove();

  card.append(profile, info, editBtn, deleteBtn);
  list.appendChild(card);
}

function editEmployee(card, info) {
  const [name, age, sex, position] = info.textContent.split(", ").map(s => s.trim());

  const nameInput = document.createElement("input");
  nameInput.value = name;

  const ageInput = document.createElement("input");
  ageInput.type = "number";
  ageInput.value = age;

  const sexInput = document.createElement("input");
  sexInput.value = sex;

  const posInput = document.createElement("input");
  posInput.value = position;

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.onclick = () => {
    info.textContent = `${nameInput.value}, ${ageInput.value}, ${sexInput.value}, ${posInput.value}`;
    card.replaceChildren(card.children[0], info, editBtn, deleteBtn);
  };

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => editEmployee(card, info);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => card.remove();

  card.replaceChildren(card.children[0], nameInput, ageInput, sexInput, posInput, saveBtn);
}