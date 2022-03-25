export default class Tasks {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  add(task) {
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  remove(id) {
    this.tasks.splice(id, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  update(id, description) {
    this.tasks.forEach((item, arrIndex) => {
      if(item.index == id) {
        this.tasks[arrIndex].description = description;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  size() {
    return this.tasks.length;
  }
}