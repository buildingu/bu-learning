let allSlots=[];

Form = document.querySelector('form');
Name = Form.querySelector('input[name="name"]');
Age = Form.querySelector('input[type=number]');
Sex = Form.querySelector('select');
Position = Form.querySelector('input[name="position"]');

template = document.querySelector('template').content;
slotContainer = document.querySelector('.slotContainer');

Form.addEventListener('submit', function (e) {
    e.preventDefault();
    const newslot = template.cloneNode(true);
    
    newslot.querySelector('.name').textContent = "Name: " + Name.value;
    newslot.querySelector('.age').textContent = "Age: " + Age.value;
    newslot.querySelector('.sex').textContent = "Sex: " + Sex.value;
    newslot.querySelector('.position').textContent = "Position: " + Position.value;
    
    slotElement=newslot.querySelector('.slot');
    // slotElement.querySelector('#edit').addEventListener('click',function(){
    //     editSlot(slotElement);
    // });

    // slotElement.querySelector('#delete').addEventListener('click',function(){
    //     slotElement.remove();
    // });

    slotContainer.appendChild(newslot);
    allSlots.push(slotElement);
    Form.reset();
});

slotContainer.addEventListener('click', function (e) {
  if (e.target.id === 'edit') {
    const slot = e.target.closest('.slot');

    const name = slot.querySelector('.name').textContent;
    const age = slot.querySelector('.age').textContent;
    const sex = slot.querySelector('.sex').textContent;
    const position = slot.querySelector('.position').textContent;

    // Strip labels and populate form
    Name.value = name.replace('Name: ', '');
    Age.value = parseInt(age.replace('Age: ', ''), 10);
    Sex.value = sex.replace('Sex: ', '');
    Position.value = position.replace('Position: ', '');

    slot.remove(); // optionally remove the old slot
  }

  if (e.target.id === 'delete') {
    const slot = e.target.closest('.slot');
    slot.remove();
  }
});


// function editSlot(slot) {
//     const name = slot.querySelector('.name');
//     const age = slot.querySelector('.age');
//     const sex = slot.querySelector('.sex');
//     const pos = slot.querySelector('.position');

//     Name.value= name.textContent.replace("Name: ", "");
//     Age.value= age.textContent.replace("Age: ", "");
//     Sex.value= sex.textContent.replace("Sex: ", "");
//     Position.value= pos.textContent.replace("Position: ", "");
//     slot.remove();
// };

