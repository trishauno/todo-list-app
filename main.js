document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const taskText = taskInput.value.trim();
        const taskId = generateUniqueId();

        const li = document.createElement('li');
        li.setAttribute('data-id', taskId);
        li.innerHTML = `
            <span>${taskText}</span>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;

        taskList.appendChild(li);

        saveTaskToLocalStorage(taskId, taskText);

        taskInput.value = '';
    }
}

function editTask(button) {
    const li = button.parentElement;
    const taskId = li.getAttribute('data-id');
    const taskText = li.querySelector('span').innerText;
    const newTaskText = prompt('Edit task:', taskText);

    if (newTaskText !== null) {

        li.querySelector('span').innerText = newTaskText;

        saveTaskToLocalStorage(taskId, newTaskText);
    }
}

function deleteTask(button) {
    const taskList = document.getElementById('taskList');
    const li = button.parentElement;
    const taskId = li.getAttribute('data-id');

    taskList.removeChild(li);

    removeTaskFromLocalStorage(taskId);
}

function saveTaskToLocalStorage(taskId, taskText) {
    const tasksString = localStorage.getItem('tasks') || '';
    const tasksArray = tasksString ? tasksString.split('|') : [];

    const existingIndex = tasksArray.findIndex(task => task.startsWith(taskId));
    if (existingIndex !== -1) {
        tasksArray[existingIndex] = `${taskId}:${taskText}`;
    } else {
        tasksArray.push(`${taskId}:${taskText}`);
    }

    localStorage.setItem('tasks', tasksArray.join('|'));
}

function removeTaskFromLocalStorage(taskId) {
    const tasksString = localStorage.getItem('tasks') || '';
    const tasksArray = tasksString ? tasksString.split('|') : [];

    const updatedTasksArray = tasksArray.filter(task => !task.startsWith(taskId));

    localStorage.setItem('tasks', updatedTasksArray.join('|'));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    const tasksString = localStorage.getItem('tasks') || '';
    const tasksArray = tasksString ? tasksString.split('|') : [];

    tasksArray.forEach(task => {
        const [taskId, taskText] = task.split(':');
        const li = document.createElement('li');
        li.setAttribute('data-id', taskId);
        li.innerHTML = `
            <span>${taskText}</span>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
