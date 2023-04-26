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
let taskPriorityBtns = document.querySelectorAll(".priority-btn");
let editTaskBtns = document.querySelectorAll(".edit-task-btn");
let tasksPopups = document.querySelectorAll(".task-popup");
let deleteTasksBtns = document.querySelectorAll(".delete-task");

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

renderProjectsList(projectsList);
renderTasks("initialize", projectsList);
addEventListenerOnPriorityBtns();
addEventListenersOnEditTasks();
addEventListenerOnDeleteTaskBtns();
addEventListenerOnTasksTitles();
addEventListenerOnTasksDetails();
addEventListenersOnTasksDates();

// switch content pressing menu buttons
sidebarOptions.forEach((option) => {
  option.addEventListener("click", () => {
    changeContentTitle(option);
    renderTasks(option, projectsList);
    addEventListenerOnPriorityBtns();
    addEventListenersOnEditTasks();
    addEventListenerOnDeleteTaskBtns();
    addEventListenerOnTasksTitles();
    addEventListenerOnTasksDetails();
    addEventListenersOnTasksDates();
  });
});

function refreshContent() {
  projectBtns = document.querySelectorAll(".project-btn");
  const contentTitle = document.querySelector(".content-title").textContent;
  sidebarOptions.forEach((option) => {
    const optionName = option.querySelector("span").textContent;
    if (optionName.trim() === contentTitle.trim()) {
      renderTasks(option, projectsList);
    }
  });
  projectBtns.forEach((btn) => {
    const buttonName = btn.querySelector(".project-name").textContent;
    if (buttonName === contentTitle) {
      renderTasks(btn, projectsList);
    }
  });
  addEventListenerOnPriorityBtns();
  addEventListenersOnEditTasks();
  addEventListenerOnDeleteTaskBtns();
  addEventListenerOnTasksTitles();
  addEventListenerOnTasksDetails();
  addEventListenersOnTasksDates();
}

// open the form to type the new project's name
addProjectBtn.addEventListener("click", () => {
  addProjectForm.style.display = "block";
});

// create the projects
addProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = document.getElementById("projectNameInput").value;
  if (nameAlreadyUsed(inputValue)) {
    return false;
  }
  createProject(inputValue);
  addProjectForm.reset();
  addProjectForm.style.display = "none";
  renderProjectsList(projectsList);
  projectBtns = document.querySelectorAll(".project-btn");
  editProjectBtns = document.querySelectorAll(".edit-project");
  projectPopups = document.querySelectorAll(".project-popup");
  deleteProjectBtns = document.querySelectorAll(".delete-project");
  addEventListenerOnProjectsBtns();
  addEventListenersOnEditProjects();
  addEventListenerOnDeleteProjectsBtns();
});

closeProjectForm.addEventListener("click", () => {
  addProjectForm.style.display = "none";
});

function nameAlreadyUsed(newName) {
  let nameAlreadyPresent = false;
  projectsList.forEach((project) => {
    if (project.name === newName) {
      nameAlreadyPresent = true;
    }
  });
  if (nameAlreadyPresent) {
    alert("A project with the same name already exists.");
    return true;
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
      addEventListenerOnPriorityBtns();
      addEventListenersOnEditTasks();
      addEventListenerOnDeleteTaskBtns();
      addEventListenerOnTasksTitles();
      addEventListenerOnTasksDetails();
      addEventListenersOnTasksDates();
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

let projectPopupIsOpen = false;
function openEditProjectPopup(e) {
  projectPopups.forEach((popup) => {
    if (e.target.classList[3] === popup.classList[1]) {
      popup.style.display = "flex";
      projectPopupIsOpen = true;
    }
  });
}

// close the project editor popup
document.addEventListener("click", (e) => {
  if (projectPopupIsOpen && e.target.classList[2] === "edit-project") {
    projectPopups.forEach((popup) => {
      popup.style.display = "none";
    });
    openEditProjectPopup(e);
  } else if (projectPopupIsOpen) {
    projectPopups.forEach((popup) => {
      popup.style.display = "none";
    });
    projectPopupIsOpen = false;
  }
});

function addEventListenerOnDeleteProjectsBtns() {
  deleteProjectBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      for (let i = 0; i < projectsList.length; i++) {
        if (projectsList[i].id === btn.classList[1]) {
          projectsList.splice(i, 1);
        }
      }

      renderProjectsList(projectsList);
      projectBtns = document.querySelectorAll(".project-btn");
      editProjectBtns = document.querySelectorAll(".edit-project");
      projectPopups = document.querySelectorAll(".project-popup");
      deleteProjectBtns = document.querySelectorAll(".delete-project");
      addEventListenerOnProjectsBtns();
      addEventListenersOnEditProjects();
      addEventListenerOnDeleteProjectsBtns();
    });
  });
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

