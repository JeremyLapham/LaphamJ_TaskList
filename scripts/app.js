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


saveTask.addEventListener('click', function () {
    let tasksSave = {
        name: taskName.value,
        description: taskDescription.value,
        location: placeTask.value,
        priority: taskPriority.value,
        date: dateTime.value,
    };

    if (taskName.value == '' || taskDescription.value == '' || taskPriority.value == 'none' || placeTask.value == 'none' || dateTime.value == '') {
        alert("Please fill in all the fields.");
    } else {
        saveToLocalStorage(tasksSave)
        CreateElements()
        taskName.value = '';
        taskDescription.value = '';
        dateTime.value = '';
        taskPriority.value = 'none';
        placeTask.value = 'none';
    }
});

// function clearBoxes(){
//     toDo.innerHTML = "";
//     inProgress.innerHTML = "";
//     completed.innerHTML = "";
// }

function CreateElements() {
    let tasks = getLocalStorage();

    while (toDo.firstChild) {
        toDo.removeChild(toDo.firstChild);
    }

    while (inProgress.firstChild) {
        inProgress.removeChild(inProgress.firstChild);
    }

    while (completed.firstChild) {
        completed.removeChild(completed.firstChild);
    }

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
        deleteBtn.style.marginBottom = '1rem';
        deleteBtn.addEventListener('click', function () {
            removeFromLocalStorage(task);
            CreateElements()
        });

        let editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'btn btn-warning';
        editBtn.textContent = 'Edit Task';
        editBtn.setAttribute("data-bs-toggle", "modal");
        editBtn.setAttribute("data-bs-target", "#exampleModal");
        editBtn.addEventListener('click', function () {
            taskName.value = task.name;
            taskDescription.value = task.description;
            placeTask.value = task.location;
            taskPriority.value = task.priority;
            dateTime.value = task.dueDate;
        });

        taskContainer.appendChild(pTask);
        taskContainer.appendChild(pTaskDes);
        taskContainer.appendChild(pTaskPriority);
        taskContainer.appendChild(pTaskDueDate);
        taskContainer.appendChild(deleteBtn);
        taskContainer.appendChild(editBtn);

        if (task.location == 'todo') {
            toDo.append(taskContainer);
        } else if (task.location == 'inprogress') {
            inProgress.append(taskContainer);
        } else if (task.location == 'completed') {
            completed.append(taskContainer);
        }
    });
}


CreateElements()