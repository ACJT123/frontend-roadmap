const tasks = [];

function onSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  let newTask = {
    id: tasks.length + 1,
    complete: false,
    ...data,
  };

  tasks.push(newTask);

  const taskList = document.getElementById("taskList");

  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");

  const taskName = document.createElement("p");
  taskName.innerText = newTask.task;

  const taskStatus = document.createElement("input");
  taskStatus.type = "checkbox";

  taskStatus.addEventListener("change", () => {
    newTask.complete = taskStatus.checked;

    if (newTask.complete) {
      taskName.style.textDecoration = "line-through";
    } else {
      taskName.style.textDecoration = "none";
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerText = "🗑️";

  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(taskItem);
    tasks.splice(tasks.indexOf(newTask), 1);
  });

  taskItem.appendChild(deleteBtn);
  taskItem.appendChild(taskName);
  taskItem.appendChild(taskStatus);
  taskList.appendChild(taskItem);

  form.reset();
}