// create a new task from form data
addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskTitle = addTaskForm.querySelector("#title").value;
  let taskDetails = addTaskForm.querySelector("#details").value;
  if (taskDetails === "") {
    taskDetails = "No details...";
  }
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
  addEventListenerOnPriorityBtns();
  addEventListenersOnEditTasks();
  addEventListenerOnDeleteTaskBtns();
  addEventListenerOnTasksTitles();
  addEventListenerOnTasksDetails();
  addEventListenersOnTasksDates();
  addTaskForm.reset();
  openAddTaskForm();
});

function addEventListenerOnPriorityBtns() {
  taskPriorityBtns = document.querySelectorAll(".priority-btn");
  taskPriorityBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      projectsList.forEach((project) => {
        project.todolist.forEach((task) => {
          if (task.id == btn.classList[1]) {
            if (task.hasPriority) {
              task.hasPriority = false;
            } else {
              task.hasPriority = true;
            }
          }
        });
      });
      refreshContent();
    });
  });
}

function addEventListenersOnEditTasks() {
  editTaskBtns = document.querySelectorAll(".edit-task-btn");
  tasksPopups = document.querySelectorAll(".task-popup");
  editTaskBtns.forEach((btn) => {
    btn.addEventListener("click", openTaskPopup);
  });
}

let taskPopupIsOpen = false;
function openTaskPopup(e) {
  editTaskBtns.forEach((btn) => {
    if (btn.classList[1] === e.target.classList[1]) {
      tasksPopups.forEach((popup) => {
        if (popup.classList[1] === `task-popup-${btn.classList[1]}`) {
          popup.style.display = "flex";
          taskPopupIsOpen = true;
        }
      });
    }
  });
}

// close the task editor popup
document.addEventListener("click", (e) => {
  if (e.target.classList[0] === "edit-task-btn" && taskPopupIsOpen) {
    tasksPopups.forEach((popup) => {
      popup.style.display = "none";
    });
    openTaskPopup(e);
  } else if (taskPopupIsOpen) {
    tasksPopups.forEach((popup) => {
      popup.style.display = "none";
    });
  }
});

function addEventListenerOnDeleteTaskBtns() {
  deleteTasksBtns = document.querySelectorAll(".delete-task");
  deleteTasksBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      deleteTask(btn);
    });
  });
}

function deleteTask(btn) {
  projectsList.forEach((project) => {
    project.todolist.forEach((task) => {
      if (btn.classList[1] === `task-${task.id}`) {
        project.removeTodo(task);
        refreshContent();
      }
    });
  });
}

function addEventListenerOnTasksTitles() {}
const tasksTitles = document.querySelectorAll(".task-title");
tasksTitles.forEach((title) => {
  title.addEventListener("blur", () => {
    modifyTitle(title);
  });
});

function modifyTitle(title) {
  projectsList.forEach((project) => {
    project.todolist.forEach((task) => {
      if (title.classList[1] == task.id) {
        task.title = title.innerHTML;
      }
    });
  });
}

function addEventListenerOnTasksDetails() {
  const tasksDetails = document.querySelectorAll(".task-details");
  tasksDetails.forEach((detail) => {
    detail.addEventListener("blur", () => {
      modifyDetails(detail);
    });
  });
}

function modifyDetails(detail) {
  projectsList.forEach((project) => {
    project.todolist.forEach((task) => {
      if (detail.classList[1] == task.id) {
        task.description = detail.innerHTML;
      }
    });
  });
}

function addEventListenersOnTasksDates() {
  const dates = document.querySelectorAll(".task-date");
  const datePickers = document.querySelectorAll(".date-picker");
  dates.forEach((date) => {
    date.addEventListener("click", () => {
      date.style.display = "none";
      datePickers.forEach((datePicker) => {
        if (datePicker.classList[1] === date.classList[1]) {
          datePicker.style.display = "block";
          datePicker.addEventListener("change", () => {
            console.log("change event fired");
            modifyDate(datePicker);
            date.style.display = "block";
            refreshContent();
          });
        }
      });
    });
  });
}

function modifyDate(datePicker) {
  projectsList.forEach((project) => {
    project.todolist.forEach((task) => {
      if (task.id == datePicker.classList[1]) {
        task.dueDate = new Date(datePicker.value);
        console.log(task);
      }
    });
  });
  datePicker.style.display = "none";
}

// elements that change
let projectBtns = document.querySelectorAll(".project-btn");
let editProjectBtns = document.querySelectorAll(".edit-project");
let projectPopups = document.querySelectorAll(".project-popup");
let deleteProjectBtns = document.querySelectorAll(".delete-project");

addEventListenerOnProjectsBtns();
addEventListenersOnEditProjects();
// addEventListenerOnPriorityBtns();
// addEventListenersOnEditTasks();
// addEventListenerOnDeleteTaskBtns();
addEventListenerOnDeleteProjectsBtns();
