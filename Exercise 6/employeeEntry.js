// Get elements
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const sexInput = document.getElementById('sex');
const positionInput = document.getElementById('position');
const addBtn = document.getElementById('addBtn');
const employeeList = document.getElementById('employeeList');

// Add entry function
addBtn.addEventListener('click', function() {
    // Get values
    const name = nameInput.value;
    const age = ageInput.value;
    const sex = sexInput.value;
    const position = positionInput.value;
    
    if (name === '' || age === '' || sex === '' || position === '') {
        alert('Please fill in all fields!');
        return;
    }
 
    
    const employeeCard = document.createElement('div');
    employeeCard.className = 'employee-card';
    employeeCard.innerHTML = `
        <div class="employee-info">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Sex:</strong> ${sex}</p>
            <p><strong>Position:</strong> ${position}</p>
        </div>
        <div class="button-group">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;
    
    employeeList.appendChild(employeeCard);
    
    nameInput.value = '';
    ageInput.value = '';
    sexInput.value = '';
    positionInput.value = '';
    
    // Get buttons
    const editBtn = employeeCard.querySelector('.edit-btn');
    const deleteBtn = employeeCard.querySelector('.delete-btn');
    const infoDiv = employeeCard.querySelector('.employee-info');
    
    
    deleteBtn.addEventListener('click', 
    function() {
        employeeList.removeChild(employeeCard);
    }
);
    
        /*
        Get info from inputed value.
        Change the edit button into a save button.
        If save button is clicked, change back to edit button and save the new info
            Accomplish by getting value of each input field, i.e const newXX = document.getElementById('XX').value;
            Then save newXX to 'current' field (update innerHTML).

        */

     editBtn.addEventListener('click', function() {
        
        if (editBtn.textContent === 'Save') {
            const newName = employeeCard.querySelector('#editName').value;
            const newAge = employeeCard.querySelector('#editAge').value;
            const newSex = employeeCard.querySelector('#editSex').value;
            const newPosition = employeeCard.querySelector('#editPosition').value;
            
            infoDiv.innerHTML = `
                <p><strong>Name:</strong> ${newName}</p>
                <p><strong>Age:</strong> ${newAge}</p>
                <p><strong>Sex:</strong> ${newSex}</p>
                <p><strong>Position:</strong> ${newPosition}</p>
            `;
            
            editBtn.textContent = 'Edit';
            editBtn.className = 'edit-btn';
            
        } else /*If in edit mode*/{
            const currentName = infoDiv.querySelector('p:nth-child(1)').textContent;
            const currentAge = infoDiv.querySelector('p:nth-child(2)').textContent;
            const currentSex = infoDiv.querySelector('p:nth-child(3)').textContent;
            const currentPosition = infoDiv.querySelector('p:nth-child(4)').textContent;
            
            infoDiv.innerHTML = `
                <input type="text" class="edit-input" id="editName" value="${currentName}">
                <input type="number" class="edit-input" id="editAge" value="${currentAge}">
                <input type="text" class="edit-input" id="editSex" value="${currentSex}">
                <input type="text" class="edit-input" id="editPosition" value="${currentPosition}">
            `;
            
            editBtn.textContent = 'Save';
            editBtn.className = 'save-btn';
        }
    });
});