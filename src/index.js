import todoFactory from "./todoFactory";
import projectFactory from "./projectFactory";
import {
  hideSidebar,
  changeContentTitle,
  renderProjectsList,
  renderTasks,
} from "./domManipulation";
import { format } from "date-fns";

const hideSidebarBtn = document.querySelector(".sidebar-btn");
const allTaskBtn = document.querySelector(".option-1");
const todayBtn = document.querySelector(".option-2");
const weekBtn = document.querySelector(".option-3");
const importantBtn = document.querySelector(".option-4");
const sidebarOptions = [allTaskBtn, todayBtn, weekBtn, importantBtn];
const addProjectBtn = document.querySelector(".add-project");
const addProjectForm = document.querySelector(".add-project-form");
const closeProjectForm = document.querySelector(".close-project-form");

const projectsList = [];

const defaultTask = todoFactory("some title", "some description", Date.now());
const testTask = todoFactory("test", "test details", new Date("2017-01-26"));
testTask.hasPriority = true;

const defaultProject = projectFactory("Default Project");
defaultProject.addTodo(defaultTask);
const testProject = projectFactory("Test Project");
testProject.addTodo(testTask);

projectsList.push(defaultProject);
projectsList.push(testProject);

hideSidebarBtn.addEventListener("click", hideSidebar);

sidebarOptions.forEach((option) => {
  option.addEventListener("click", () => {
    changeContentTitle(option);
    renderTasks(option, projectsList);
  });
});

renderProjectsList(projectsList);
renderTasks("initialize", projectsList);

addProjectBtn.addEventListener("click", () => {
  addProjectForm.style.display = "block";
});

addProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = document.getElementById("projectNameInput").value;
  if (validateForm(inputValue) === false) {
    return false;
  }
  createProject(inputValue);
  addProjectForm.style.display = "none";
  renderProjectsList(projectsList);
  projectBtns = document.querySelectorAll(".project-btn");
  addEventListenerOnProjectsBtns();
});

closeProjectForm.addEventListener("click", () => {
  addProjectForm.style.display = "none";
});

function validateForm(name) {
  let nameAlreadyPresent = false;
  projectsList.forEach((project) => {
    if (project.name === name) {
      nameAlreadyPresent = true;
    }
  });
  if (nameAlreadyPresent) {
    alert("A project with the same name already exists.");
    return false;
  }
}

function createProject(name) {
  projectsList.push(projectFactory(name));
}

function addEventListenerOnProjectsBtns() {
  projectBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      changeContentTitle(btn);
      renderTasks(btn, projectsList);
    });
  });
}

let projectBtns = document.querySelectorAll(".project-btn");
addEventListenerOnProjectsBtns();
