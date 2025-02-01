const button = document.getElementById("submit");
const Fname = document.getElementById("First name");
const Lname = document.getElementById("Last Name");
const Age = document.getElementById("Age");
const number = document.getElementById("number");
const entriesContainer = document.getElementById("entriesContainer");

button.addEventListener("click", function(event) {
  // Prevent the form from submitting
  event.preventDefault();

  // Validation checks
  if (Fname.value === "") {
    alert("First name is required");
    return false;
  }
  if (Lname.value === "") {
    alert("Last name is required");
    return false;
  }
  if (Age.value === "" || Age.value <= 18) {
    alert("Age is required and must be over or equal to 18");
    return false;
  }
  if (number.value === "") {
    alert("Phone number is required with only numbers");
    return false;
  }

  // Create new entry element
  const entry = document.createElement("div");
  entry.classList.add("entry");

  // Add content to the entry
  entry.innerHTML = `
    <strong>First Name:</strong> <span class="first-name">${Fname.value}</span> <br>
    <strong>Last Name:</strong> <span class="last-name">${Lname.value}</span> <br>
    <strong>Age:</strong> <span class="age">${Age.value}</span> <br>
    <strong>Phone Number:</strong> <span class="phone">${number.value}</span> <br>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
  `;

  // Add the entry to the container
  entriesContainer.appendChild(entry);

  // Clear the form
  Fname.value = "";
  Lname.value = "";
  Age.value = "";
  number.value = "";

  // Attach event listeners to edit and delete buttons
  const editButton = entry.querySelector(".edit");
  const deleteButton = entry.querySelector(".delete");

  editButton.addEventListener("click", () => editEntry(entry));
  deleteButton.addEventListener("click", () => deleteEntry(entry));

  alert("Form submitted successfully!");
});

// Function to handle editing an entry
function editEntry(entry) {
  // Directly retrieve textContent from the span elements
  const firstName = entry.querySelector(".first-name").textContent;
  const lastName = entry.querySelector(".last-name").textContent;
  const age = entry.querySelector(".age").textContent;
  const phone = entry.querySelector(".phone").textContent;

  // Populate the form with the current values for editing
  Fname.value = firstName;
  Lname.value = lastName;
  Age.value = age;
  number.value = phone;

  // Optionally remove the entry after editing
  entry.remove();
}

// Function to handle deleting an entry
function deleteEntry(entry) {
  entry.remove();
}
