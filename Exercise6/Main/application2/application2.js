// initialize the add entry and reset buttons
const btn=document.getElementById("btn");
const resetBtn=document.getElementById("resetBtn");
btn.addEventListener("click",submitForm);
resetBtn.addEventListener("click",resetForm);

// function to validate input fields
function validateInput(fullName,age,sex,position){
    // if any field is empty or invalid, alert the user
    if (!fullName || !age || !sex || !position) {
        alert("All fields are required.");
        // return false to indicate an error
        return false;
    }

    // check if age is a number
    if(isNaN(age)){
        alert("Enter a number for age.");
        // false indicates error
        return false;
    }

    // check if age is less than 18
    else if(age<18){
        alert("Employee must be at least 18 years old.");
        // indicate error
        return false;
    }
    // if all validations pass then return true 
    return true;
}

// simplify appending elements
function appendChild(id,element){
    document.getElementById(id).appendChild(element);
}

// simplify removing elements
function removeChild(id,element){
    document.getElementById(id).removeChild(element);
}

function submitForm() {

    // obtain values from input fields
    const fullName=document.getElementById("fullName").value.trim();
    const age=document.getElementById("age").value.trim();
    const sex=document.getElementById("sex").value.trim();
    const position=document.getElementById("position").value.trim();

    // if all validations pass, create a new entry
    if(validateInput(fullName,age,sex,position)){
        // add the new entry to the list
        const newEntry=document.createElement("li");
        newEntry.textContent=`Name: ${fullName}, Age: ${age}, Sex: ${sex}, Position: ${position}`;
        appendChild("entriesList", newEntry);

        // add an edit button for each entry
        const editBtn=document.createElement("button");
        editBtn.textContent="Edit";
        appendChild("entriesList", editBtn);
        editBtn.addEventListener("click",editEntry);

        // add a delete button for each entry
        const deleteBtn=document.createElement("button");
        deleteBtn.textContent="Delete";
        appendChild("entriesList", deleteBtn);
        deleteBtn.addEventListener("click",deleteEntry);
        
        function editEntry(){
            // use prompts to edit entry details
            const newFullName=prompt("Edit Name:", fullName);
            const newAge=prompt("Edit Age:", age);
            const newSex=prompt("Edit Sex:",sex);
            const newPosition=prompt("Edit Position:", position);

            // if all new values are valid, update the entry
            if(validateInput(newFullName,newAge,newSex,newPosition)){
                removeChild("entriesList", newEntry);
                removeChild("entriesList", editBtn);
                removeChild("entriesList", deleteBtn);
                newEntry.textContent= `Name: ${newFullName}, Age: ${newAge}, Sex: ${sex}, Position: ${newPosition}`;
                appendChild("entriesList", newEntry);
                appendChild("entriesList", editBtn);
                appendChild("entriesList", deleteBtn);
            }
        }
        function deleteEntry(){
            removeChild("entriesList", newEntry);
            removeChild("entriesList", editBtn);
            removeChild("entriesList", deleteBtn);
        }
    }
}

// reset the values in the input fields
function resetForm(){
    fullName.value="";
    age.value="";
    sex.value="";
    position.value="";
}