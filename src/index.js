import todoFactory from "./todoFactory";
import projectFactory from "./projectFactory";
import { hideSidebar, changeContentTitle } from "./domManipulation";

const hideSidebarBtn = document.querySelector(".sidebar-btn");
const allTaskBtn = document.querySelector(".option-1");
const todayBtn = document.querySelector(".option-2");
const weekBtn = document.querySelector(".option-3");
const importantBtn = document.querySelector(".option-4");
const sidebarOptions = [allTaskBtn, todayBtn, weekBtn, importantBtn];

let todolist = [];

const defaultProject = projectFactory("Default", todolist);

hideSidebarBtn.addEventListener("click", hideSidebar);

sidebarOptions.forEach((option) => {
  option.addEventListener("click", () => {
    changeContentTitle(option);
  });
});
