let addNewTaskButton = document.querySelector('#addNewTaskButton');
let newTaskName = document.getElementById('newTaskName');
let tasksList = document.getElementById('tasksList');
addNewTaskButton.addEventListener('click', addNewTask);

function addNewTask() {
    let text = newTaskName.value;
    if (text === "") {
        return
    }
    tasksList.innerHTML = createTaskHtml(text) + tasksList.innerHTML;
}

function compliteTask(checkBox, taskId) {
    if (checkBox.checked) {
        const element = document.getElementById(`${taskId}`);
        const target = document.getElementById('doneTasks');
        target.prepend(element);
    } else {
        const element = document.getElementById(`${taskId}`);
        const target = document.getElementById('tasksList');
        target.prepend(element);
    }
}


let currentTaskId = 0;

function createTaskHtml(text) {
    let taskHtmlTemplate =
        `<div id="${currentTaskId}" class="bg_blur">
        <div class="block_2">
            <div class="icon_main">
                <input class="button_radius_2" onclick="compliteTask(this , ${currentTaskId})" type="checkbox">
                    <div class="text_plan">
                        <span class="main_text color_text">${text}</span>
                        <span class="main_text">Задачи</span>
                    </div>
            </div>
            <div>
                <button class="button_radius"><img src="src/star_1.svg"></button>
            </div>
        </div>
    </div>`
    currentTaskId++;
    return taskHtmlTemplate;
}


