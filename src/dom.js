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
  const button = document.createElement("button");
  const icon = document.createElement("i");

  button.id = "btn-add-todo";
  button.classList.add("btn-add-todo");
  icon.classList.add("fas", "fa-plus-circle");

  button.textContent = "New";

  button.appendChild(icon);
  containerToDos.appendChild(button);

  button.addEventListener("click", () => {
    createInputToDo();
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

function createInputToDo() {
  const btnAddToDo = document.getElementById("btn-add-todo");
  if (btnAddToDo) {
    btnAddToDo.remove();
  }

  const article = document.createElement("article");
  const inputDate = document.createElement("input");

  const selectPriority = document.createElement("select");
  const optionLow = document.createElement("option");
  const optionNormal = document.createElement("option");
  const optionHigh = document.createElement("option");

  const checkboxDone = document.createElement("input");

  const divTitle = document.createElement("div");
  const labelTitle = document.createElement("label");
  const inputTitle = document.createElement("input");

  const divDescription = document.createElement("div");
  const labelDescription = document.createElement("label");
  const textareaDescription = document.createElement("textarea");

  const divButtons = document.createElement("div");
  const buttonConfirm = document.createElement("button");
  const buttonCancel = document.createElement("button");
  const iconConfirm = document.createElement("i");
  const iconCancel = document.createElement("i");

  article.classList.add("card", "card-create-todo");

  inputDate.id = "create-todo-date";
  inputDate.classList.add("create-todo-date");
  inputDate.type = "date";

  selectPriority.id = "create-todo-priority";
  selectPriority.classList.add("create-todo-priority");
  selectPriority.name = "create-todo-priority";
  optionLow.value = "low";
  optionLow.textContent = "Low";
  optionNormal.value = "normal";
  optionNormal.textContent = "Normal";
  optionHigh.value = "high";
  optionHigh.textContent = "High";

  checkboxDone.id = "create-todo-done";
  checkboxDone.classList.add("create-todo-done");
  checkboxDone.type = "checkbox";
  checkboxDone.name = "checkbox-done";
  checkboxDone.value = "checkbox-done";

  divTitle.classList.add("create-todo-title");
  labelTitle.htmlFor = "input-title";
  labelTitle.textContent = "Title";
  inputTitle.id = "input-title";
  inputTitle.classList.add("input-title");
  inputTitle.type = "text";

  divDescription.classList.add("create-todo-description");
  labelDescription.htmlFor = "textarea-description";
  labelDescription.textContent = "Description";
  textareaDescription.id = "textarea-description";
  textareaDescription.classList.add("textarea-description");
  textareaDescription.rows = "3";
  textareaDescription.maxLength = "100";

  divButtons.classList.add("create-todo-buttons");
  buttonConfirm.id = "btn-confirm-input";
  buttonConfirm.classList.add("btn-confirm-input");
  buttonCancel.id = "btn-cancel-input";
  buttonCancel.classList.add("btn-cancel-input");
  iconConfirm.classList.add("fas", "fa-check", "fa-lg");
  iconCancel.classList.add("fas", "fa-times", "fa-lg");

  selectPriority.appendChild(optionLow);
  selectPriority.appendChild(optionNormal);
  selectPriority.appendChild(optionHigh);

  divTitle.appendChild(labelTitle);
  divTitle.appendChild(inputTitle);

  divDescription.appendChild(labelDescription);
  divDescription.appendChild(textareaDescription);

  buttonConfirm.appendChild(iconConfirm);
  buttonCancel.appendChild(iconCancel);
  divButtons.appendChild(buttonConfirm);
  divButtons.appendChild(buttonCancel), article.appendChild(inputDate);
  article.appendChild(selectPriority);
  article.appendChild(checkboxDone);
  article.appendChild(divTitle);
  article.appendChild(divDescription);
  article.appendChild(divButtons);

  containerToDos.appendChild(article);

  buttonConfirm.addEventListener("click", () => {
    console.log("confirm button was pressed, get input data and do stuff");
  });

  buttonCancel.addEventListener("click", () => {
    console.log(
      "button cancel was pressed, remove create todo and add New + button again"
    );
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
