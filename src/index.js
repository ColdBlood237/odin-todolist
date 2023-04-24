import todoFactory from "./todoFactory";
import projectFactory from "./projectFactory";
import {
  hideSidebar,
  changeContentTitle,
  renderProjectsList,
  renderTasks,
  renderRenameProjectForm,
} from "./domManipulation";

const hideSidebarBtn = document.querySelector(".sidebar-btn");
const allTaskBtn = document.querySelector(".option-1");
const todayBtn = document.querySelector(".option-2");
const weekBtn = document.querySelector(".option-3");
const importantBtn = document.querySelector(".option-4");
const sidebarOptions = [allTaskBtn, todayBtn, weekBtn, importantBtn];
const addProjectBtn = document.querySelector(".add-project");
const addProjectForm = document.querySelector(".add-project-form");
const closeProjectForm = document.querySelector(".close-project-form");
const addTaskForm = document.querySelector(".add-task-form");

const projectsList = [];

const defaultTask = todoFactory("some title", "some description", Date.now());
const testTask = todoFactory("test", "test details", new Date("2017-01-26"));
testTask.hasPriority = true;

const defaultProject = projectFactory("Default Project", "project-0");
defaultProject.addTodo(defaultTask);
const testProject = projectFactory("Test Project", "project-1");
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
  editProjectBtns = document.querySelectorAll(".edit-project");
  projectPopups = document.querySelectorAll(".project-popup");
  addEventListenerOnProjectsBtns();
  addEventListenersOnEditProjects();
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

let projectId = 2;
function createProject(name) {
  projectsList.push(projectFactory(name, `project-${projectId}`));
  projectId++;
}

let addTaskFormIsOpen = false;
function addEventListenerOnProjectsBtns() {
  projectBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      changeContentTitle(btn.querySelector(".project-name"));
      renderTasks(btn, projectsList);
      addTaskForm.classList.replace(addTaskForm.classList[1], btn.classList[1]);

      openAddTaskForm();
      closeAddTaskForm();
    });
  });
}

function addEventListenersOnEditProjects() {
  editProjectBtns.forEach((btn) => {
    btn.addEventListener("click", openEditProjectPopup);
  });
}

// to refactor later
let editProjectPopupFlag = false;
let editProjectClicked;
let editProjectPopupOpen;
function openEditProjectPopup(e) {
  for (let i = 0; i < editProjectBtns.length; i++) {
    if (e.target.classList[3] == `edit-project-${i}` && !editProjectPopupFlag) {
      projectPopups[i].style.display = "flex";
      editProjectPopupOpen = projectPopups[i];
      editProjectClicked = `edit-project-${i}`;
      editProjectPopupFlag = true;
    }
  }
}

function openAddTaskForm() {
  const addTaskBtn = document.querySelector(".add-task-btn");
  addTaskBtn.addEventListener("click", () => {
    addTaskForm.style.display = "flex";
    addTaskFormIsOpen = true;
  });
}

function closeAddTaskForm() {
  const closeFormBtn = addTaskForm.querySelector(".cancel");
  document.addEventListener("click", (e) => {
    if (closeFormBtn.contains(e.target)) {
      addTaskForm.style.display = "none";
      addTaskFormIsOpen = false;
    }
  });
}

addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskTitle = addTaskForm.querySelector("#title").value;
  const taskDetails = addTaskForm.querySelector("#details").value;
  const taskDueDate = new Date(addTaskForm.querySelector("#date").value);
  const newTask = todoFactory(taskTitle, taskDetails, taskDueDate);
  projectsList.forEach((project) => {
    if (project.id === addTaskForm.classList[1]) {
      project.addTodo(newTask);
    }
  });
  addTaskForm.style.display = "none";
  renderTasks(
    document.querySelector(`button.${addTaskForm.classList[1]}`),
    projectsList
  );
  addTaskForm.reset();
  openAddTaskForm();
});

// so ugly I gotta refactor this later
document.addEventListener("click", (e) => {
  if (
    e.target.classList[2] === "edit-project" &&
    e.target.classList[3] != editProjectClicked
  ) {
    editProjectPopupOpen.style.display = "none";
    editProjectPopupFlag = false;
    openEditProjectPopup(e);
  }
  if (editProjectPopupFlag && e.target.classList[3] != editProjectClicked) {
    editProjectPopupOpen.style.display = "none";
    editProjectPopupFlag = false;
  }
});

// elements that change
let projectBtns = document.querySelectorAll(".project-btn");
let editProjectBtns = document.querySelectorAll(".edit-project");
let projectPopups = document.querySelectorAll(".project-popup");
let deleteProjectBtns = document.querySelectorAll(".delete-project");
addEventListenerOnProjectsBtns();
addEventListenersOnEditProjects();

deleteProjectBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    for (let i = 0; i < projectsList.length; i++) {
      if (projectsList[i].id === btn.classList[1]) {
        projectsList.splice(i, 1);
      }
    }
    console.log(projectsList);
    renderProjectsList(projectsList);
    projectBtns = document.querySelectorAll(".project-btn");
    editProjectBtns = document.querySelectorAll(".edit-project");
    projectPopups = document.querySelectorAll(".project-popup");
    addEventListenerOnProjectsBtns();
    addEventListenersOnEditProjects();
  });
});
