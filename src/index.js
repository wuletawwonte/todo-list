import './style.css';

let tasks = [
  {
    description: "Go to AMU and sign the petition",
    completed: false,
    index: 3
  },
  {
    description: "Build the website for research directorate",
    completed: false,
    index: 1
  },
  {
    description: "Install linux server in the machine",
    completed: false,
    index: 2
  }
];

const tasksContainer = document.getElementById('tasks');

const loadTasks = () => {
  tasksContainer.innerHTML += tasks.sort((a, b) => {
    return a.index - b.index;
  }).map(task => {
    return `<li>
      <div class="in-list-container">
        <input type="checkbox">
        <p>${task.description}</p>
      </div>
      <button class="li-btn drag-btn"><i class="fas fa-ellipsis-v"></i></button>
    </li>`;
  }).join('') + `<li class="clear-task-li"><button>Clear all completed</button></li>`;
}

window.onload = loadTasks();