let users = [];
let isEditing = false;
let currentEditId = null;

const saveBtn = document.getElementById('c-save');
const userListDiv = document.getElementById('userList');

saveBtn.addEventListener('click', () => {
    const fName = document.getElementById('c-firstName').value;
    const lName = document.getElementById('c-lastName').value;
    const age = parseInt(document.getElementById('c-age').value);
    const phone = document.getElementById('c-phone').value;

    if (!fName || !lName || isNaN(age) || !phone) {
        alert("Please fill out all fields.");
        return;
    }
    if (age < 18) {
        alert("User must be 18 or older.");
        return;
    }

    if (isEditing) {
        const index = users.findIndex(u => u.id === currentEditId);
        users[index] = { id: currentEditId, fName, lName, age, phone };
        
        isEditing = false;
        currentEditId = null;
        saveBtn.innerText = "Submit User";
        document.getElementById('form-title').innerText = "User Manager";
    } else {
        const newUser = {
            id: Date.now(), 
            fName,
            lName,
            age,
            phone
        };
        users.push(newUser);
    }

    render();
    clearForm(); 
});

function deleteUser(id) {
    users = users.filter(user => user.id !== id);
    render();
}

function prepareEdit(id) {
    const user = users.find(u => u.id === id);
    
    document.getElementById('c-firstName').value = user.fName;
    document.getElementById('c-lastName').value = user.lName;
    document.getElementById('c-age').value = user.age;
    document.getElementById('c-phone').value = user.phone;
    
    isEditing = true;
    currentEditId = id;
    saveBtn.innerText = "Update User";
    document.getElementById('form-title').innerText = "Editing User...";
    
    window.scrollTo(0, 0);
}


function render() {
    userListDiv.innerHTML = ""; 

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = "user-card";
        userCard.style.cssText = "background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 250px; border-top: 5px solid #000080;";
        
        userCard.innerHTML = `
            <h3 style="color: #000080; margin-top: 0;">${user.fName} ${user.lName}</h3>
            <p><strong>Age:</strong> ${user.age}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <div style="display: flex; gap: 10px; margin-top: 15px;">
                <button onclick="prepareEdit(${user.id})" style="background: #9f9f9f; padding: 5px;">Edit</button>
                <button onclick="deleteUser(${user.id})" style="background: #000000; padding: 5px;">Delete</button>
            </div>
        `;
        userListDiv.appendChild(userCard);
    });
}

function clearForm() {
    document.getElementById('c-firstName').value = "";
    document.getElementById('c-lastName').value = "";
    document.getElementById('c-age').value = "";
    document.getElementById('c-phone').value = "";
}