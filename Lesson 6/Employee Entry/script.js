const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const sexInput = document.getElementById("sex");
const positionInput = document.getElementById("position");

const addBtn = document.getElementById("addBtn");

const employeeList = document.getElementById("employeeList");

let editCard = null;

addBtn.addEventListener("click", function () {

  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  const sex = sexInput.value.trim();
  const position = positionInput.value.trim();

  if (!name || !age || !sex || !position) {
    alert("Please fill out all fields");
    return;
  }

  // EDIT EXISTING ENTRY
  if (editCard) {

    editCard.querySelector(".name").textContent = `Name: ${name}`;
    editCard.querySelector(".age").textContent = `Age: ${age}`;
    editCard.querySelector(".sex").textContent = `Sex: ${sex}`;
    editCard.querySelector(".position").textContent = `Position: ${position}`;

    editCard = null;

    addBtn.textContent = "Add Entry";

  } else {

    // CREATE NEW CARD
    const card = document.createElement("div");
    card.classList.add("employee-card");

    card.innerHTML = `
      <p class="name"><strong>Name:</strong> ${name}</p>
      <p class="age"><strong>Age:</strong> ${age}</p>
      <p class="sex"><strong>Sex:</strong> ${sex}</p>
      <p class="position"><strong>Position:</strong> ${position}</p>

      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    employeeList.appendChild(card);

    // DELETE BUTTON
    const deleteBtn = card.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", function () {
      card.remove();
    });

    // EDIT BUTTON
    const editBtn = card.querySelector(".edit-btn");

    editBtn.addEventListener("click", function () {

      nameInput.value = name;
      ageInput.value = age;
      sexInput.value = sex;
      positionInput.value = position;

      editCard = card;

      addBtn.textContent = "Update Entry";
    });

  }

  // CLEAR INPUTS
  nameInput.value = "";
  ageInput.value = "";
  sexInput.value = "";
  positionInput.value = "";

});