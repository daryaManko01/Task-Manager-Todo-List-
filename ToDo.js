let addNewTaskButton = document.querySelector('#addNewTaskButton');
let newTaskName = document.getElementById('newTaskName');
let tasksList = document.getElementById('tasksList');
addNewTaskButton.addEventListener('click', addNewTask);

let favourites = [];
let toDo = [];
let done = [];

function addNewTask() {
    let text = newTaskName.value;
    if (text === "") {
        return
    }
    tasksList.innerHTML = createTaskHtml(text) + tasksList.innerHTML;
}

function compliteTask(checkBox, taskId) {
    const element = document.getElementById(`${taskId}`);
    let target;

    const myText = document.getElementById(`my-Text-${taskId}`);

    if (checkBox.checked) {

        //task done
        myText.classList.add("strike-through");

        done.push(taskId);
        const index = toDo.indexOf(taskId);
        toDo.splice(index, 1);
        target = document.getElementById('doneTasks');

    } else {

        //handle unchected chekbox (move task to ToDo state);
        toDo.push(taskId);
        const index = done.indexOf(taskId);
        done.splice(index, 1);
        target = document.getElementById('tasksList');

        myText.classList.remove("strike-through");
    }

    if (!favourites.includes(taskId)) {
        target.prepend(element);
    }

    updateCount();

}

function updateCount() {

    let count = document.getElementById('doneCount');
    let doneTask = document.getElementById('doneTasks');
    count.textContent = doneTask.children.length
    count = document.getElementById('favoriteCount');
    count.textContent = favourites.length;
}


function selectedTasks(button_radius, taskId) {

    const element = document.getElementById(`${taskId}`);
    let target;
    let myImage = document.getElementById(`image-${taskId}`);

    if (favourites.includes(taskId)) {
        myImage.src = "src/star_1.svg";

        //remuve task from list
        const index = favourites.indexOf(taskId);
        favourites.splice(index, 1);

        if (toDo.includes(taskId)) {

            //move task to toDo list
            target = document.getElementById('tasksList');
            target.prepend(element);
        }
        else {

            //move task to done list
            target = document.getElementById('doneTasks');
            target.prepend(element);
        }
    } else {

        //add task favourites
        const elemen = document.getElementById(`${taskId}`);
        const target = document.getElementById('selectedTasks');
        target.prepend(elemen);
        myImage.src = "src/star_2.svg";
        favourites.push(taskId);
    }

    updateCount();

}

let currentTaskId = 0;

function createTaskHtml(text) {
    toDo.push(currentTaskId);
    let taskHtmlTemplate =
        `<div id="${currentTaskId}" class="bg_blur">
        <div class="block_2">
            <div class="icon_main">
                <input class="button_radius_2" onclick="compliteTask(this , ${currentTaskId})" type="checkbox">
                    <div class="text_plan">
                        <span id="my-Text-${currentTaskId}" class="main_text color_text">${text}</span>
                        <span class="main_text">Задачи</span>
                    </div>
            </div>
            <div>
                <button onclick="selectedTasks(this , ${currentTaskId})" class="button_radius"><img id ="image-${currentTaskId}" src="src/star_1.svg"></button>
            </div>
        </div>
    </div>`
    currentTaskId++;
    return taskHtmlTemplate;
}

