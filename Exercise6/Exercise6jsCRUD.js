const Name = document.querySelector("#Name")

const Age = document.querySelector("#Age")

const Gender = document.querySelector("#Gender")

const Position = document.querySelector("#Position")

const entryBtn = document.querySelector("#entryBtn")

const Parent = document.querySelector("#Parent")

entryBtn.addEventListener('click', function() {
    const NameRead = Name.value;
    const AgeRead = Age.value;
    const GenderRead = Gender.value;
    const PositionRead = Position.value;
    console.log(NameRead, AgeRead, GenderRead, PositionRead)
    const newEntry = document.createElement("li");
    Parent.appendChild(newEntry)
    const entryText = document.createElement("span");
    entryText.textContent = NameRead + ", " + AgeRead + ", " + GenderRead + ", " + PositionRead;
    newEntry.appendChild(entryText)
    const deleteEntry = document.createElement("button");
    deleteEntry.classList.add("entry-button");
    deleteEntry.addEventListener('click', function(){
        newEntry.remove();
    })
    deleteEntry.textContent = "Delete.";
    newEntry.appendChild(deleteEntry)
    const editEntry = document.createElement("button");
    editEntry.classList.add("entry-button");
    editEntry.addEventListener('click', function(){
        console.log(entryText.textContent)
        const details = entryText.textContent.split(", ")
        console.log(details)
        const editName = document.createElement("input");
        editName.classList.add("entry-input");
        editName.value = details[0];
        newEntry.appendChild(editName)
        const editAge = document.createElement("input");
        editAge.classList.add("entry-input");
        editAge.value = details[1];
        newEntry.appendChild(editAge)
        const editGender = document.createElement("input");
        editGender.classList.add("entry-input");
        editGender.value = details[2];
        newEntry.appendChild(editGender)
        const editPosition = document.createElement("input");
        editPosition.classList.add("entry-input");
        editPosition.value = details[3];
        newEntry.appendChild(editPosition)
        entryText.remove();
        const saveButton = document.createElement("button");
        saveButton.classList.add("entry-button");
        saveButton.addEventListener('click', function(){
            newEntry.appendChild(entryText)
            const editNamereader = editName.value;
            const editAgereader = editAge.value;
            const editGenderreader = editGender.value;
            const editPositionreader = editPosition.value;
            entryText.textContent = editNamereader + ", " + editAgereader + ", " + editGenderreader + ", " + editPositionreader;
            editName.remove();
            editAge.remove();
            editGender.remove();
            editPosition.remove();
            saveButton.remove();
        })
        saveButton.textContent = "Save."
        newEntry.appendChild(saveButton)
    })
    editEntry.textContent = "Edit.";
    newEntry.appendChild(editEntry)
})