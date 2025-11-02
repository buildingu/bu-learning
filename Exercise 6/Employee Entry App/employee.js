const form = document.getElementById("employeeForm");
const listDiv = document.getElementById("employeeList");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const sex = document.getElementById("sex").value.trim();
  const position = document.getElementById("position").value.trim();

  if (!name || !age || !sex || !position) return alert("Please fill all fields!");

  const empDiv = document.createElement("div");
  empDiv.classList.add("employee");
  empDiv.innerHTML = `
    <span>${name}</span> <span>${age}</span> <span>${sex}</span> <span>${position}</span>
    <div>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    </div>
  `;

  const editBtn = empDiv.querySelector(".edit");
  editBtn.addEventListener("click", () => {
    document.getElementById("name").value = name;
    document.getElementById("age").value = age;
    document.getElementById("sex").value = sex;
    document.getElementById("position").value = position;
    empDiv.remove();
  });

  const deleteBtn = empDiv.querySelector(".delete");
  deleteBtn.addEventListener("click", () => empDiv.remove());

  listDiv.appendChild(empDiv);

  form.reset();
});
