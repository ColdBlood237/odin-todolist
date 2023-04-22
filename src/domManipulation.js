import { format, compareAsc } from "date-fns";

const sidebarDiv = document.querySelector(".sidebar");
const contentDiv = document.querySelector(".content");
const contentTitle = document.querySelector(".content-title");
const projectsContainer = document.querySelector(".projects-container");
const tasksContainer = document.querySelector(".tasks-container");

const hideSidebar = () => {
  if (sidebarDiv.style.display !== "none") {
    sidebarDiv.style.display = "none";
  } else {
    sidebarDiv.style.display = "flex";
  }
};

const changeContentTitle = (sidebarChoice) => {
  contentTitle.textContent = sidebarChoice.textContent;
};

const renderProjectsList = (list) => {
  let projectId = 0;
  document.querySelectorAll(".projects-container *").forEach((element) => {
    element.remove();
  });
  list.forEach((project) => {
    const projectBtn = document.createElement("button");
    projectBtn.classList.add(...[`project-btn`, `project-${projectId}`]);
    projectBtn.innerHTML = `<div>
                              <i class='fa-solid fa-bars fa-lg'></i>
                              <span class="project-name">${project.name}</span>
                            </div>
                            <div class="edit-project-container">
                              <div class='project-popup popup-${projectId}'>
                                <button class="rename-project project-${projectId}">Rename</button>
                                <button class="delete-project project-${projectId}">Delete</button>
                              </div>
                                <i class='fa-solid fa-ellipsis-vertical edit-project edit-project-${projectId}'></i>
                            </div>`;
    projectsContainer.append(projectBtn);
    projectId++;
  });
};

