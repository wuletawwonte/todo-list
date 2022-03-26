export default class Tasks {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  add(task) {
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  remove(id) {
    this.tasks.splice(id - 1, 1);
    this.tasks.forEach((task, index) => {
      task.index = index + 1;
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  update(id, description) {
    this.tasks.forEach((item, arrIndex) => {
      if (item.index === parseInt(id, 10)) {
        this.tasks[arrIndex].description = description;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  changeStatus(id, status) {
    this.tasks.forEach((item, arrIndex) => {
      if (item.index === parseInt(id, 10)) {
        this.tasks[arrIndex].completed = status;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  size() {
    return this.tasks.length;
  }

  removeCompleted() {
    this.tasks = this.tasks.filter((item) => !item.completed);
    this.tasks.forEach((task, index) => {
      task.index = index + 1;
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}