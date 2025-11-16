const addBtn = document.getElementById("addBtn");
const wrapper = document.getElementById("cards-wrapper");

addBtn.addEventListener("click", addEntry);

function addEntry() {
  const first = document.getElementById("first").value.trim();
  const last = document.getElementById("last").value.trim();
  const age = document.getElementById("age").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!first || !last || !age || !phone) return;

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="avatar">${first[0].toUpperCase()}</div>
    <p><strong>First Name:</strong> <span class="val-first">${first}</span></p>
    <p><strong>Last Name:</strong> <span class="val-last">${last}</span></p>
    <p><strong>Age:</strong> <span class="val-age">${age}</span></p>
    <p><strong>Phone:</strong> <span class="val-phone">${phone}</span></p>

    <button class="editBtn">Edit</button>
    <button class="deleteBtn">Delete</button>
  `;

  card.querySelector(".deleteBtn").addEventListener("click", () => card.remove());
  card.querySelector(".editBtn").addEventListener("click", () => editCard(card));

  wrapper.appendChild(card);

  document.getElementById("first").value = "";
  document.getElementById("last").value = "";
  document.getElementById("age").value = "";
  document.getElementById("phone").value = "";
}

function editCard(card) {
  const f = card.querySelector(".val-first");
  const l = card.querySelector(".val-last");
  const a = card.querySelector(".val-age");
  const p = card.querySelector(".val-phone");

  const nf = prompt("Edit First Name:", f.textContent);
  const nl = prompt("Edit Last Name:", l.textContent);
  const na = prompt("Edit Age:", a.textContent);
  const np = prompt("Edit Phone:", p.textContent);

  if (!nf || !nl || !na || !np) return;

  f.textContent = nf;
  l.textContent = nl;
  a.textContent = na;
  p.textContent = np;

  card.querySelector(".avatar").textContent = nf[0].toUpperCase();
}
