import { CustomerFormHandler } from "./CustomerFormHandler.js";
import { SubmissionViewer } from "./SubmissionViewer.js";

console.log("main.js loaded");

window.addEventListener("DOMContentLoaded", () => {
  new CustomerFormHandler();
  new SubmissionViewer();
});
