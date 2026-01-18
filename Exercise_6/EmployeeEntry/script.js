const addBtn = document.getElementById('addBtn');
const employeeList = document.getElementById('employeeList');

addBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const age = document.getElementById('age').value.trim();
  const sex = document.getElementById('sex').value.trim();
  const position = document.getElementById('position').value.trim();

  if (!name || !age || !sex || !position) return alert('All fields are required');

  const div = document.createElement('div');
  div.className = 'employee-entry';
  div.innerHTML = `
    <p>Name: ${name}, Age: ${age}, Sex: ${sex}, Position: ${position}</p>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
  `;
  employeeList.appendChild(div);

  div.querySelector('.delete').onclick = () => div.remove();
  div.querySelector('.edit').onclick = () => {
    document.getElementById('name').value = name;
    document.getElementById('age').value = age;
    document.getElementById('sex').value = sex;
    document.getElementById('position').value = position;
    div.remove();
  };

  // Clear input fields
  document.getElementById('name').value = '';
  document.getElementById('age').value = '';
  document.getElementById('sex').value = '';
  document.getElementById('position').value = '';
});