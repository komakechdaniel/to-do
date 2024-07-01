document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('li').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('span').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Create task element
    const createTaskElement = (taskText, completed = false) => {
        const li = document.createElement('li');
        if (completed) li.classList.add('completed');

        const span = document.createElement('span');
        span.textContent = taskText;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    };

    // Add new task
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            createTaskElement(taskText);
            taskInput.value = '';
            saveTasks();
        }
    });

    // Load tasks on page load
    loadTasks();
});
