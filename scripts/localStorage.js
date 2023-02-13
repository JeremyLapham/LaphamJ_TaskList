function saveToLocalStorage(task, taskDes, priority, dueDate) {
    let tasks = getLocalStorage();
    tasks.push({ task: task, taskDes: taskDes, priority: priority, dueDate: dueDate });

    localStorage.setItem('Tasks', JSON.stringify(tasks));
}

function getLocalStorage() {
    let localStorageData = localStorage.getItem('Tasks');

    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(task) {
    let tasks = getLocalStorage();
    let taskIndex = tasks.findIndex(t => t.task === task);

    tasks.splice(taskIndex,1);

    localStorage.setItem('Tasks', JSON.stringify(tasks));
}

export { saveToLocalStorage, getLocalStorage, removeFromLocalStorage}