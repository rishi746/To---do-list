const addBtn = document.getElementById("add-task-button");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("tasks");
const completedList = document.getElementById("completed-list");
const filterSelect = document.getElementById("filter-completed");

let completedTasks = [];

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;
  span.className = "task-text";

  // ✅ Done Button
  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";
  doneBtn.className = "complete-button";
  doneBtn.onclick = () => completeTask(span.textContent);

  // ✅ Edit Button
  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.className = "edit-button";
  editBtn.onclick = () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    input.className = "edit-input";

    li.replaceChild(input, span);
    input.focus();

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        finishEdit();
      }
    });

    input.addEventListener("blur", finishEdit);

    function finishEdit() {
      const newText = input.value.trim();
      if (newText !== "") {
        span.textContent = newText;
      }
      li.replaceChild(span, input);
    }
  };

  // ✅ Remove Button
  const removeBtn = document.createElement("button");
  removeBtn.innerText = "Remove";
  removeBtn.className = "remove-button";
  removeBtn.onclick = () => {
    li.remove();
  };

  // Add all elements to the task
  li.appendChild(span);
  li.appendChild(doneBtn);
  li.appendChild(editBtn);
  li.appendChild(removeBtn);
  taskList.appendChild(li);

  taskInput.value = "";
}

function completeTask(text) {
  const timestamp = new Date();
  completedTasks.push({ text, timestamp });
  renderCompleted(filterSelect.value);
  refreshTasks();
}

function refreshTasks() {
  taskList.innerHTML = "";
}

function renderCompleted(filter) {
  completedList.innerHTML = "";

  const now = new Date();
  let filtered = completedTasks.filter(task => {
    const time = task.timestamp;

   if (filter === "today") {
  return time.toDateString() === now.toDateString();
}  else if (filter === "this-week") {
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay()); // Sunday
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 7); // next Sunday

  return time >= start && time < end;
}
 else if (filter === "this-month") {
  return (
    time.getMonth() === now.getMonth() &&
    time.getFullYear() === now.getFullYear()
  );
}


    return true; // "all"
  });

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    completedList.appendChild(li);
  });
}

// ✅ Add task on button click
addBtn.addEventListener("click", addTask);

// ✅ Add task on Enter key press
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// ✅ Re-render completed list when filter changes
filterSelect.addEventListener("change", () => {
  renderCompleted(filterSelect.value);
});
// done
