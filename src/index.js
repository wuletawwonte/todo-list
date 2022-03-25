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
              <p class="task-description" contenteditable="true">${task.description}</p>
            </div>
            <button type="button" class="li-btn drag-btn"><i class="fas fa-ellipsis-v"></i></button>
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
    index: allTasks.length,
  };
  allTasks.add(task);
  newTask.value = null;
  loadTasks();
});

const taskDescriptions = document.querySelectorAll('.task-description');

console.log(taskDescriptions);

taskDescriptions.forEach((taskItem) => {
  taskItem.addEventListener('focus', (e) => {
    taskItem.parentElement.parentElement.style = "background-color: #fffdca";    
  });
  taskItem.addEventListener('blur', (e) => {
    taskItem.parentElement.parentElement.style = "background-color: #fff";
  })
});

const taskItems = document.querySelectorAll('.task-item');
