//validator app 
btn = document.getElementById("Confirm-Identity");
const alertPlaceholder = document.getElementById('alert');
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
btn.addEventListener("click", function(event) {
    

    First_Name = document.getElementById("First-Name").value;
    Last_Name = document.getElementById("Last-Name").value;
    Age = document.getElementById("Age").value;
    Phone = document.getElementById("Phone").value;

    if (First_Name === "") {
        appendAlert('Full Name is required.', 'danger');
        event.preventDefault();        
    }
    else if (Last_Name === "") {
        appendAlert('Last Name is required.', 'danger');
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
    else {
        appendAlert('Validated successfully!', 'success');
        event.preventDefault();
    }
});

