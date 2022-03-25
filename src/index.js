import './style.css';
import Tasks from './tasks.js';

const allTasks = new Tasks();

const tasksContainer = document.getElementById('tasks');

const loadTasks = () => {
  if (allTasks.length !== 0) {
    tasksContainer.innerHTML = `<li class="title-li"><p>Todays Todo List</p><button type="button" class="li-btn"><i class="fa-solid fa-arrows-rotate"></i></button></li>
        <li><form id="add-task"><input class="new-task" required placeholder="Add to your list"><button type="submit" class="li-btn add-task-btn"><i class="fa-solid fa-plus"></i></button></form></li>
      `;
    tasksContainer.innerHTML += allTasks.tasks
      .sort((a, b) => a.index - b.index)
      .map(
        (task) => `<li class="task-item">
            <div class="in-list-container">
              <input type="checkbox">
              <p class="task-description" contenteditable="true" data-tid="${task.index}">${task.description}</p>
            </div>
            <button type="button" data-taskid="${task.index}" id="delete${task.index}" class="li-btn delete-btn"><i class="fa-solid fa-trash-can"></i></button>
            <button type="button" id="drag${task.index}" class="li-btn drag-btn"><i class="fas fa-ellipsis-v"></i></button>
          </li>`,
      )
      .join('');
    tasksContainer.innerHTML += `<li class='clear-task-li'><button type='button'>Clear all completed</button></li>`;

    const deleteBtns = document.querySelectorAll('.delete-btn');

    deleteBtns.forEach((dBtn) => {
      dBtn.addEventListener('click', () => {
        allTasks.remove(dBtn.dataset.taskid);
        loadTasks();
      });
    });
  }
};

window.onload = loadTasks();

const addTaskForm = document.getElementById('add-task');
const newTask = document.querySelector('.new-task');

addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const task = {
    description: newTask.value,
    completed: false,
    index: allTasks.size() + 1,
  };
  allTasks.add(task);
  newTask.value = '';
  loadTasks();
});

const taskDescriptions = document.querySelectorAll('.task-description');

taskDescriptions.forEach((taskItem) => {
  taskItem.addEventListener('keyup', () => {
    allTasks.update(taskItem.dataset.tid, taskItem.textContent);
  });
  taskItem.addEventListener('focus', () => {
    taskItem.parentElement.parentElement.style = 'background-color: #fffdca';
  });
  taskItem.addEventListener('blur', () => {
    taskItem.parentElement.parentElement.style = 'background-color: #fff';
  });
});
