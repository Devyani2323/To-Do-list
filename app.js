document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function loadTasks() {
    const taskContainer = document.getElementById("task-container");
    taskContainer.innerHTML = ""; // Clear existing tasks

    const tasks = getTasksFromLocalStorage();

    tasks.forEach(function(task) {
        const taskElement = createTaskElement(task.id, task.text, task.completed);
        taskContainer.appendChild(taskElement);
    });
}

function createTaskElement(taskId, taskText, completed) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.value = taskText;
    inputElement.classList.add("task-input");
    inputElement.disabled = completed;
    
    const actionsElement = document.createElement("div");
    actionsElement.classList.add("task-actions");

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.onclick = function() {
        editTask(taskId);
    };

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function() {
        deleteTask(taskId);
    };

    const toggleButton = document.createElement("button");
    toggleButton.innerText = completed ? "Undo" : "Complete";
    toggleButton.onclick = function() {
        toggleTaskStatus(taskId);
    };

    taskElement.appendChild(inputElement);
    actionsElement.appendChild(editButton);
    actionsElement.appendChild(deleteButton);
    actionsElement.appendChild(toggleButton);
    taskElement.appendChild(actionsElement);

    if (completed) {
        taskElement.classList.add("completed");
    }

    return taskElement;
}

function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const tasks = getTasksFromLocalStorage();

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveTasksToLocalStorage(tasks);
        loadTasks();

        taskInput.value = ""; // Clear the input field
    }
}

function editTask(taskId) {
    const tasks = getTasksFromLocalStorage();
    const taskToUpdate = tasks.find(task => task.id === taskId);

    const updatedText = prompt("Edit task:", taskToUpdate.text);

    if (updatedText !== null) {
        taskToUpdate.text = updatedText;
        saveTasksToLocalStorage(tasks);
        loadTasks();
    }
}

function deleteTask(taskId) {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasksToLocalStorage(updatedTasks);
    loadTasks();
}

function toggleTaskStatus(taskId) {
    const tasks = getTasksFromLocalStorage();
    const taskToUpdate = tasks.find(task => task.id === taskId);

    taskToUpdate.completed = !taskToUpdate.completed;
    saveTasksToLocalStorage(tasks);
    loadTasks();
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
