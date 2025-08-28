const [nameInput, ageInput, sexSelect, positionInput, addBtn, updateBtn, cancelBtn, employeeList, noEmployees] = 
    ['employeeName', 'employeeAge', 'employeeSex', 'employeePosition', 'addBtn', 'updateBtn', 'cancelBtn', 'employeeList', 'noEmployees']
    .map(id => document.getElementById(id));

const formHeader = document.getElementById('form-header');

let employees = [];
let editingIndex = -1;

const toggleElement = (element, show) => element.classList.toggle('hidden', !show);
const clearForm = () => [nameInput, ageInput, sexSelect, positionInput].forEach(input => input.value = '');
const getFormData = () => ({ name: nameInput.value.trim(), age: parseInt(ageInput.value.trim()), sex: sexSelect.value, position: positionInput.value.trim() });

const validateForm = () => {
    const { name, age, sex, position } = getFormData();
    if (!name || !age || !sex || !position) return alert('Please fill in all fields'), false;
    if (isNaN(age) || age <= 0) return alert('Please enter a valid age'), false;
    return true;
};

const renderEmployees = () => {
    const isEmpty = employees.length === 0;
    
    if (isEmpty) {
        employeeList.innerHTML = '';
        employeeList.appendChild(noEmployees);
        noEmployees.classList.remove('hidden');
        return;
    }
    
    noEmployees.classList.add('hidden');
    employeeList.innerHTML = employees.map((emp, i) => `
        <div class="employee-card" data-index="${i}">
            <div class="employee-info">
                <div class="employee-name">${emp.name}</div>
                <div class="employee-details">
                    <span class="employee-detail"><strong>Age:</strong> ${emp.age}</span>
                    <span class="employee-detail"><strong>Sex:</strong> ${emp.sex}</span>
                    <span class="employee-detail"><strong>Position:</strong> ${emp.position}</span>
                </div>
            </div>
            <div class="employee-actions">
                <button class="edit-btn" data-action="edit">Edit</button>
                <button class="delete-btn" data-action="delete">Delete</button>
            </div>
        </div>
    `).join('');
};

const scrollToElement = (selector, delay = 100) => setTimeout(() => 
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), delay);

const addEmployee = () => {
    if (!validateForm()) return;
    employees.push(getFormData());
    renderEmployees();
    clearForm();
    scrollToElement('.employee-card:last-child');
};

const editEmployee = (index) => {
    const emp = employees[index];
    [nameInput.value, ageInput.value, sexSelect.value, positionInput.value] = [emp.name, emp.age, emp.sex, emp.position];
    editingIndex = index;
    toggleElement(addBtn, false);
    toggleElement(updateBtn, true);
    toggleElement(cancelBtn, true);
    if (formHeader) formHeader.textContent = 'Edit Employee';
    scrollToElement('.form-section');
    nameInput.focus();
};

const updateEmployee = () => {
    if (!validateForm()) return;
    employees[editingIndex] = getFormData();
    exitEditMode();
    renderEmployees();
    scrollToElement(`.employee-card:nth-child(${editingIndex + 1})`);
};

const deleteEmployee = (index) => {
    if (!confirm(`Are you sure you want to delete ${employees[index].name}?`)) return;
    employees.splice(index, 1);
    renderEmployees();
    if (editingIndex === index) exitEditMode();
    else if (editingIndex > index) editingIndex--;
};

const exitEditMode = () => {
    editingIndex = -1;
    clearForm();
    toggleElement(addBtn, true);
    toggleElement(updateBtn, false);
    toggleElement(cancelBtn, false);
    if (formHeader) formHeader.textContent = 'Add Employee';
};

addBtn.onclick = addEmployee;
updateBtn.onclick = updateEmployee;
cancelBtn.onclick = () => exitEditMode();

ageInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

[nameInput, ageInput, positionInput, sexSelect].forEach(input => 
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            editingIndex === -1 ? addEmployee() : updateEmployee();
        }
    }));

document.addEventListener('DOMContentLoaded', () => (renderEmployees(), nameInput.focus()));

// Event delegation for edit/delete buttons
employeeList.addEventListener('click', (e) => {
    const button = e.target.closest('button[data-action]');
    if (!button) return;
    
    const card = button.closest('.employee-card');
    const index = parseInt(card.dataset.index);
    
    if (button.dataset.action === 'edit') editEmployee(index);
    if (button.dataset.action === 'delete') deleteEmployee(index);
});

Object.assign(window, { editEmployee, deleteEmployee });