import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { ProjectManager } from "./project-manager.js"

// const btnAddProject = document.getElementById("btn-add-project");
const projectList = document.getElementById("project-list");

// create Button Add +
function createAddProject() {
  const listProjectName = document.getElementById("li-project-name");
  if (listProjectName) {
    listProjectName.remove();
  }

  const list = document.createElement("li");
  const button = document.createElement("button");
  const icon = document.createElement("i");

  list.id = "li-add-project";
  button.id = "btn-add-project";
  button.classList.add("btn-add-project");
  button.textContent = "NEW";
  icon.classList.add("fas", "fa-plus-circle");

  button.appendChild(icon);
  list.appendChild(button);
  projectList.appendChild(list);

  button.addEventListener("click", () => {
    console.log("click");
    createInputProject();
  });
}

// creates input and buttons to confirm/cancel 
function createInputProject() {
  const listAddProject = document.getElementById("li-add-project");
  if (listAddProject) {
    listAddProject.remove();
  }

  const list = document.createElement("li");
  const input = document.createElement("input");
  const btnConfirm = document.createElement("button");
  const btnCancel = document.createElement("button");
  const iconConfirm = document.createElement("i");
  const iconCancel = document.createElement("i");

  list.id = "li-project-name";
  input.id = "input-project-name";
  input.type = "text";
  input.maxLength = "50";

  list.classList.add("li-project-name");
  btnConfirm.classList.add("btn-confirm");
  btnCancel.classList.add("btn-cancel");
  iconConfirm.classList.add("fas", "fa-check", "fa-lg");
  iconCancel.classList.add("fas", "fa-times", "fa-lg");

  btnConfirm.appendChild(iconConfirm);
  btnCancel.appendChild(iconCancel);
  list.appendChild(input);
  list.appendChild(btnConfirm);
  list.appendChild(btnCancel);

  projectList.innerHTML = "";
  projectList.appendChild(list);

  btnConfirm.addEventListener("click", () => {
    console.log("confirm project name");
    getProjectName();
    createAddProject();
  });

  btnCancel.addEventListener("click", () => {
    cancelInputProject();
  });
}

// gets/checks user input for new project and calls function to create new
function getProjectName() {
  const userInput = document.getElementById("input-project-name").value;
  const cleanedInput = userInput.trim();
  if(cleanedInput.length > 0) {
    const project = projectManager.addProject(userInput);
    createNewProject(project);
    
  } else {
    console.log("Please enter valid Project Name");
  }
}

function createNewProject(project) {
  const listProjectName = document.getElementById("li-project-name");
  // remove "li-project-name"
  if(listProjectName) {
    listProjectName.remove();
  }
  const list = document.createElement("li");
  const button = document.createElement("button");

  button.id = project.getId();
  button.textContent = project.getName();

  list.appendChild(button);
  // append new li at the end of projectList
  projectList.append(list);
}

function cancelInputProject() {
  // remove input
  const listProjectName = document.getElementById("li-project-name");
  if (listProjectName) {
    listProjectName.remove();
  }
  // add project button
  createAddProject();
}

function initialSetup() {
  console.log("hello");
  createAddProject();
}

const projectManager = new ProjectManager();
initialSetup();
