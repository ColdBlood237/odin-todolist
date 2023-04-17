import todoFactory from "./todoFactory";
import projectFactory from "./projectFactory";
import { hideSidebar } from "./domManipulation";

const hideSidebarBtn = document.querySelector(".sidebar-btn");
const sidebarOptions = document.querySelectorAll(".sidebar-option");

let todolist = [];

const defaultProject = projectFactory("Default", todolist);

hideSidebarBtn.addEventListener("click", hideSidebar);

sidebarOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    console.log(e.target);
  });
});
