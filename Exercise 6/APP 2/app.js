/*
  Employee Entry App (CRUD)
  - HTML starts with inputs + Add Entry button only
  - App container + list created via DOM
  - Each entry has Edit + Delete
*/

(function initUI(){
  const app = document.createElement('section');
  app.className = 'app';

  const title = document.createElement('h2');
  title.textContent = 'Employee Entry — CRUD';
  const subtitle = document.createElement('p');
  subtitle.textContent = 'Add employees, then edit or delete them.';

  const controls = document.createElement('div');
  controls.className = 'controls';

  const ids = ['name','age','sex','position','addBtn'];
  ids.forEach(id => controls.appendChild(document.getElementById(id)));

  const list = document.createElement('div');
  list.className = 'list';
  list.id = 'list';

  app.append(title, subtitle, controls, list);
  document.body.appendChild(app);
})();

const list = () => document.getElementById('list');

document.getElementById('addBtn').addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const age = document.getElementById('age').value.trim();
  const sex = document.getElementById('sex').value.trim();
  const position = document.getElementById('position').value.trim();

  if(!name || !age || !sex || !position){
    alert('Please fill out all fields.');
    return;
  }
  if(Number.isNaN(parseInt(age, 10))){
    alert('Age must be a number.');
    return;
  }

  addItem({ name, age: parseInt(age,10), sex, position });

  // Reset inputs
  document.getElementById('name').value = '';
  document.getElementById('age').value = '';
  document.getElementById('sex').value = '';
  document.getElementById('position').value = '';
});

function addItem({name, age, sex, position}){
  const row = document.createElement('div');
  row.className = 'item';

  const nameInput = makeROInput(name);
  const ageInput = makeROInput(String(age));
  const sexInput = makeROInput(sex);
  const posInput = makeROInput(position);

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'edit';
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete';

  let editing = false;

  editBtn.addEventListener('click', () => {
    editing = !editing;
    [nameInput, ageInput, sexInput, posInput].forEach(i => i.readOnly = !editing);
    editBtn.textContent = editing ? 'Save' : 'Edit';
    if(!editing){
      if(!nameInput.value.trim() || !ageInput.value.trim() || !sexInput.value.trim() || !posInput.value.trim()){
        alert('Fields cannot be empty.');
        return;
      }
      if(Number.isNaN(parseInt(ageInput.value, 10))){
        alert('Age must be a number.');
        return;
      }
    }
  });

  deleteBtn.addEventListener('click', () => {
    row.remove();
  });

  row.append(nameInput, ageInput, sexInput, posInput, editBtn, deleteBtn);
  list().appendChild(row);
}

function makeROInput(val){
  const i = document.createElement('input');
  i.value = val;
  i.readOnly = true;
  return i;
}
