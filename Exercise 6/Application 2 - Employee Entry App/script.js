const addEntryButton = document.getElementById("addEntryButton");
const employeeList = document.getElementById("employeeList");

addEntryButton.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const sex = document.getElementById("sex").value;
  const position = document.getElementById("position").value;

  if (!name || !age || !sex || !position) {
    alert("All fields are required.");
    return;
  }

  const card = document.createElement("div");
  card.classList.add("employee-card");

  const nameP = document.createElement("p");
  const ageP = document.createElement("p");
  const sexP = document.createElement("p");
  const positionP = document.createElement("p");

  nameP.textContent = `Name: ${name}`;
  ageP.textContent = `Age: ${age}`;
  sexP.textContent = `Sex: ${sex}`;
  positionP.textContent = `Position: ${position}`;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("action-button", "edit");

  editButton.addEventListener("click", () => {
    const newName = prompt("Edit Name:", nameP.textContent.replace("Name: ", ""));
    const newAge = prompt("Edit Age:", ageP.textContent.replace("Age: ", ""));
    const newSex = prompt("Edit Sex:", sexP.textContent.replace("Sex: ", ""));
    const newPosition = prompt("Edit Position:", positionP.textContent.replace("Position: ", ""));

    if (newName && newAge && newSex && newPosition) {
      nameP.textContent = `Name: ${newName}`;
      ageP.textContent = `Age: ${newAge}`;
      sexP.textContent = `Sex: ${newSex}`;
      positionP.textContent = `Position: ${newPosition}`;
    }
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("action-button", "delete");

  deleteButton.addEventListener("click", () => {
    employeeList.removeChild(card);
  });

  card.appendChild(nameP);
  card.appendChild(ageP);
  card.appendChild(sexP);
  card.appendChild(positionP);
  card.appendChild(editButton);
  card.appendChild(deleteButton);

  employeeList.appendChild(card);

  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("sex").value = "";
  document.getElementById("position").value = "";
});
