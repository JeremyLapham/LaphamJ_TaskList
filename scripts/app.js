import { saveToLocalStorage, getLocalStorage, removeFromLocalStorage, editLocalStorage } from './localStorage.js';

const addTaskBtn = document.getElementById('addTaskBtn');
const saveTask = document.getElementById('saveTask');

const taskName = document.getElementById('taskName');
const taskDescription = document.getElementById('taskDescription');
const placeTask = document.getElementById('placeTask');
const taskPriority = document.getElementById('taskPriority');
const dateTime = document.getElementById('dateTime');

const toDo = document.getElementById('toDo');
const inProgress = document.getElementById('inProgress');
const completed = document.getElementById('completed');

addTaskBtn.addEventListener('click', function () {
    taskName.value = '';
    taskDescription.value = '';
    taskPriority.value = 'none';
    placeTask.value = 'none';
    dateTime.value = ''
})

saveTask.addEventListener('click', function () {
    if (taskName.value == '' ||
        taskDescription.value == '' ||
        taskPriority.value == 'none' ||
        placeTask.value == 'none' ||
        dateTime.value == '') {
        alert("Please fill in all the fields.");
    } else {
        let tasksSave = {
            name: taskName.value,
            description: taskDescription.value,
            location: placeTask.value,
            priority: taskPriority.value,
            date: dateTime.value,
        };
        saveToLocalStorage(tasksSave)
        CreateElements()
    }
});


function CreateElements() {

    toDo.innerHTML = '';
    inProgress.innerHTML = '';
    completed.innerHTML = '';

    let tasks = getLocalStorage();

    tasks.map(task => {
        let taskContainer = document.createElement('div');
        taskContainer.className = 'task-container';

        let pTask = document.createElement('p');
        pTask.textContent = task.name;
        pTask.className = 'taskCard';

        let pTaskDes = document.createElement('p');
        pTaskDes.textContent = task.description;
        pTaskDes.className = 'taskCardDescription';

        let pTaskPriority = document.createElement('p');
        pTaskPriority.textContent = 'Priority: ' + task.priority;
        pTaskPriority.className = 'taskCard';

        let pTaskDueDate = document.createElement('p');
        pTaskDueDate.textContent = 'Due: ' + task.date;
        pTaskDueDate.className = 'taskCard';

        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.textContent = 'Delete';
        deleteBtn.type = 'button';
        deleteBtn.addEventListener('click', function () {
            removeFromLocalStorage(task);
            CreateElements()
        });

        let editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'btn btn-warning';
        editBtn.textContent = 'Edit Task';
        editBtn.setAttribute("data-bs-toggle", "modal");
        editBtn.setAttribute("data-bs-target", "#editModal");
        editBtn.style.marginLeft = '230px';
        editBtn.addEventListener('click', function () {
            editLocalStorage(task);
        });

        taskContainer.appendChild(pTask);
        taskContainer.appendChild(pTaskDes);
        taskContainer.appendChild(pTaskPriority);
        taskContainer.appendChild(pTaskDueDate);
        taskContainer.appendChild(deleteBtn);
        taskContainer.appendChild(editBtn);

        let targetDIV = document.createElement('div');
        targetDIV.className = 'targetDiv';

        targetDIV.appendChild(taskContainer);

        if (task.location == 'todo') {
            toDo.append(targetDIV);
        } else if (task.location == 'inprogress') {
            inProgress.append(targetDIV);
        } else if (task.location == 'completed') {
            completed.append(targetDIV);
        }
    });
}

CreateElements()
export { CreateElements }