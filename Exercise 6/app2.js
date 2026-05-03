const nameInput     = document.getElementById('empName');
const ageInput      = document.getElementById('empAge');
const sexInput      = document.getElementById('empSex');
const positionInput = document.getElementById('empPosition');
const addBtn        = document.getElementById('addEntryBtn');
const entriesList   = document.getElementById('entriesList');
const empError      = document.getElementById('empError');

let employees = [];
let editingId  = null;

function showError(msg) {
  empError.textContent = msg ? '✕ ' + msg : '';
}

function generateId() {
  return '_' + Math.random().toString(36).slice(2, 9);
}

function clearForm() {
  nameInput.value     = '';
  ageInput.value      = '';
  sexInput.value      = '';
  positionInput.value = '';
  showError('');
  editingId = null;
  addBtn.textContent = '+ Add Entry';
}

function validate() {
  const name     = nameInput.value.trim();
  const age      = ageInput.value.trim();
  const sex      = sexInput.value;
  const position = positionInput.value.trim();

  if (!name)     return showError('Name is required.'),     false;
  if (!age)      return showError('Age is required.'),      false;
  if (Number(age) < 16 || Number(age) > 100)
                 return showError('Enter a valid age (16–100).'), false;
  if (!sex)      return showError('Please select a sex.'), false;
  if (!position) return showError('Position is required.'), false;

  showError('');
  return { name, age: Number(age), sex, position };
}

function renderEntries() {
  entriesList.innerHTML = '';

  if (employees.length === 0) {
    entriesList.innerHTML = '<p style="color:var(--muted);font-size:.9rem">No entries yet. Add one above.</p>';
    return;
  }

  employees.forEach(emp => {
    const card = document.createElement('div');
    card.className = 'entry-card';
    card.dataset.id = emp.id;

    const info = document.createElement('div');
    info.className = 'entry-info';

    const namEl = document.createElement('div');
    namEl.className = 'entry-name';
    namEl.textContent = emp.name;

    const metaEl = document.createElement('div');
    metaEl.className = 'entry-meta';
    metaEl.textContent = `Age ${emp.age} · ${emp.sex} · ${emp.position}`;

    info.appendChild(namEl);
    info.appendChild(metaEl);

    const actions = document.createElement('div');
    actions.className = 'entry-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-edit';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => startEdit(emp.id));

    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-danger';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => deleteEntry(emp.id));

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    card.appendChild(info);
    card.appendChild(actions);
    entriesList.appendChild(card);
  });
}

function startEdit(id) {
  const emp = employees.find(e => e.id === id);
  if (!emp) return;

  nameInput.value     = emp.name;
  ageInput.value      = emp.age;
  sexInput.value      = emp.sex;
  positionInput.value = emp.position;

  editingId           = id;
  addBtn.textContent  = '✓ Save Changes';
  nameInput.focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteEntry(id) {
  employees = employees.filter(e => e.id !== id);
  if (editingId === id) clearForm();
  renderEntries();
}

addBtn.addEventListener('click', () => {
  const data = validate();
  if (!data) return;

  if (editingId) {
    const emp = employees.find(e => e.id === editingId);
    if (emp) Object.assign(emp, data);
  } else {
    employees.push({ id: generateId(), ...data });
  }

  clearForm();
  renderEntries();
});

renderEntries();