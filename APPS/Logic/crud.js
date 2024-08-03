document.getElementById('employeeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const position = document.getElementById('position').value;

    const employeeEntry = document.createElement('div');
    employeeEntry.classList.add('employee-entry');
    updateEmployeeEntry(employeeEntry, name, age, sex, position);

    employeeList.appendChild(employeeEntry);

    document.getElementById('employeeForm').reset();

});

function updateEmployeeEntry(employeeEntry, name, age, sex, position) {
    employeeEntry.innerHTML = `
        <p>Name: ${name}</p>
        <p>Age: ${age}</p>
        <p>Sex: ${sex}</p>
        <p>Position: ${position}</p>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `;

    const editButton = employeeEntry.querySelector('.edit');
    const deleteButton = employeeEntry.querySelector('.delete');

    editButton.addEventListener('click', () => {
        const newName = prompt('Enter new name:', name);
        const newAge = prompt('Enter new age:', age);
        const newSex = prompt('Enter new sex:', sex);
        const newPosition = prompt('Enter new position:', position);

        updateEmployeeEntry(employeeEntry, newName, newAge, newSex, newPosition);
    });

    deleteButton.addEventListener('click', () => {
        employeeList.removeChild(employeeEntry);
    });
}