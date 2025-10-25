import { getProjectName } from "./index.js";

const projectList = document.getElementById("project-list");
const containerToDos = document.getElementById("container-todos");

// create button New + for project
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
  icon.classList.add("fas", "fa-plus-circle");

  button.textContent = "NEW";

  button.appendChild(icon);
  list.appendChild(button);
  projectList.appendChild(list);

  button.addEventListener("click", () => {
    console.log("click");
    createInputProject();
  });
}

// creates button New + for todos
function createAddToDo() {
  console.log("createAddToDo");
  const button = document.createElement("button");
  const icon = document.createElement("i");

  button.classList.add("btn-add-todo");
  icon.classList.add("fas", "fa-plus-circle");

  button.textContent = "New";

  button.appendChild(icon);
  containerToDos.appendChild(button);

  button.addEventListener("click", () => {
    console.log("open todo for entering stuff");
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

function createNewProject(project) {
  const listProjectName = document.getElementById("li-project-name");
  // remove "li-project-name"
  if (listProjectName) {
    listProjectName.remove();
  }
  const list = document.createElement("li");
  const button = document.createElement("button");

  button.id = project.getId();
  button.textContent = project.getName();

  list.appendChild(button);
  projectList.appendChild(list);
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

export { createAddProject, createNewProject, createAddToDo };
