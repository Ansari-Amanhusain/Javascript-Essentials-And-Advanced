import { StorageUtil } from "./utils.js";

export class CustomerFormHandler {
  constructor() {
    this.form = document.getElementById("taskForm");
    this.message = document.getElementById("message");

    this.title = document.getElementById("title");
    this.description = document.getElementById("description");
    this.dueDate = document.getElementById("dueDate");
    this.priority = document.getElementById("priority");
    this.status = document.getElementById("status");

    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.title.value.trim().length < 10) {
      this.message.textContent = "Title must be at least 10 characters";
      return;
    }

    const task = {
      id: Date.now(),
      title: this.title.value,
      description: this.description.value,
      dueDate: this.dueDate.value,
      priority: this.priority.value,
      status: this.status.value
    };

    const tasks = StorageUtil.getItem("tasks");
    tasks.push(task);
    StorageUtil.setItem("tasks", tasks);

    this.form.reset();
    this.message.textContent = "Task added successfully";

    // 🔥 notify viewer
    document.dispatchEvent(new Event("taskUpdated"));
  }
}
