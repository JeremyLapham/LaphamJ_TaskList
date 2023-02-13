import { saveToLocalStorage, getLocalStorage, removeFromLocalStorage } from './localStorage.js';

const saveTask = document.getElementById('saveTask');

const taskName = document.getElementById('taskName');
const taskDescription = document.getElementById('taskDescription');
const placeTask = document.getElementById('placeTask');
const taskPriority = document.getElementById('taskPriority');
const dateTime = document.getElementById('dateTime');

const toDo = document.getElementById('toDo');
const inProgress = document.getElementById('inProgress');
const completed = document.getElementById('completed');

toDo.classList.remove('targetDiv');
inProgress.classList.remove('targetDiv');
completed.classList.remove('targetDiv');


saveTask.addEventListener('click', function () {
    if (taskName.value == '' || taskDescription.value == '' || taskPriority.value == 'none' || placeTask.value == 'none' || dateTime == '') {
        alert("Please fill in all the fields.");
    } else {
        saveToLocalStorage(taskName.value, taskDescription.value, taskPriority.value, dateTime.value)
        CreateElements()
        taskName.value = '';
        taskDescription.value = '';
        dateTime.value = '';
        taskPriority.value = 'none';
        placeTask.value = 'none';
    }
});

let targetDiv;


function CreateElements() {
    let tasks = getLocalStorage();

    switch (placeTask.value) {
        case 'todo':
            targetDiv = toDo;
            toDo.classList.add('targetDiv');
            break;
        case 'inprogress':
            targetDiv = inProgress;
            inProgress.classList.add('targetDiv');
            break;
        case 'completed':
            targetDiv = completed;
            completed.classList.add('targetDiv');
            break;
    }

    while (toDo.firstChild) {
        toDo.removeChild(toDo.firstChild);
    }

    while (inProgress.firstChild) {
        inProgress.removeChild(inProgress.firstChild);
    }

    while (completed.firstChild) {
        completed.removeChild(completed.firstChild);
    }

    if (targetDiv) {
        tasks.map(task => {
            let taskContainer = document.createElement('div');
            taskContainer.className = 'task-container';

            let pTask = document.createElement('p');
            pTask.textContent = task.task;
            pTask.setAttribute('data-task', task.task);
            pTask.className = 'taskCard';

            let pTaskDes = document.createElement('p');
            pTaskDes.textContent = task.taskDes;
            pTaskDes.className = 'taskCardDescription';

            let pTaskPriority = document.createElement('p');
            pTaskPriority.textContent = 'Priority: ' + task.priority;
            pTaskPriority.className = 'taskCard';


            let pTaskDueDate = document.createElement('p');
            pTaskDueDate.textContent = 'Due: ' + task.dueDate.replace('T', ' ');
            pTaskDueDate.className = 'taskCard';

            let deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger';
            deleteBtn.textContent = 'Delete';
            deleteBtn.type = 'button';
            deleteBtn.addEventListener('click', function () {
                removeFromLocalStorage(task.task);
                CreateElements()
            });

            let editBtn = document.createElement('button');
            editBtn.className = 'btn btn-warning';
            editBtn.textContent = 'Edit';
            editBtn.type = 'button';
            editBtn.addEventListener('click', function () {
                // Open a modal or create a form to edit the task
                // Populate the form with the task data
                // Allow the user to edit the task and save changes
            });

            taskContainer.appendChild(pTask);
            taskContainer.appendChild(pTaskDes);
            taskContainer.appendChild(pTaskPriority);
            taskContainer.appendChild(pTaskDueDate);
            taskContainer.appendChild(deleteBtn);
            taskContainer.appendChild(editBtn);

            targetDiv.appendChild(taskContainer);
            targetDiv.className = 'targetDiv';
        });
    }
}

CreateElements()