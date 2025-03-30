const form1 = document.getElementById('form');
const list1 = document.getElementById('list');


let addItems = () => {
    //make variables for info
    const name = document.getElementById('name').value;
    const sex = document.getElementById('sex').value;
    const age = document.getElementById('age').value;
    const position = document.getElementById('position').value;

    addEmployee(name, sex, age, position);

    //clear inputs
    form1.reset();
};

const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', addItems);

function addEmployee(name, sex, age, position) {
    const entry = document.createElement('div');
    entry.classList.add('employee-entry');
    //adding written info
    const entryInfo = document.createElement('div');
    entryInfo.classList.add('employee-info');
    entryInfo.innerHTML = `
        <h3>${name}</h3><br>
        Age: ${age}<br>
        Sex: ${sex}<br>
        Position: ${position}<br><br>
    `;

    //adding the buttons
    const entryActions = document.createElement('div');
    entryActions.classList.add('employee-info');
    const edit = document.createElement('button');
    edit.classList.add('edit');
    edit.textContent = 'Edit';
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.textContent = 'Delete';

    //appending all info
    entryInfo.appendChild(edit);
    entryInfo.appendChild(deleteBtn);
    entry.appendChild(entryInfo);
    list1.appendChild(entry);

    //adding event listeners
    edit.addEventListener('click', () => editEmployee(entry, name, age, sex, position));
    deleteBtn.addEventListener('click', () => entry.remove());
}


function editEmployee(entry, name, age, sex, position) {
    //get values from employee in entry
    document.getElementById('name').value = name;
    document.getElementById('age').value = age;
    document.getElementById('sex').value = sex;
    document.getElementById('position').value = position;

    //remove entry to replace it with new info
    entry.remove();
}
