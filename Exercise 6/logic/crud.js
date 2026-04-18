let employees = [];
let editMode = false;
let editId = null;

const addBtn = document.getElementById('add-entry-btn');
const displayArea = document.getElementById('employeeDisplay');

const inputName = document.getElementById('emp-name');
const inputAge = document.getElementById('emp-age');
const inputSex = document.getElementById('emp-sex');
const inputPos = document.getElementById('emp-position');

addBtn.addEventListener('click', () => {
    const name = inputName.value;
    const age = inputAge.value;
    const sex = inputSex.value;
    const position = inputPos.value;

    if (!name || !age || !sex || !position) {
        alert("Please fill in all fields.");
        return;
    }

    if (editMode) {
        const index = employees.findIndex(e => e.id === editId);
        employees[index] = { id: editId, name, age, sex, position };
        
        editMode = false;
        editId = null;
        addBtn.innerText = "Add Entry";
        document.getElementById('form-title').innerText = "Add New Employee";
    } else {
        const newEmployee = {
            id: Date.now(),
            name,
            age,
            sex,
            position
        };
        employees.push(newEmployee);
    }

    renderEmployees();
    clearInputs();
});

function deleteEntry(id) {
    employees = employees.filter(emp => emp.id !== id);
    renderEmployees();
}

function editEntry(id) {
    const emp = employees.find(e => e.id === id);
    
    inputName.value = emp.name;
    inputAge.value = emp.age;
    inputSex.value = emp.sex;
    inputPos.value = emp.position;
    
    editMode = true;
    editId = id;
    addBtn.innerText = "Save Changes";
    document.getElementById('form-title').innerText = "Edit Employee Info";
    window.scrollTo(0, 0); 
}

function renderEmployees() {
    displayArea.innerHTML = "";

    employees.forEach(emp => {
        const card = document.createElement('div');
        card.className = "user-card"; 
        card.style.cssText = "background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 280px; border-left: 6px solid #000080;";
        
        card.innerHTML = `
            <h3 style="color: #000080; margin: 0 0 10px 0;">${emp.name}</h3>
            <p><strong>Age:</strong> ${emp.age}</p>
            <p><strong>Sex:</strong> ${emp.sex}</p>
            <p><strong>Position:</strong> ${emp.position}</p>
            <div style="margin-top: 15px; display: flex; gap: 10px;">
                <button onclick="editEntry(${emp.id})" style="background: #9f9f9f; flex: 1; padding: 8px;">Edit</button>
                <button onclick="deleteEntry(${emp.id})" style="background: #000000; flex: 1; padding: 8px;">Delete</button>
            </div>
        `;
        displayArea.appendChild(card);
    });
}

function clearInputs() {
    inputName.value = "";
    inputAge.value = "";
    inputSex.value = "";
    inputPos.value = "";
}