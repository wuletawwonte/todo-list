import './style.css';

let tasks = [
  {
    description: "Go to AMU and sign the petition",
    completed: false,
    index: 0
  },
  {
    description: "Build the website for research directorate",
    completed: false,
    index: 0
  },
  {
    description: "Install linux server in the machine",
    completed: false,
    index: 0
  }
];

const tasksContainer = document.getElementById('tasks');

const loadTasks = () => {
  tasksContainer.innerHTML = tasks.map(task => {
    return `<li>${task.description}</li>`;
  }).join('');
}

window.onload = loadTasks();