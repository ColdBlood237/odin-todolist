import todoFactory from "./todo";
import projectFactory from "./projects";

let todolist = [];

const defaultProject = projectFactory("Default", todolist);

console.log(defaultProject);
