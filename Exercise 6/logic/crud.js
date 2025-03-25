const form = document.getElementById('form');
const employeeList = document.getElementById('employee-list');
let editingEmployee = null;  // Track which employee is being edited

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const position = document.getElementById('position').value;

    // Validate form fields
    if (!name || !age || !sex || !position) {
        alert('Please fill out all fields.');
        return;
    }

    // If we are editing an existing employee
    if (editingEmployee) {
        editingEmployee.querySelector('.name').textContent = `Name: ${name}`;
        editingEmployee.querySelector('.age').textContent = `Age: ${age}`;
        editingEmployee.querySelector('.sex').textContent = `Sex: ${sex}`;
        editingEmployee.querySelector('.position').textContent = `Position: ${position}`;

        editingEmployee = null; // Reset the editing state
    } else {
        // Otherwise, create a new employee item
        const employeeItem = document.createElement('div');
        employeeItem.classList.add('employee');
        employeeItem.innerHTML = `
            <strong class="name">Name:</strong> ${name} | 
            <strong class="age">Age:</strong> ${age} | 
            <strong class="sex">Sex:</strong> ${sex} | 
            <strong class="position">Position:</strong> ${position}
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;

        employeeList.appendChild(employeeItem);
    }

    // Reset form
    form.reset();
});

employeeList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        event.target.parentElement.remove();
    }

    if (event.target.classList.contains('edit')) {
        const employeeItem = event.target.parentElement;
        
        // Get employee data and fill the form with it
        document.getElementById('name').value = employeeItem.querySelector('.name').textContent.split(':')[1].trim();
        document.getElementById('age').value = employeeItem.querySelector('.age').textContent.split(':')[1].trim();
        document.getElementById('sex').value = employeeItem.querySelector('.sex').textContent.split(':')[1].trim();
        document.getElementById('position').value = employeeItem.querySelector('.position').textContent.split(':')[1].trim();

        // Remove the employee item from the list since we're editing
        employeeItem.remove();

        // Mark that we are editing an employee
        editingEmployee = employeeItem;
    }
});