import './style.css';
import Tasks from './tasks.js';

const allTasks = new Tasks();

const tasksContainer = document.getElementById('tasks-only');
const newTask = document.querySelector('.new-task');
const addTaskForm = document.getElementById('add-task');

const loadTasks = () => {
  if (allTasks.length !== 0) {
    tasksContainer.innerHTML = allTasks.tasks
      .sort((a, b) => a.index - b.index)
      .map((task) => `<li class="task-item">
            <div class="in-list-container">
              <input type="checkbox">
              <p class="task-description" contenteditable="true" data-tid="${task.index}">${task.description}</p>
            </div>
            <button type="button" data-taskid="${task.index}" id="delete${task.index}" class="li-btn delete-btn"><i class="fa-solid fa-trash-can"></i></button>
            <button type="button" id="drag${task.index}" class="li-btn drag-btn"><i class="fas fa-ellipsis-v"></i></button>
          </li>`)
      .join('');
    }

};

window.onload = loadTasks();

const deleteBtns = document.querySelectorAll('.delete-btn');

deleteBtns.forEach(dBtn => {
  dBtn.addEventListener('click', (e) => {
    allTasks.remove(dBtn.dataset.taskid);
    loadTasks();
  });  
});

addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const task = {
    description: newTask.value,
    completed: false,
    index: allTasks.size() + 1,
  };
  allTasks.add(task);
  newTask.value = null;
  loadTasks();
});

const taskDescriptions = document.querySelectorAll('.task-description');

taskDescriptions.forEach((taskItem) => {
  taskItem.addEventListener('keyup', (e) => {
    allTasks.update(taskItem.dataset.tid, taskItem.textContent);
  });
  taskItem.addEventListener('focus', (e) => {
    taskItem.parentElement.parentElement.style = "background-color: #fffdca";
  });
  taskItem.addEventListener('blur', (e) => {
    taskItem.parentElement.parentElement.style = "background-color: #fff";
  })
});


