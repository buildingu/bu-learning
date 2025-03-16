let users = [];
let isEditing = false;
let editIndex = null;

function displayUsers(){
    const userData = document.getElementById('userData');
    userData.innerHTML = '';

    users.forEach((user, index) => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user-card';
        userDiv.innerHTML = `
            <p>Name: ${user.fullName}</p>
            <p>Age: ${user.age}</p>
            <p>Sex: ${user.sex}</p>
            <p>Position: ${user.position}</p>
            <button type="edit" onclick="editUser(${index})">Edit</button>
            <button type="delete" onclick="deleteUser(${index})">Delete</button>
        `;
        userData.appendChild(userDiv);
    });
}

document.getElementById('validationForm').addEventListener('submit', function(event){
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const position = document.getElementById('position').value;

    if(fullName && age && sex && position){
        if (isEditing) {
            users[editIndex] = { fullName, age, sex, position };
            isEditing = false;
            editIndex = null;
            document.getElementById('submit').textContent = 'Add Entry';
        } else {
            const newUser = { fullName, age, sex, position };
            users.push(newUser);
        }
        displayUsers();
        document.getElementById('validationForm').reset();
    } else {
        alert('Please fill out all information');
    }
});

function editUser(index) {
    const user = users[index];
    document.getElementById('fullName').value = user.fullName;
    document.getElementById('age').value = user.age;
    document.getElementById('sex').value = user.sex;
    document.getElementById('position').value = user.position;

    isEditing = true;
    editIndex = index;
    document.getElementById('submit').textContent = 'Update Entry';
}

function deleteUser(index) {
    if(confirm('Are you sure you want to delete this user?')){        
        users.splice(index, 1);
        displayUsers();
    }
}

