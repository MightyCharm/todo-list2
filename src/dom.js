const projectList = document.getElementById("project-list");
const containerToDos = document.getElementById("container-todos");

function initialSetup(projectManager) {
  renderProject(projectManager);
}

// create button New + for project
function createAddProject(projectManager) {
  const listProjectName = document.getElementById("li-project-name");
  if (listProjectName) {
    listProjectName.remove();
  }

  const list = document.createElement("li");
  const button = document.createElement("button");
  const icon = document.createElement("i");

  list.id = "li-add-project";
  list.classList.add("li-project");
  button.id = "btn-add-project";
  button.classList.add("btn-add-project");
  icon.classList.add("fas", "fa-plus-circle");

  button.textContent = "NEW";

  button.appendChild(icon);
  list.appendChild(button);
  projectList.appendChild(list);
}

// creates form so user can enter name for new project
function createInputProject(projectManager) {
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
  btnConfirm.id = "btn-confirm-project";
  btnCancel.id = "btn-cancel-project";

  list.classList.add("li-project", "li-project-name");
  btnConfirm.classList.add("btn-confirm-project");
  btnCancel.classList.add("btn-cancel-project");
  iconConfirm.classList.add("fas", "fa-check", "fa-lg");
  iconCancel.classList.add("fas", "fa-times", "fa-lg");

  btnConfirm.appendChild(iconConfirm);
  btnCancel.appendChild(iconCancel);
  list.appendChild(input);
  list.appendChild(btnConfirm);
  list.appendChild(btnCancel);

  projectList.appendChild(list);
}

// creates button New + for todos
function createAddToDo(projectManager) {
  const button = document.createElement("button");
  const icon = document.createElement("i");

  button.id = "btn-add-todo";
  button.classList.add("btn-add-todo");
  icon.classList.add("fas", "fa-plus-circle");

  button.textContent = "New";

  button.appendChild(icon);
  containerToDos.appendChild(button);
}

// creates form so user can enter data for a new todo
function createInputToDo(projectManager) {
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

  article.id = "card-create-todo";
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
  buttonConfirm.id = "btn-confirm-todo";
  buttonConfirm.classList.add("btn-confirm-todo");
  buttonCancel.id = "btn-cancel-todo";
  buttonCancel.classList.add("btn-cancel-todo");
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
  divButtons.appendChild(buttonCancel);
  article.appendChild(inputDate);
  article.appendChild(selectPriority);
  article.appendChild(divTitle);
  article.appendChild(divDescription);
  article.appendChild(divButtons);

  containerToDos.appendChild(article);
}

// create a new todo
function renderToDo(projectManager) {}

function cancelInputProject(projectManager) {
  // remove input
  const listProjectName = document.getElementById("li-project-name");
  if (listProjectName) {
    listProjectName.remove();
  }
  // add project button
  createAddProject(projectManager);
}

function cancelInputToDo(projectManager) {
  const cardCreateToDo = document.getElementById("card-create-todo");
  if (cardCreateToDo) {
    cardCreateToDo.remove();
  }
  createAddToDo(projectManager);
}

function validateInputToDo() {
  const date = document.getElementById("create-todo-date");
  const priority = document.getElementById("create-todo-priority");
  const title = document.getElementById("input-title");
  const description = document.getElementById("textarea-description");

  const inputDate = date.value;
  const inputPriority = priority.value;
  const inputTitle = title.value.trim();
  const inputDescription = description.value.trim();

  console.log(`date: ${inputDate}  length: ${inputDate.length}`);
  console.log(`priority: ${inputPriority} length: ${inputPriority.length}`);
  console.log(`title ${inputTitle} length: ${inputTitle.length}`);
  console.log(
    `description: ${inputDescription} length: ${inputDescription.length}`
  );

  // good values: create todo
  if (inputDate && inputTitle && inputDescription) {
    return {
      check: true,
      inputs: {
        title: inputTitle,
        description: inputDescription,
        dueDate: inputDate,
        priority: inputPriority,
      },
    };
  }
  console.log("Input is missing something, do nothing for now");
  return { check: false };
}

// gets/checks user input for new project and calls function to create new
function createProject(projectManager) {
  const userInput = document.getElementById("input-project-name").value;
  const cleanedInput = userInput.trim();
  if (cleanedInput.length > 0) {
    // create project
    projectManager.addProject(cleanedInput);
    renderProject(projectManager);
  } else {
    console.log("Please enter valid Project Name");
  }
}

// create a new project
function renderProject(projectManager) {
  const project = projectManager.getActiveProject();
  const listProjectName = document.getElementById("li-project-name");
  // remove "li-project-name"
  if (listProjectName) {
    listProjectName.remove();
  }
  const list = document.createElement("li");
  const button = document.createElement("button");

  list.classList.add("li-project");
  button.id = project.getId();
  button.classList.add("btn-project");
  button.textContent = project.getName();

  list.appendChild(button);
  projectList.appendChild(list);
}

export {
  initialSetup,
  createAddProject,
  createAddToDo,
  createInputProject,
  createProject,
  cancelInputProject,
  createInputToDo,
  validateInputToDo,
  cancelInputToDo,
};
