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
      .map((task) => `<li>
            <div class="in-list-container">
              <input type="checkbox">
              <p>${task.description}</p>
            </div>
            <button type="button" class="li-btn drag-btn"><i class="fas fa-ellipsis-v"></i></button>
          </li>`)
      .join('');
  }
};

addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (newTask.value !== null) {
    const task = {
      description: newTask.value,
      completed: false,
      index: allTasks.length,
    };
    allTasks.add(task);
    loadTasks();
  }
});

window.onload = loadTasks();

