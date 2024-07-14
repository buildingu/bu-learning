const form = document.getElementById('form');
const employeeList = document.getElementById('employee-list');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const position = document.getElementById('position').value;

    const employeeItem = document.createElement('div');
    employeeItem.classList.add('employee');
    employeeItem.innerHTML = `
        <strong>Name:</strong> ${name} | 
        <strong>Age:</strong> ${age} | 
        <strong>Sex:</strong> ${sex} | 
        <strong>Position:</strong> ${position}
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `;

    employeeList.appendChild(employeeItem);

    document.getElementById('form').reset();
});

employeeList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        event.target.parentElement.remove();
    }

    if (event.target.classList.contains('edit')) {
        const employeeInfo = event.target.parentElement.textContent.split('|').map(info => info.trim());
        document.getElementById('name').value = employeeInfo[0].split(':')[1].trim();
        document.getElementById('age').value = employeeInfo[1].split(':')[1].trim();
        document.getElementById('sex').value = employeeInfo[2].split(':')[1].trim();
        document.getElementById('position').value = employeeInfo[3].split(':')[1].trim();
        event.target.parentElement.remove();
    }
});