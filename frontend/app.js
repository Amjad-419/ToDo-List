const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList   = document.getElementById("task-list");

function addTask (){
  const taskText = taskInput.value.trim();

// Überprüfen, ob das Eingabefeld nicht leer ist
if(taskText !== ''){
  const li = document.createElement('li');
  li.textContent = taskText;

  // Löschen-Button erstellen
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Löschen';
  deleteBtn.className = 'delete-btn';

  // Löschen-Button zum Listenelement hinzufügen
  li.appendChild(deleteBtn);

  // Neues Listenelement zur Liste hinzufügen 
  taskList.appendChild(li);

  taskInput.Value = '';
}
}
//----- Enter kliken----
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(e) {
  if (e.key === "Enter") {
  addTask();
  }
});

// Ereignislistener für den Hinzufügen-Button
addTaskBtn.addEventListener('click', addTask);

// Ereignislistener für Löschen-Buttons mit Event Delegation
taskList.addEventListener('click', function(e){
  if(e.target.classList.contains('delete-btn')){
  const li = e.target.parentElement;
  taskList.removeChild(li);
  }
})