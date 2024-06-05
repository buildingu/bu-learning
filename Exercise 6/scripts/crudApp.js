const employeeInfo = document.getElementById("EmployeeInfo");
const addBtn = document.getElementById("addButton");
var deleteBtns = Array.from(document.getElementsByClassName("deleteBtn"));
var editBtns = Array.from(document.getElementsByClassName("editBtn"));
const deleteEntry = function (element) {
  element.parentElement.parentElement.remove();
};
const editEntry = function (e) {
  let formData = e.parentElement.parentElement
    .querySelector(".profile")
    .querySelector(".info");
  document.getElementById("nameInput").value =
    formData.querySelector(".name").innerHTML;
  document.getElementById("ageInput").value =
    formData.querySelector(".age").innerHTML;
  document.getElementById("sexInput").value =
    formData.querySelector(".sex").innerHTML;
  document.getElementById("positionInput").value =
    formData.querySelector(".position").innerHTML;
  e.parentElement.parentElement.remove();
};
const addEntry = function () {
  let name = document.getElementById("nameInput").value;
  let age = document.getElementById("ageInput").value;
  let sex = document.getElementById("sexInput").value;
  let position = document.getElementById("positionInput").value;
  let initial = name.charAt(0);
  employeeInfo.innerHTML += `<br><br><div class="entryholder">
  <div class="profile">
      <div class="logo">
          <h1 class="initial">${initial}</h1>
      </div>
      <div class = "info">
          <h5>Name:</h5>
          <p class="name">${name}<p>
          <h5>Age:</h5>
          <p class="age">${age}<p>
          <h5>Sex:</h5>
          <p class="sex">${sex}<p>
          <h5>Position:</h5>
          <p class="position">${position}<p>
      </div>
  </div>
  <div class="buttons">
      <button class="editBtn" type="button" onclick="editEntry(this)">Edit</button>
      <button class="deleteBtn" type="button" onclick="deleteEntry(this)">Delete</button>
  </div>
</div>`;
};

addBtn.addEventListener("click", addEntry);
