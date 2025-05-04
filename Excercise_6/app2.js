
let editting = null
document.getElementById("add").onclick = function(){
    const employee={
        name: document.getElementById("name").value,
        age:  document.getElementById("age").value,
        sex: document.getElementById("sex").value,
        position: document.getElementById("position").value  
    }


title.innerHTML = "Here are the current records: " 

//const NewDiv = document.createElement('li')
//NewDiv.textContent = "Name: " + employee.name + ", Age: " + employee.age + ", Sex: " + employee.sex + ", Position: " + employee.position

if(editting !== null){
    editting.textContent = "Name: " + employee.name + ", Age: " + employee.age + ", Sex: " + employee.sex + ", Position: " + employee.position
    
const removebtn = document.createElement('button'); 
removebtn.textContent = "Remove"

removebtn.onclick = function(){
    editting.remove()
}
const editbtn = document.createElement("button")
editbtn.textContent = "Edit"

editbtn.onclick = function(){
    document.getElementById("name").value = employee.name
    document.getElementById("age").value = employee.age
    document.getElementById("sex").value = employee.sex
    document.getElementById("position").value = employee.position
    document.getElementById("add").textContent = "Update Entry"

    editting = this.parentElement

   

}

editting.appendChild(removebtn)
editting.appendChild(editbtn)

editting = null
document.getElementById("add").textContent = "Add Entry"
}
else{
const NewDiv = document.createElement('li')
NewDiv.textContent = "Name: " + employee.name + ", Age: " + employee.age + ", Sex: " + employee.sex + ", Position: " + employee.position
const removebtn = document.createElement('button'); 
removebtn.textContent = "Remove"

removebtn.onclick = function(){
    NewDiv.remove()
}
const editbtn = document.createElement("button")
editbtn.textContent = "Edit"

editbtn.onclick = function(){
    document.getElementById("name").value = employee.name
    document.getElementById("age").value = employee.age
    document.getElementById("sex").value = employee.sex
    document.getElementById("position").value = employee.position
    document.getElementById("add").textContent = "Update Entry"

    editting = NewDiv

   

}
NewDiv.appendChild(removebtn);
NewDiv.appendChild(editbtn)
document.body.appendChild(NewDiv)

}




    document.body.appendChild(NewDiv);
    document.getElementById("name").value = ""
    document.getElementById("age").value = ""
    document.getElementById("sex").value = ""
    document.getElementById("position").value = ""
    document.getElementById("add").textContent = "Add Entry"
}

