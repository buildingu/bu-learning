const form = document.getElementById("validatorForm");
const messagesDiv = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  messagesDiv.innerHTML = "";

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const age = Number(document.getElementById("age").value.trim());
  const phoneNumber = document.getElementById("phoneNumber").value.trim();

  const errors = [];

  if (!firstName) errors.push("First name is required");
  if (!lastName) errors.push("Last name is required");
  if (!age && age !== 0) errors.push("Age is required");
  if (!phoneNumber) errors.push("Phone number is required");

  if (firstName && !/^[a-zA-Z]+$/.test(firstName)) errors.push("First name must contain only letters ^_^");
  if (lastName && !/^[a-zA-Z]+$/.test(lastName)) errors.push("Last name must contain only letters :)");
  if (age && (isNaN(age) || age < 18)) errors.push("You must be 18 or older. Too young!");
  if (phoneNumber && !/^\d{9}$/.test(phoneNumber)) errors.push("Phone number must be EXACTLY 9 digits.");

  if (errors.length > 0) {
    errors.forEach(err => {
      const p = document.createElement("p");
      p.textContent = err;
      p.classList.add("error");
      messagesDiv.appendChild(p);
    });
  } else {
    const p = document.createElement("p");
    p.textContent = "Welcome to ASOS!";
    p.classList.add("success");
    messagesDiv.appendChild(p);
    form.reset();
  }
});
