import { format, compareAsc } from "date-fns";

const sidebarDiv = document.querySelector(".sidebar");
const mainDiv = document.querySelector(".main");
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
    projectBtn.classList.add(...[`project-btn`]);
    const projectIcon = document.createElement("i");
    projectIcon.classList.add(...["fa-solid", "fa-bars", "fa-lg"]);
    const projectName = document.createElement("span");
    projectName.textContent = project.name;
    projectBtn.append(projectIcon, projectName);
    projectsContainer.append(projectBtn);
  });
};

const renderTasks = (selection, list) => {
  tasksContainer.innerHTML = "";
  let taskFound = false;
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
      if (project.name == selection.textContent) {
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
      }
    });
  }
  if (!taskFound) {
    tasksContainer.innerHTML = "<p>Yay! No Tasks!</p>";
  }
};

export { hideSidebar, changeContentTitle, renderProjectsList, renderTasks };
