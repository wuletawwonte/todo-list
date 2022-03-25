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
            <button type="button" id="delete${task.index}" class="li-btn delete-btn hidden-btn"><i class="fa-solid fa-trash-can"></i></button>
            <button type="button" id="drag${task.index}" class="li-btn drag-btn"><i class="fas fa-ellipsis-v"></i></button>
          </li>`)
      .join('');
  }
};

window.onload = loadTasks();

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
    makeActive(taskItem.dataset.tid, 'delete');
  });
  taskItem.addEventListener('blur', (e) => {
    taskItem.parentElement.parentElement.style = "background-color: #fff";
    makeActive(taskItem.dataset.tid, 'drag');
  })
});

const makeActive = (id, btnName) => {
  const deleteBtn = document.getElementById('delete'+id);
  const dragBtn = document.getElementById('drag'+id);
  if(btnName == 'delete') {
    deleteBtn.style = 'display: block';
    dragBtn.style = 'display: none';
  } else {
    deleteBtn.style = 'display: none';
    dragBtn.style = 'display: block';
  }
}
