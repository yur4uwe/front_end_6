document.addEventListener('DOMContentLoaded', () => {
    const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    const ul = document.getElementById('task-list');
    ul.innerHTML = '';

    if (tasks.length === 0) {
        ul.innerText = "You don't have any active tasks";
        return;
    }

    for (let i = 0; i < tasks.length; i++) {
        const li = document.createElement('li');
        li.classList.add('list-item');
        li.appendChild(document.createTextNode(tasks[i]));

        const buttons = document.createElement('div');
        buttons.classList.add('buttons');

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('button-delete');
        deleteButton.addEventListener('click', deleteTask);
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';

        const editButton = document.createElement('button');
        editButton.classList.add('button-edit');
        editButton.addEventListener('click', editTask);
        editButton.innerHTML = '<i class="fas fa-edit"></i>';

        const doneButton = document.createElement('button');
        doneButton.classList.add('button-done');
        doneButton.addEventListener('click', doneTask);
        doneButton.innerHTML = '<i class="fas fa-check"></i>';

        buttons.appendChild(deleteButton);
        buttons.appendChild(editButton);
        buttons.appendChild(doneButton);

        li.appendChild(buttons);

        ul.appendChild(li);
    }
});

const addTask = () => {
    const task = document.getElementById('task').value;
    if (task === '') {
        alert('Please enter a task');
        return;
    }
    const ul = document.getElementById('task-list');
    const lis = ul.querySelectorAll('li');
    if (lis.length === 0) {
        ul.innerText = '';
    }
    const li = document.createElement('li');
    li.classList.add('list-item');

    li.appendChild(document.createTextNode(task));

    const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push({ task, state: 'active' });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('button-delete');
    deleteButton.addEventListener('click', deleteTask);
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';

    const editButton = document.createElement('button');
    editButton.classList.add('button-edit');
    editButton.addEventListener('click', editTask);
    editButton.innerHTML = '<i class="fas fa-edit"></i>';

    const doneButton = document.createElement('button');
    doneButton.classList.add('button-done');
    doneButton.addEventListener('click', doneTask);
    doneButton.innerHTML = '<i class="fas fa-check"></i>';

    buttons.appendChild(deleteButton);
    buttons.appendChild(editButton);
    buttons.appendChild(doneButton);

    li.appendChild(buttons);

    ul.appendChild(li);
    document.getElementById('task').value = '';
};

const deleteTask = (e) => {
    const item = e.target.closest('li');
    if (item.parentElement.querySelectorAll('li').length === 1) {
        console.log(item.parentElement.id);
        if (item.parentElement.id === 'task-list') {
            document.getElementById('task-list').innerText = "You don't have any active tasks";
        } else if (item.parentElement.id === 'completed-task-list') {
            document.getElementById('completed-task-list').innerText = "You don't have any completed tasks";
        }
    }
    item.remove();

    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.find(task => task.task === item.firstChild.textContent);
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const editTask = (e) => {
    const item = e.target.closest('li');
    const taskText = item.firstChild.textContent;
    const newTask = prompt('Edit your task:', taskText);
    if (newTask !== null && newTask !== '') {
        item.firstChild.textContent = newTask;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.find(task => task.task === taskText);
    task.task = newTask;
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const doneTask = (e) => {
    const item = e.target.closest('li');
    const completedUl = document.getElementById('completed-task-list');
    const lis = completedUl.querySelectorAll('li');
    if (lis.length === 0) {
        completedUl.innerText = '';
    }
    item.querySelector('.button-done').remove();
    item.querySelector('.button-edit').remove();
    completedUl.appendChild(item);
    if (document.getElementById('task-list').querySelectorAll('li').length === 0) {
        document.getElementById('task-list').innerText = "You don't have any active tasks";
    }

    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.find(task => task.task === item.firstChild.textContent);
    task.state = 'completed';
    localStorage.setItem('tasks', JSON.stringify(tasks));
};