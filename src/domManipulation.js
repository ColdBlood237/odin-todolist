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
  document.querySelectorAll(".projects-container *").forEach((element) => {
    element.remove();
  });
  list.forEach((project) => {
    const projectBtn = document.createElement("button");
    projectBtn.classList.add(...[`project-btn`, `${project.id}`]);
    projectBtn.innerHTML = `<div>
                              <i class='fa-solid fa-bars fa-lg'></i>
                              <span class="project-name">${project.name}</span>
                            </div>
                            <div class="edit-project-container">
                              <div class='project-popup ${project.id}'>
                                <button class="rename-project ${project.id}">Rename</button>
                                <button class="delete-project ${project.id}">Delete</button>
                              </div>
                                <i class='fa-solid fa-ellipsis-vertical edit-project ${project.id}'></i>
                            </div>`;
    projectsContainer.append(projectBtn);
  });
};

const renderTasks = (selection, list) => {
  tasksContainer.innerHTML = "";
  let taskFound = false;
  removeAddTaskBtn();
  if (selection === "initialize" || selection.classList[1] === "option-1") {
    list.forEach((project) => {
      project.todolist.forEach((task) => {
        taskFound = true;
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.id = `${task.id}`;
        taskDiv.innerHTML = `<div>
                          <input type="checkbox" name="" id=${task.id}>
                          <div class="task-text">
                            <h5 class="task-title ${
                              task.id
                            }" contenteditable="true">${task.title}</h5>
                            <p class="task-details ${
                              task.id
                            }" contenteditable="true">${task.description}</p>
                          </div>
                         </div>
                         <div>
                          <div class="task-date ${task.id}">${format(
          task.dueDate,
          "dd/MM/yyyy"
        )}</div>
                          <button class="priority-btn ${task.id}"></button>
                          <div class="edit-task-container">
                            <div class="task-popup task-popup-${task.id}">
                              <button class="edit-task task-${
                                task.id
                              }">Edit</button>
                              <button class="delete-task task-${
                                task.id
                              }">Delete</button>
                            </div>
                            <i class="edit-task-btn ${
                              task.id
                            } fa-solid fa-ellipsis-vertical"></i>
                          </div>   
                         </div>`;
        const star = document.createElement("i");
        if (task.hasPriority) {
          star.classList.add(...["fa-solid", "fa-star"]);
          star.style.color = "#eee844";
        } else {
          star.classList.add(...["fa-regular", "fa-star"]);
        }
        const priorityBtn = taskDiv.querySelector(".priority-btn");
        priorityBtn.appendChild(star);
        tasksContainer.appendChild(taskDiv);
      });
    });
  } else if (selection.classList[1] === "option-2") {
    list.forEach((project) => {
      project.todolist.forEach((task) => {
        if (
          format(task.dueDate, "dd/MM/yyyy") ===
          format(Date.now(), "dd/MM/yyyy")
        ) {
          taskFound = true;

          const taskDiv = document.createElement("div");
          taskDiv.classList.add("task");
          taskDiv.id = `${task.id}`;
          taskDiv.innerHTML = `<div>
                          <input type="checkbox" name="" id=${task.id}>
                          <div class="task-text">
                            <h5 class="task-title ${
                              task.id
                            }" contenteditable="true">${task.title}</h5>
                            <p class="task-details ${
                              task.id
                            }" contenteditable="true">${task.description}</p>
                          </div>
                         </div>
                         <div>
                          <div class="task-date ${task.id}">${format(
            task.dueDate,
            "dd/MM/yyyy"
          )}</div>
                          <button class="priority-btn ${task.id}"></button>
                          <div class="edit-task-container">
                            <div class="task-popup task-popup-${task.id}">
                              <button class="edit-task task-${
                                task.id
                              }">Edit</button>
                              <button class="delete-task task-${
                                task.id
                              }">Delete</button>
                            </div>
                            <i class="edit-task-btn ${
                              task.id
                            } fa-solid fa-ellipsis-vertical"></i>
                          </div>   
                         </div>`;
          const star = document.createElement("i");
          if (task.hasPriority) {
            star.classList.add(...["fa-solid", "fa-star"]);
            star.style.color = "#eee844";
          } else {
            star.classList.add(...["fa-regular", "fa-star"]);
          }
          const priorityBtn = taskDiv.querySelector(".priority-btn");
          priorityBtn.appendChild(star);

          tasksContainer.appendChild(taskDiv);
        }
      });
    });
  } else if (selection.classList[1] === "option-3") {
    list.forEach((project) => {
      project.todolist.forEach((task) => {
        let todayDate = new Date();
        let next7days = todayDate.setDate(todayDate.getDate() + 7);
        if (task.dueDate <= next7days) {
          taskFound = true;

          const taskDiv = document.createElement("div");
          taskDiv.classList.add("task");
          taskDiv.id = `${task.id}`;
          taskDiv.innerHTML = `<div>
                          <input type="checkbox" name="" id=${task.id}>
                          <div class="task-text">
                            <h5 class="task-title ${
                              task.id
                            }" contenteditable="true">${task.title}</h5>
                            <p class="task-details ${
                              task.id
                            }" contenteditable="true">${task.description}</p>
                          </div>
                         </div>
                         <div>
                          <div class="task-date ${task.id}">${format(
            task.dueDate,
            "dd/MM/yyyy"
          )}</div>
                          <button class="priority-btn ${task.id}"></button>
                          <div class="edit-task-container">
                            <div class="task-popup task-popup-${task.id}">
                              <button class="edit-task task-${
                                task.id
                              }">Edit</button>
                              <button class="delete-task task-${
                                task.id
                              }">Delete</button>
                            </div>
                            <i class="edit-task-btn ${
                              task.id
                            } fa-solid fa-ellipsis-vertical"></i>
                          </div>   
                         </div>`;
          const star = document.createElement("i");
          if (task.hasPriority) {
            star.classList.add(...["fa-solid", "fa-star"]);
            star.style.color = "#eee844";
          } else {
            star.classList.add(...["fa-regular", "fa-star"]);
          }
          const priorityBtn = taskDiv.querySelector(".priority-btn");
          priorityBtn.appendChild(star);

          tasksContainer.appendChild(taskDiv);
        }
      });
    });
  } else if (selection.classList[1] === "option-4") {
    list.forEach((project) => {
      project.todolist.forEach((task) => {
        if (task.hasPriority) {
          taskFound = true;

          const taskDiv = document.createElement("div");
          taskDiv.classList.add("task");
          taskDiv.id = `${task.id}`;
          taskDiv.innerHTML = `<div>
                          <input type="checkbox" name="" id=${task.id}>
                          <div class="task-text">
                            <h5 class="task-title ${
                              task.id
                            }" contenteditable="true">${task.title}</h5>
                            <p class="task-details ${
                              task.id
                            }" contenteditable="true">${task.description}</p>
                          </div>
                         </div>
                         <div>
                          <div class="task-date ${task.id}">${format(
            task.dueDate,
            "dd/MM/yyyy"
          )}</div>
                          <button class="priority-btn ${task.id}"></button>
                          <div class="edit-task-container">
                            <div class="task-popup task-popup-${task.id}">
                              <button class="edit-task task-${
                                task.id
                              }">Edit</button>
                              <button class="delete-task task-${
                                task.id
                              }">Delete</button>
                            </div>
                            <i class="edit-task-btn ${
                              task.id
                            } fa-solid fa-ellipsis-vertical"></i>
                          </div>   
                         </div>`;
          const star = document.createElement("i");
          if (task.hasPriority) {
            star.classList.add(...["fa-solid", "fa-star"]);
            star.style.color = "#eee844";
          } else {
            star.classList.add(...["fa-regular", "fa-star"]);
          }
          const priorityBtn = taskDiv.querySelector(".priority-btn");
          priorityBtn.appendChild(star);

          tasksContainer.appendChild(taskDiv);
        }
      });
    });
  } else if (selection.classList[0] === "project-btn") {
    list.forEach((project) => {
      if (project.id == selection.classList[1]) {
        project.todolist.forEach((task) => {
          taskFound = true;

          const taskDiv = document.createElement("div");
          taskDiv.classList.add("task");
          taskDiv.id = `${task.id}`;
          taskDiv.innerHTML = `<div>
                          <input type="checkbox" name="" id=${task.id}>
                          <div class="task-text">
                            <h5 class="task-title ${
                              task.id
                            }" contenteditable="true">${task.title}</h5>
                            <p class="task-details ${
                              task.id
                            }" contenteditable="true">${task.description}</p>
                          </div>
                         </div>
                         <div>
                          <div class="task-date ${task.id}">${format(
            task.dueDate,
            "dd/MM/yyyy"
          )}</div>
                          <button class="priority-btn ${task.id}"></button>
                          <div class="edit-task-container">
                            <div class="task-popup task-popup-${task.id}">
                              <button class="edit-task task-${
                                task.id
                              }">Edit</button>
                              <button class="delete-task task-${
                                task.id
                              }">Delete</button>
                            </div>
                            <i class="edit-task-btn ${
                              task.id
                            } fa-solid fa-ellipsis-vertical"></i>
                          </div>   
                         </div>`;
          const star = document.createElement("i");
          if (task.hasPriority) {
            star.classList.add(...["fa-solid", "fa-star"]);
            star.style.color = "#eee844";
          } else {
            star.classList.add(...["fa-regular", "fa-star"]);
          }
          const priorityBtn = taskDiv.querySelector(".priority-btn");
          priorityBtn.appendChild(star);

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
