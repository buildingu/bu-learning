const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const sexInput = document.getElementById("sex");
const positionInput = document.getElementById("position");
const employeeList = document.getElementById("employee-list");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const age = parseInt(ageInput.value.trim());
  const sex = sexInput.value;
  const position = positionInput.value.trim();

  // Clear previous errors
  document.getElementById("error-box")?.remove();

  if (!name || isNaN(age) || !sex || !position) {
    showError("❌ All fields are required.");
    return;
  }

  if (age < 18) {
    showError("❌ Sorry, not old enough for our app.");
    return;
  }

  addEntry({ name, age, sex, position });

  form.reset();
});

function showError(message) {
  const error = document.createElement("div");
  error.id = "error-box";
  error.className = "error";
  error.textContent = message;
  form.insertAdjacentElement("beforebegin", error);
}

function addEntry({ name, age, sex, position }) {
  const entryDiv = document.createElement("div");
  entryDiv.classList.add("employee");

  entryDiv.innerHTML = `
    <p>👤 ${name}</p>
    <p>🎂 ${age}</p>
    <p>🧿 ${sex}</p>
    <p>💼 ${position}</p>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;

  // DELETE
  entryDiv.querySelector(".delete-btn").addEventListener("click", () => {
    employeeList.removeChild(entryDiv);
  });

  // EDIT
  entryDiv.querySelector(".edit-btn").addEventListener("click", () => {
    nameInput.value = name;
    ageInput.value = age;
    sexInput.value = sex;
    positionInput.value = position;
    employeeList.removeChild(entryDiv);
  });

  employeeList.appendChild(entryDiv);
}
