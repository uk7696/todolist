//list
let todoItemsContainer = document.getElementById("todoItemsContainer");
let saveTodoList = document.getElementById("saveTodoList");
let addNewTodo = document.getElementById("addTodoButton");




// save list in local storage
saveTodoList.onclick = function(){
    localStorage.setItem("todolist",JSON.stringify(todolist));

};
// while add it is not saving in local storage
// get todolist from local storage
function getTodolistFromLocal(){
    let stringifiedList = localStorage.getItem("todolist");
    let parsed = JSON.parse(stringifiedList);
    if (parsed === null){
        return []
    }
    else{
        return parsed;
    }
}



// array of todolist//

// let todolist = [
//     {
//         text:"Learn HTML",
//         uniqueNo:1
//     },
//     {
//         text:"Learn CSS",
//         uniqueNo:2
//     },

//     {
//         text:"Learn BOOTSTRAP",
//         uniqueNo:3
//     },
//     {
//         text:"Learn JAVASCRIPT",
//         uniqueNo:4
//     },
// ]
   
let todolist = getTodolistFromLocal();
let todoCount = todolist.length;

// creating reusable function
function onTodoStatusChanged(checkboxId,labelId,todoId){
    let checkedBoxElement = document.getElementById(checkboxId);
    console.log(checkedBoxElement.checked);

    let labeledElement = document.getElementById(labelId);
    labeledElement.classList.toggle("checked");


    //findindex
    let todoOjectIndex = todolist.findIndex(function(eachTodo){
     let eachTodoId = "todo" + eachTodo.uniqueNo;
     if (eachTodoId === todoId){
        return true;
     }
     else{
        return false;
     }
    });
    let todoObject = todolist[todoOjectIndex];
    if(todoObject.isChecked === true){
        todoObject.isChecked = false;

    }
    else{
        todoObject.isChecked = true;
    }
}

// callback for delete icon 
function onDeleteTodo(todoId){
    let todoDelElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoDelElement);

    //delete in local storage
    let deleteElementIndex = todolist.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId){
            return true;
        }
        else{
            return false;
        }
    });
    todolist.splice(deleteElementIndex,1)
}

//onadd Todo
function onAddTodo(){
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value ;
    //alert box 
    if (userInputValue === ""){
        alert("Enter Valid Text");
        return;
    }
    todoCount = todoCount + 1;
    let newTodo = 
        {
            text:userInputValue,
            uniqueNo:todoCount,
            isChecked:false
        };
        todolist.push(newTodo);
        createAndAppendTodo(newTodo);
        userInputElement.value = "";
    
}

    //add icon 
   
    addNewTodo.onclick = function(){
        onAddTodo()
    }
function createAndAppendTodo(todo){
    //checkbox unique Id
    let checkboxId = "checkbox" + todo.uniqueNo;
    //label unique Id
    let labelId = "label" + todo.uniqueNo;
    //todoId 
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement('li');
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement); //position
    
    console.log(todoItemsContainer);
    
    
    //checkbox
    let checkboxElement = document.createElement('input');
    checkboxElement.type= "checkbox";
    checkboxElement.id=checkboxId;
    checkboxElement.checked = todo.isChecked;
    if (todo.isChecked === true){
        labelElement.classList.add("checked");
    }

    checkboxElement.classList.add("checkbox-input");
    todoElement.appendChild(checkboxElement); // position
    //adding event listener function
    checkboxElement.onclick = function(){
        onTodoStatusChanged(checkboxId,labelId,todoId)
    }
    
    //label container
    let labeldivElement = document.createElement('div');
    labeldivElement.classList.add('d-flex','flex-row','label-container');
    todoElement.appendChild(labeldivElement);// inside todo list
    
    let labelElement = document.createElement('label');
    labelElement.setAttribute("for",checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent=todo.text; //updatin text content
    //label id
    labelElement.id=labelId;
    labeldivElement.appendChild(labelElement); // inside label container
    
    //delete icon container
    let deleteIconContainer = document.createElement('div');
    deleteIconContainer.classList.add('delete-icon-container');
   
    labeldivElement.appendChild(deleteIconContainer);
    
    let iconElement = document.createElement('i');
    iconElement.classList.add('far', 'fa-trash-alt', 'delete-icon');
    deleteIconContainer.appendChild(iconElement);

     //delete function icon onclick
     deleteIconContainer.onclick = function(){
        onDeleteTodo(todoId);
    }

    //getitem setitem
  /*  let textTnputValue = document.getElementById("textareaInput");
    let saveButton = document.getElementById("saveButton");
    saveButton.onclick = function(){
        let userEnteredText = textTnputValue.value;
        localStorage.setItem("UserText",userEnteredText);
    }
    let storedInputsText = localStorage.getItem("UserText")
    if (storedInputsText === null){
        textTnputValue.value = "";
    }
    else{
        textTnputValue.value = storedInputsText;
    }*/
}



//minimize duplicate of code  
//for of loop

for(let todo of todolist){
    createAndAppendTodo(todo);
}