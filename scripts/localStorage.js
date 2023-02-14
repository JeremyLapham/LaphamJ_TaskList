function saveToLocalStorage(task){
    let tasks = getLocalStorage();
    if (tasks.length == 0){
        tasks.push(task);
    } else {
        let temp;
        let check = false;
        for (let i = 0; i < tasks.length; i++){
            if (tasks[i].id == task.id){
                temp = i;
                check = true;
            }
        }
        if (check == true){
            tasks[temp] = task;
        } else {
            tasks.push(task);
        }
    }

    localStorage.setItem('Tasks', JSON.stringify(tasks));
}

function getLocalStorage(){
    let localStorageData = localStorage.getItem('Tasks');

    if(localStorageData === null){
        return [];
    }
    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(task){
    let tasks = getLocalStorage();

    for (let i = 0; i < tasks.length; i++){
        if (tasks[i].name == task.name && tasks[i].state == task.state){
            tasks.splice(i, 1);
        }
    }

    localStorage.setItem('Tasks', JSON.stringify(tasks))
}

export { saveToLocalStorage, getLocalStorage, removeFromLocalStorage}