// CRUD app

counter = 0;
// Insertion of data
btn = document.getElementById("Insert");
const alertPlaceholder = document.getElementById('alert')
const appendAlert = (message, type) => {
        alertPlaceholder.innerHTML = ''; // Clear previous alerts
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join(''); 

        alertPlaceholder.append(wrapper);
    }

const dataPlaceholder = document.getElementById('data-center')
const appendData = (firstName, lastName, age, phone) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div class="card" style="width: 18rem;">`,
        `   <ul class="list-group list-group-flush">`,
        `       <li class="list-group-item" id="firstName-${counter}">First Name: ${firstName}</li>`,
        `       <li class="list-group-item" id="lastName-${counter}">Last Name: ${lastName}</li>`,
        `       <li class="list-group-item" id="age-${counter}">Age: ${age}</li>`,
        `       <li class="list-group-item" id="phone-${counter}">Phone: ${phone}</li>`,
        `   </ul>`,
        `   <div class="card-body">`,
        `       <button type="button" class="card-link" id="edit-${counter}">Edit</button>`,
        `       <button type="button" class="card-link" id="delete-${counter}">Delete</button>`,
        `   </div>`,
        `</div>`
    ].join('');

    dataPlaceholder.append(wrapper);
}


btn.addEventListener("click", function(event) {
    

    First_Name = document.getElementById("First-Name").value;
    Last_Name = document.getElementById("Last-Name").value;
    Age = document.getElementById("Age").value;
    Phone = document.getElementById("Phone").value;

    // Check if we're in edit mode - if so, skip insertion
    const editButtons = document.querySelectorAll("[id^=edit-][data-is-updating='true']");
    if (editButtons.length > 0) {
        return;
    }

    if (First_Name === "") {
        appendAlert('Full Name is required.', 'danger');
        event.preventDefault();
    }
    else if (Last_Name === "") {
        appendAlert ('Last Name is required.', 'danger');
        event.preventDefault();
    }
    else if (Age === "") {
        appendAlert('Age is required.', 'danger');
        event.preventDefault();
    }
    else if (Phone === "") {
        appendAlert('Phone is required.', 'danger');
        event.preventDefault();
    }
    else if (Phone === "") {
        appendAlert('Phone is required.', 'danger');
        event.preventDefault();
    }
    else {
        appendAlert('Inserted successfully!', 'success');
        appendData(First_Name, Last_Name, Age, Phone);
        counter++;
        document.querySelector("#First-Name").value = "";
        document.querySelector("#Last-Name").value = "";
        document.querySelector("#Age").value = "";
        document.querySelector("#Phone").value = "";
        event.preventDefault();
    }


});

// Edit button
dataPlaceholder.addEventListener("click", function(event) {
    if (event.target.id.startsWith("edit-")) {
        event.preventDefault();
        id = event.target.id.split("-")[1]; 
        const firstName = document.getElementById(`firstName-${id}`).innerText.split(": ")[1];
        const lastName = document.getElementById(`lastName-${id}`).innerText.split(": ")[1];
        const age = document.getElementById(`age-${id}`).innerText.split(": ")[1];
        const phone = document.getElementById(`phone-${id}`).innerText.split(": ")[1];

        const firstnameplaceholder = document.querySelector("#First-Name");
        const lastnameplaceholder = document.querySelector("#Last-Name");
        const ageplaceholder = document.querySelector("#Age");
        const phoneplaceholder = document.querySelector("#Phone");

        firstnameplaceholder.value = firstName;
        lastnameplaceholder.value = lastName;
        ageplaceholder.value = age;
        phoneplaceholder.value = phone;

        event.target.textContent = "Update";
        event.target.dataset.isUpdating = "true";
        document.getElementById("Insert").textContent = "Update Record";
    }
});

// Update 
const insertBtn = document.getElementById("Insert");
insertBtn.addEventListener("click", function(event) {
    const editButtons = document.querySelectorAll("[id^=edit-][data-is-updating='true']");
    if (editButtons.length > 0) {
        const editBtn = editButtons[0];
        const id = editBtn.id.split("-")[1];
        
        const updatedFirstName = document.querySelector("#First-Name").value;
        const updatedLastName = document.querySelector("#Last-Name").value;
        const updatedAge = document.querySelector("#Age").value;
        const updatedPhone = document.querySelector("#Phone").value;

        document.getElementById(`firstName-${id}`).innerText = `First Name: ${updatedFirstName}`;
        document.getElementById(`lastName-${id}`).innerText = `Last Name: ${updatedLastName}`;
        document.getElementById(`age-${id}`).innerText = `Age: ${updatedAge}`;
        document.getElementById(`phone-${id}`).innerText = `Phone: ${updatedPhone}`;

        appendAlert('Updated successfully!', 'success');
        editBtn.textContent = "Edit";
        editBtn.dataset.isUpdating = "false";
        document.getElementById("Insert").textContent = "Insert";
        
        // Clear form after update
        document.querySelector("#First-Name").value = "";
        document.querySelector("#Last-Name").value = "";
        document.querySelector("#Age").value = "";
        document.querySelector("#Phone").value = "";
        
        event.preventDefault();
        return;
    }
});

// Delete
dataPlaceholder.addEventListener("click", function(event) {
    if (event.target.id.startsWith("delete-")) {
        event.preventDefault();
        id = event.target.id.split("-")[1];
        const card = document.getElementById(`firstName-${id}`).closest(".card");
        card.remove();
        appendAlert('Deleted successfully!', 'success');
    }
});