const renderTasks = (selection, list) => {
  tasksContainer.innerHTML = "";
  let taskFound = false;
  removeAddTaskBtn();
  if (selection === "initialize" || selection.classList[1] === "option-1") {
    let taskId = 0;
    list.forEach((project) => {
      project.todolist.forEach((task) => {
        taskFound = true;
        task.id = taskId;
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.id = `${taskId}`;
        taskDiv.innerHTML = `<div>
                          <input type="checkbox" name="" id=${taskId}>
                          <div class="task-text">
                            <h5>${task.title}</h5>
                            <p>${task.description}</p>
                          </div>
                         </div>
                         <div>
                          <div>${format(task.dueDate, "dd/MM/yyyy")}</div>
                          <button><i class="fa-regular fa-star"></i></button>
                          <button><i class="fa-solid fa-ellipsis-vertical"></i></button>
                        </div>`;
        taskId++;
        tasksContainer.appendChild(taskDiv);
      });
    });
  } else if (selection.classList[1] === "option-2") {
    let taskId = 0;
    list.forEach((project) => {
      project.todolist.forEach((task) => {
        if (
          format(task.dueDate, "dd/MM/yyyy") ===
          format(Date.now(), "dd/MM/yyyy")
        ) {
          taskFound = true;
          task.id = taskId;
          const taskDiv = document.createElement("div");
          taskDiv.classList.add("task");
          taskDiv.id = `${taskId}`;
          taskDiv.innerHTML = `<div>
                          <input type="checkbox" name="" id=${taskId}>
                          <div class="task-text">
                            <h5>${task.title}</h5>
                            <p>${task.description}</p>
                          </div>
                         </div>
                         <div>
                          <div>${format(task.dueDate, "dd/MM/yyyy")}</div>
                          <button><i class="fa-regular fa-star"></i></button>
                          <button><i class="fa-solid fa-ellipsis-vertical"></i></button>
                        </div>`;
          taskId++;
          tasksContainer.appendChild(taskDiv);
        }
      });
    });
  } else if (selection.classList[1] === "option-3") {
    let taskId = 0;
    list.forEach((project) => {
      project.todolist.forEach((task) => {
        let todayDate = new Date();
        let next7days = todayDate.setDate(todayDate.getDate() + 7);
        if (task.dueDate <= next7days) {
          taskFound = true;
          task.id = taskId;
          const taskDiv = document.createElement("div");
          taskDiv.classList.add("task");
          taskDiv.id = `${taskId}`;
          taskDiv.innerHTML = `<div>
                          <input type="checkbox" name="" id=${taskId}>
                          <div class="task-text">
                            <h5>${task.title}</h5>
                            <p>${task.description}</p>
                          </div>
                         </div>
                         <div>
                          <div>${format(task.dueDate, "dd/MM/yyyy")}</div>
                          <button><i class="fa-regular fa-star"></i></button>
                          <button><i class="fa-solid fa-ellipsis-vertical"></i></button>
                        </div>`;
          taskId++;
          tasksContainer.appendChild(taskDiv);
        }
      });
    });
  } else if (selection.classList[1] === "option-4") {
    let taskId = 0;
    list.forEach((project) => {
      project.todolist.forEach((task) => {
        if (task.hasPriority) {
          taskFound = true;
          task.id = taskId;
          const taskDiv = document.createElement("div");
          taskDiv.classList.add("task");
          taskDiv.id = `${taskId}`;
          taskDiv.innerHTML = `<div>
                          <input type="checkbox" name="" id=${taskId}>
                          <div class="task-text">
                            <h5>${task.title}</h5>
                            <p>${task.description}</p>
                          </div>
                         </div>
                         <div>
                          <div>${format(task.dueDate, "dd/MM/yyyy")}</div>
                          <button><i class="fa-regular fa-star"></i></button>
                          <button><i class="fa-solid fa-ellipsis-vertical"></i></button>
                        </div>`;
          taskId++;
          tasksContainer.appendChild(taskDiv);
        }
      });
    });
  } else if (selection.classList[0] === "project-btn") {
    let taskId = 0;
    list.forEach((project) => {
      if (project.id == selection.classList[1]) {
        project.todolist.forEach((task) => {
          taskFound = true;
          task.id = taskId;
          const taskDiv = document.createElement("div");
          taskDiv.classList.add("task");
          taskDiv.id = `${taskId}`;
          taskDiv.innerHTML = `<div>
                          <input type="checkbox" name="" id=${taskId}>
                          <div class="task-text">
                            <h5>${task.title}</h5>
                            <p>${task.description}</p>
                          </div>
                         </div>
                         <div>
                          <div>${format(task.dueDate, "dd/MM/yyyy")}</div>
                          <button><i class="fa-regular fa-star"></i></button>
                          <button><i class="fa-solid fa-ellipsis-vertical"></i></button>
                        </div>`;
          taskId++;
          tasksContainer.appendChild(taskDiv);
        });
        renderAddTaskBtn(project.id);
      }
    });
  }
  if (!taskFound) {
    tasksContainer.innerHTML = "<p>Yay! No Tasks!</p>";
  }
};

function removeAddTaskBtn() {
  if (document.querySelector(".add-task-btn")) {
    document.querySelector(".add-task-btn").remove();
  }
}

function renderAddTaskBtn(id) {
  removeAddTaskBtn();
  const addTaskBtn = document.createElement("button");
  addTaskBtn.classList.add(...["add-task-btn", `${id}`]);
  addTaskBtn.innerHTML = `<i class="fa-solid fa-circle-plus"></i>
                          <span>Add Task</span>`;
  contentDiv.appendChild(addTaskBtn);
}

// for a later time
const renderRenameProjectForm = (e) => {
  console.log(e.target.classList[1]);
  const projectBtn = document.querySelector(
    `.project-btn.${e.target.classList[1]}`
  );
  const previousName = projectBtn.querySelector(".project-name").textContent;
  projectBtn.innerHTML = `
                          <form action="" method="post" class="rename-project-form ${e.target.classList[1]}">
                            <label for="projectNameInput"><i class="fa-solid fa-bars fa-lg"></i></label>
                            <input type="text" name="projectNameInput" id="projectNameInput" value="${previousName}" required>
                            <div>
                              <button id="submit-project" type="submit">Rename</button>
                              <button class="close-project-form">Cancel</button>
                            </div>
                          </form>`;
};

export { hideSidebar, changeContentTitle, renderProjectsList, renderTasks };
