let number_of_employees = 0;

function add_employee() {
    number_of_employees += 1;

    const employee_block = document.createElement('div');
    employee_block.className = 'edit_form';

    const employee_form = document.createElement('form');

    const name_label = document.createElement('h3');
    name_label.innerHTML = 'NAME:';
    const employee_name = document.createElement('input');
    employee_name.placeholder = 'John Smith';
    employee_name.autocomplete = 'off';
    employee_form.append(name_label, employee_name);

    const age_label = document.createElement('h3');
    age_label.innerHTML = 'AGE:';
    const employee_age = document.createElement('input');
    employee_age.type = 'number';
    employee_age.placeholder = '27';
    employee_age.autocomplete = 'off';
    employee_form.append(age_label, employee_age);

    const gender_label = document.createElement('h3');
    gender_label.innerHTML = 'GENDER:';

    const label_employee_sex_female = document.createElement('label');
    const employee_sex_female_radio = document.createElement('input');
    employee_sex_female_radio.type = 'radio';
    employee_sex_female_radio.name = `employee_sex_${number_of_employees}`;
    employee_sex_female_radio.checked = true;
    label_employee_sex_female.append('Female', employee_sex_female_radio);

    const label_employee_sex_male = document.createElement('label');
    const employee_sex_male_radio = document.createElement('input');
    employee_sex_male_radio.type = 'radio';
    employee_sex_male_radio.name = `employee_sex_${number_of_employees}`;
    label_employee_sex_male.append('Male', employee_sex_male_radio);

    const label_employee_sex_other = document.createElement('label');
    const employee_sex_other_radio = document.createElement('input');
    employee_sex_other_radio.type = 'radio';
    employee_sex_other_radio.name = `employee_sex_${number_of_employees}`;
    label_employee_sex_other.append('Other', employee_sex_other_radio);

    const employee_sex = document.createElement('div');
    employee_sex.append(label_employee_sex_female, label_employee_sex_male, label_employee_sex_other);
    employee_form.append(gender_label, employee_sex);

    const position_label = document.createElement('h3');
    position_label.innerHTML = 'POSITION:';
    const employee_position = document.createElement('input');
    employee_position.placeholder = 'Cashier';
    employee_position.autocomplete = 'off';
    employee_form.append(position_label, employee_position);

    const line_break1 = document.createElement('br');
    const line_break2 = document.createElement('br');
    const add_entry_button = document.createElement('button');
    add_entry_button.type = 'button';
    add_entry_button.textContent = 'ADD ENTRY';
    add_entry_button.addEventListener('click', add_entry);

    employee_form.append(line_break1, line_break2, add_entry_button);
    employee_block.appendChild(employee_form);
    document.body.appendChild(employee_block);
}

function add_entry(event) {
    const parentDiv = event.target.closest('div');
    parentDiv.classList.replace("edit_form", "add_form");


    const inputs = parentDiv.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.type === 'radio' || input.type === 'checkbox') {
            input.disabled = true;
        } else {
            input.readOnly = true;
        }
    });

    event.target.style.display = 'none';

    const edit_button = document.createElement('button');
    edit_button.type = 'button';
    edit_button.textContent = 'EDIT';
    edit_button.addEventListener('click', edit_entry);

    const delete_button = document.createElement('button');
    delete_button.type = 'button';
    delete_button.textContent = 'DELETE';
    delete_button.addEventListener('click', delete_entry);

    parentDiv.append(edit_button, delete_button);
}

function edit_entry(event) {
    const parentDiv = event.target.closest('div');
    parentDiv.classList.replace("add_form", "edit_form");
    const inputs = parentDiv.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.type === 'radio' || input.type === 'checkbox') {
            input.disabled = false;
        } else {
            input.readOnly = false;
        }
    });

    const add_entry_button = parentDiv.querySelector('button:nth-of-type(1)');
    add_entry_button.style.display = 'inline-block';

    const edit_button = event.target;
    const delete_button = parentDiv.querySelector('button:nth-of-type(2)'); 
    if (delete_button) delete_button.remove();
    edit_button.remove();
}

function delete_entry(event) {
    const parentDiv = event.target.closest('div');
    parentDiv.remove();
}
