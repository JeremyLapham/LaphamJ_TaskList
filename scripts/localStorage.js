import { CreateElements } from "./app.js";
let taskNameEdit = document.getElementById('taskNameEdit');
let taskDescriptionEdit = document.getElementById('taskDescriptionEdit');
let placeTaskEdit = document.getElementById('placeTaskEdit');
let taskPriorityEdit = document.getElementById('taskPriorityEdit');
let dateTimeEdit = document.getElementById('dateTimeEdit');
let saveTaskEdit = document.getElementById('saveTaskEdit');

let editTaskIndex;

function saveToLocalStorage(object) {
    let dupeTask = false;
    let tasks = getLocalStorage();
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].name == object.name &&
            tasks[i].description == object.description &&
            tasks[i].location == object.location &&
            tasks[i].priority == object.priority &&
            tasks[i].date == object.date) {
            dupeTask = true;
        }
    }

    if (dupeTask) {
        alert('Task Already Created - No Dupe Tasks')
    } else {
        tasks.push(object);
        localStorage.setItem('Tasks', JSON.stringify(tasks));
    }
}

function getLocalStorage() {
    let localStorageData = localStorage.getItem('Tasks');

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(object) {
    let tasks = getLocalStorage();
    let index = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].name == object.name &&
            tasks[i].description == object.description &&
            tasks[i].location == object.location &&
            tasks[i].priority == object.priority &&
            tasks[i].date == object.date) {
            index = i;
        }
    }

    tasks.splice(index, 1);
    localStorage.setItem('Tasks', JSON.stringify(tasks));
}

function editLocalStorage(object) {
    let tasks = getLocalStorage();
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].name == object.name &&
            tasks[i].description == object.description &&
            tasks[i].location == object.location &&
            tasks[i].priority == object.priority &&
            tasks[i].date == object.date) {
            editTaskIndex = i;
        }
    }

    taskNameEdit.value = object.name;
    taskDescriptionEdit.value = object.description;
    placeTaskEdit.value = object.location;
    taskPriorityEdit.value = object.priority;
    dateTimeEdit.value = object.date;
}

saveTaskEdit.addEventListener('click', function () {
    let dupeTask = false;
    let tasks = getLocalStorage();
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].name == taskNameEdit.value &&
            tasks[i].description == taskDescriptionEdit.value &&
            tasks[i].location == placeTaskEdit.value &&
            tasks[i].priority == taskPriorityEdit.value &&
            tasks[i].date == dateTimeEdit.value) {
            dupeTask = true;
        }
    }

    if (dupeTask) { alert('Task Already Created - No Dupe Tasks') }
    else {
        tasks[editTaskIndex] = {
            name: taskNameEdit.value,
            description: taskDescriptionEdit.value,
            location: placeTaskEdit.value,
            priority: taskPriorityEdit.value,
            date: dateTimeEdit.value
        };
        localStorage.setItem('Tasks', JSON.stringify(tasks));
        CreateElements();
    }
})

export { saveToLocalStorage, getLocalStorage, removeFromLocalStorage, editLocalStorage }