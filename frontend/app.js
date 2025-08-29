const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList   = document.getElementById("task-list");


async function addTask(){
  const taskText = taskInput.value.trim();
  if(taskText === "") return;

  await fetch("/tasks", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ task: taskText })
  });

  taskInput.value = "";
  loadTasks();
}

// Enter-Taste zum Hinzufügen
taskInput.addEventListener('keydown', function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});
// Klick auf Button -> Aufgabe hinzufügen
addTaskBtn.addEventListener('click', addTask);

// Aufgaben vom Backend laden
async function loadTasks(){
  const res = await fetch("/tasks");
  const tasks = await res.json();

  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.task_text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Löschen";
    deleteBtn.onclick = async () => {
      await fetch(`/tasks/${task.id}`, { method: "DELETE" });
      loadTasks();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Beim Laden der Seite Aufgaben anzeigen
document.addEventListener("DOMContentLoaded", loadTasks);