import './style.css';
import Tasks from './tasks.js';

const allTasks = new Tasks();

const tasksContainer = document.getElementById('tasks');

const loadTasks = () => {
  tasksContainer.innerHTML = `<div class="entry title-li"><p>Todays Todo List</p><button type="button" class="li-btn"><i class="fa-solid fa-arrows-rotate"></i></button></div>
      <div class="entry"><form id="add-task"><input class="new-task" required placeholder="Add to your list"><button type="submit" class="li-btn add-task-btn"><i class="fa-solid fa-plus"></i></button></form></div>
    `;

  if (allTasks.tasks.length !== 0) {
    tasksContainer.innerHTML += allTasks.tasks
      .sort((a, b) => a.index - b.index)
      .map(
        (task) => `<div class="entry task-item">
            <div class="in-list-container">
              <input class="task-status" data-id="${task.index}" type="checkbox" ${task.completed ? 'checked' : ''}>
              <p class="task-description" id="desc${task.index}" contenteditable="true" data-tid="${task.index}">${task.description}</p>
            </div>
            <button type="button" data-taskid="${task.index}" id="delete${task.index}" class="li-btn delete-btn"><i class="fa-solid fa-trash-can"></i></button>
            <button type="button" id="drag${task.index}" class="li-btn drag-btn"><i class="fas fa-ellipsis-v"></i></button>
          </div>`,
      )
      .join('');
    tasksContainer.innerHTML += '<div class="entry clear-task-li"><button id="remove-completed" type="button">Clear all completed</button></div>';

    const taskDescriptions = document.querySelectorAll('.task-description');
    const deleteBtns = document.querySelectorAll('.delete-btn');

    deleteBtns.forEach((dBtn) => {
      dBtn.addEventListener('click', () => {
        allTasks.remove(dBtn.dataset.taskid);
        loadTasks();
      });
    });

    const taskStatuses = document.querySelectorAll('.task-status');

    taskStatuses.forEach((taskStatus) => {
      taskStatus.addEventListener('change', () => {
        allTasks.changeStatus(taskStatus.dataset.id, taskStatus.checked);
        taskDescriptions.forEach((tdesc) => {
          if (tdesc.dataset.tid === taskStatus.dataset.id) {
            tdesc.classList.add('task-line-through');
            tdesc.style = 'color: red;';
          }
        });
        loadTasks();
      });
    });

    const deleteCompleted = document.getElementById('remove-completed');

    deleteCompleted.addEventListener('click', () => {
      allTasks.removeCompleted();
      loadTasks();
    });

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
  }

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
};

window.onload = loadTasks();
