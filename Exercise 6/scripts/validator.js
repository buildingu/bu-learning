//validator app 
btn1 = document.getElementById("Confirm-Identity");
const alertPlaceholder1 = document.getElementById('alert1')
const appendAlert1 = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder1.append(wrapper)
    }
btn1.addEventListener("click", function(event) {
    

    First_Name = document.getElementById("First-Name").value;
    Last_Name = document.getElementById("Last-Name").value;
    Age = document.getElementById("Age").value;
    Phone = document.getElementById("Phone").value;

    if (First_Name === "") {
        appendAlert1('Full Name is required.', 'danger')
        event.preventDefault();        
    }
    else if (Last_Name === "") {
        appendAlert1('Last Name is required.', 'danger')
        event.preventDefault();
    }
    else if (Age === "") {
        appendAlert1('Age is required.', 'danger')
        event.preventDefault();
    }
    else if (Phone === "") {
        appendAlert1('Phone is required.', 'danger')
        event.preventDefault();
    }
    else if (Phone === "") {
        appendAlert1('Phone is required.', 'danger')
        event.preventDefault();
    }
    else {
        appendAlert1('Validated successfully!', 'success')
        event.preventDefault();
    }
});

