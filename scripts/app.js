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
            pTaskDueDate.textContent = 'Due: ' + task.dueDate;
            pTaskDueDate.className = 'taskCard';

            let deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger';
            deleteBtn.textContent = 'Delete';
            deleteBtn.type = 'button';
            deleteBtn.style.marginBottom = '1rem';
            deleteBtn.addEventListener('click', function () {
                removeFromLocalStorage(task.task);
                CreateElements()
            });

            let editBtn = document.createElement('button');
            editBtn.className = 'btn btn-warning';
            editBtn.textContent = 'Edit';
            editBtn.type = 'button';
            editBtn.style.marginBottom = '1rem';
            editBtn.addEventListener('click', function () {
                console.log(task.task);
                console.log(task.taskDes);
                console.log(task.priority);
                console.log(task.dueDate);
                let modal = document.createElement('div');
                modal.className = 'modal';
                modal.style.display = 'block';
                modal.style.position = 'fixed';
                modal.style.top = '50%';
                modal.style.left = '50%';
                modal.style.transform = 'translate(-50%, -50%)';
                modal.style.zIndex = '999';

                let modalContent = document.createElement('div');
                modalContent.className = 'modal-content';

                let closeBtn = document.createElement('span');
                closeBtn.className = 'close';
                closeBtn.textContent = 'x';
                closeBtn.addEventListener('click', function () {
                    modal.style.display = 'none';
                });

                let form = document.createElement('form');
                form.action = '';
                form.method = 'post';

                let taskInput = document.createElement('input');
                taskInput.type = 'text';
                taskInput.value = task.task;
                taskInput.name = 'task';

                let taskDesInput = document.createElement('textarea');
                taskDesInput.value = task.taskDes;
                taskDesInput.name = 'taskDes';

                let priorityInput = document.createElement('input');
                priorityInput.type = 'text';
                priorityInput.value = task.priority;
                priorityInput.name = 'priority';

                let dueDateInput = document.createElement('input');
                dueDateInput.type = 'datetime-local';
                dueDateInput.value = task.dueDate;
                dueDateInput.name = 'dueDate';

                let submitBtn = document.createElement('button');
                submitBtn.type = 'submit';
                submitBtn.textContent = 'Save Changes';
                submitBtn.className = 'btn btn-primary';
                submitBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    console.log(taskInput)
                    console.log(taskInput.value)
                  
                    let updatedTask = {
                      task: taskInput.value,
                      taskDes: taskDesInput.value,
                      priority: priorityInput.value,
                      dueDate: dueDateInput.value
                    };
                  
                    removeFromLocalStorage(task.task);
                    saveToLocalStorage(updatedTask);
                    CreateElements();
                  
                    modal.style.display = 'none';
                  });
                  console.log(taskInput)
                  console.log(taskInput.value)
                form.appendChild(taskInput);
                form.appendChild(taskDesInput);
                form.appendChild(priorityInput);
                form.appendChild(dueDateInput);
                form.appendChild(submitBtn);

                modalContent.appendChild(closeBtn);
                modalContent.appendChild(form);

                modal.appendChild(modalContent);
                document.body.appendChild(modal);
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