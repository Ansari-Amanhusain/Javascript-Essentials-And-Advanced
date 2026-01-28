import { StorageUtil } from "./utils.js";

export class SubmissionViewer {
  constructor() {
    console.log("SubmissionViewer loaded");

    this.tableBody = document.getElementById("tableBody");
    this.search = document.getElementById("search");
    this.noData = document.getElementById("noData");

    this.render();

    document.addEventListener("taskUpdated", () => {
      this.render();
    });

    this.search.addEventListener("input", () => this.filter());
    this.tableBody.addEventListener("click", (e) => this.deleteTask(e));
  }

  render() {
    const tasks = StorageUtil.getItem("tasks");
    this.tableBody.innerHTML = "";

    if (tasks.length === 0) {
      this.noData.textContent = "No data found";
      return;
    }

    this.noData.textContent = "";

    tasks.forEach(task => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${task.title}</td>
        <td>${task.priority}</td>
        <td>${task.status}</td>
        <td><button data-id="${task.id}">Delete</button></td>
      `;
      this.tableBody.appendChild(tr);
    });
  }

  deleteTask(e) {
    if (!e.target.dataset.id) return;

    let tasks = StorageUtil.getItem("tasks");
    tasks = tasks.filter(t => t.id != e.target.dataset.id);
    StorageUtil.setItem("tasks", tasks);

    this.render();
  }

  filter() {
    const value = this.search.value.toLowerCase();
    const tasks = StorageUtil.getItem("tasks");
    const filtered = tasks.filter(t =>
      t.title.toLowerCase().includes(value)
    );

    this.tableBody.innerHTML = "";
    filtered.forEach(task => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${task.title}</td>
        <td>${task.priority}</td>
        <td>${task.status}</td>
        <td><button data-id="${task.id}">Delete</button></td>
      `;
      this.tableBody.appendChild(tr);
    });
  }
}
