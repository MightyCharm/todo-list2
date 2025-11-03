class DOMHandler {
  #isFormOpen = false;

  constructor(projectList, containerToDos, projectManager) {
    this.projectList = projectList;
    this.containerToDos = containerToDos;
    this.projectManager = projectManager;
  }

  initialSetup() {
    this.renderProject();
  }

  renderAddProjectButton() {
    this.removeElement("li-project-name");

    const list = document.createElement("li");
    const button = document.createElement("button");
    const icon = document.createElement("i");

    list.id = "li-add-project";
    list.classList.add("li-project");
    button.id = "btn-add-project";
    button.classList.add("btn-add-project");
    button.setAttribute("data-role", "btn-add-project");
    icon.classList.add("fas", "fa-plus-circle");

    button.textContent = "NEW";

    button.appendChild(icon);
    list.appendChild(button);
    this.projectList.appendChild(list);
  }

  renderProjectForm() {
    this.removeElement("li-add-project");

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

    btnConfirm.setAttribute("data-role", "btn-confirm-project");
    btnCancel.setAttribute("data-role", "btn-cancel-project");

    btnConfirm.appendChild(iconConfirm);
    btnCancel.appendChild(iconCancel);
    list.appendChild(input);
    list.appendChild(btnConfirm);
    list.appendChild(btnCancel);

    this.projectList.appendChild(list);
  }

  cancelProjectForm() {
    this.removeElement("li-project-name");
    this.renderAddProjectButton();
  }

  renderToDoForm() {
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

    buttonConfirm.setAttribute("data-role", "btn-confirm-todo");

    buttonCancel.id = "btn-cancel-todo";
    buttonCancel.classList.add("btn-cancel-todo");

    buttonCancel.setAttribute("data-role", "btn-cancel-todo");

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

    this.containerToDos.appendChild(article);
  }

  cancelToDoForm() {
    this.removeElement("card-create-todo");
  }

  validationInputProject() {
    const name = document.getElementById("input-project-name");
    const inputName = name.value.trim();
    if (inputName.length > 0) {
      return {
        check: true,
        name: inputName,
      };
    }
    console.log("Input Form Project is missing something.");
    return { check: false, name: null };
  }

  validateInputToDo() {
    const date = document.getElementById("create-todo-date");
    const priority = document.getElementById("create-todo-priority");
    const title = document.getElementById("input-title");
    const description = document.getElementById("textarea-description");

    const inputDate = date.value;
    const inputPriority = priority.value;
    const inputTitle = title.value.trim();
    const inputDescription = description.value.trim();

    // good values: create todo
    if (inputDate && inputTitle.length > 0 && inputDescription.length > 0) {
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

  createProject() {
    this.renderProject();
  }

  renderProject() {
    this.removeElement("li-project-name");
    const project = this.projectManager.getActiveProject();
    const projectId = project.getId();
    const defaultProjectId = this.projectManager.getDefaultProject().getId();

    const list = document.createElement("li");
    const buttonProject = document.createElement("button");
    const buttonTrash = document.createElement("button");
    const icon = document.createElement("i");

    list.id = project.getId();
    list.classList.add("li-project");
    buttonProject.classList.add("btn-project");
    buttonProject.setAttribute("data-role", "btn-project");
    buttonProject.textContent = project.getName();

    buttonTrash.classList.add("btn-project-trash");
    buttonTrash.setAttribute("data-role", "btn-trash-project");
    icon.classList.add("fas", "fa-trash");

    buttonTrash.appendChild(icon);

    list.appendChild(buttonProject);
    list.appendChild(buttonTrash);
    this.projectList.appendChild(list);

    if (projectId === defaultProjectId) {
      buttonTrash.disabled = true;
    }
  }

  renderToDo(idToDo) {
    this.removeElement("card-create-todo");
    const project = this.projectManager.getActiveProject();
    const todo = project.getToDo(idToDo);

    const article = document.createElement("article");
    const pDueDate = document.createElement("p");
    const pTitle = document.createElement("p");
    const checkDone = document.createElement("input");
    const divKebab = document.createElement("div");
    const btnKebab = document.createElement("button");
    const iconKebab = document.createElement("i");
    const ulKebab = document.createElement("ul");
    const selectPriority = document.createElement("select");
    const optionLow = document.createElement("option");
    const optionNormal = document.createElement("option");
    const optionHigh = document.createElement("option");
    const pDescription = document.createElement("p");
    const btnTrash = document.createElement("button");
    const iconTrash = document.createElement("i");

    article.id = todo.id;
    article.classList.add("card", "card-todo");
    article.setAttribute("data-role", "expand-todo");

    pDueDate.classList.add("todo-dueDate");
    pDueDate.setAttribute("data-role", "expand-todo");
    pDueDate.textContent = `Due: ${todo.dueDate}`;

    pTitle.classList.add("todo-title");
    pTitle.setAttribute("data-role", "expand-todo");
    pTitle.textContent = todo.title;

    checkDone.id = `checkbox-done-${todo.id}`;
    checkDone.classList.add("todo-done");
    checkDone.setAttribute("data-role", "checkbox-todo");
    checkDone.type = "checkbox";
    checkDone.name = "done";
    checkDone.value = "done";

    divKebab.classList.add("todo-div-kebab");
    btnKebab.classList.add("btn-kebab-menu");
    btnKebab.dataset.role = "btn-kebab-menu";
    iconKebab.classList.add("fas", "fa-ellipsis-v");
    ulKebab.id = "kebab-menu-list";
    ulKebab.classList.add("kebab-menu-list", "is-hidden");

    selectPriority.id = `select-priority-${todo.id}`;
    selectPriority.classList.add("todo-priority");
    selectPriority.name = "priority";
    selectPriority.setAttribute("data-role", "select-priority");
    optionLow.value = "low";
    optionLow.textContent = "LOW";
    optionNormal.value = "normal";
    optionNormal.textContent = "NORMAL";
    optionHigh.value = "high";
    optionHigh.textContent = "HIGH";

    pDescription.classList.add("todo-description", "is-hidden");
    pDescription.textContent = todo.description;

    btnTrash.classList.add("todo-btn-trash");
    btnTrash.setAttribute("data-role", "btn-trash-todo");
    iconTrash.classList.add("fas", "fa-trash");

    selectPriority.appendChild(optionLow);
    selectPriority.appendChild(optionNormal);
    selectPriority.appendChild(optionHigh);
    btnKebab.appendChild(iconKebab);
    divKebab.appendChild(btnKebab);
    divKebab.appendChild(ulKebab);
    btnTrash.appendChild(iconTrash);

    article.appendChild(pDueDate);
    article.appendChild(selectPriority);
    article.appendChild(checkDone);
    article.appendChild(divKebab);
    article.appendChild(pTitle);
    article.appendChild(pDescription);
    article.appendChild(btnTrash);

    selectPriority.value = todo.getPriority();

    this.containerToDos.appendChild(article);
  }

  renderActiveProjectToDos() {
    const project = this.projectManager.getActiveProject();
    const activeProjectTodos = project.getToDos();
    activeProjectTodos.forEach((todo) => {
      const id = todo.getId();
      this.renderToDo(id);
    });
  }

  removeToDos() {
    this.containerToDos.innerHTML = "";
  }

  removeElement(id) {
    const element = document.getElementById(id);
    if (element) {
      element.remove();
    }
  }

  getIsFormOpen() {
    return this.#isFormOpen;
  }

  setIsFormOpen() {
    this.#isFormOpen = !this.#isFormOpen;
  }

  highlightActiveProject() {
    const allButtonsProject = document.querySelectorAll(".btn-project");
    allButtonsProject.forEach((btn) => {
      btn.classList.remove("activeProject");
    });
    const id = this.projectManager.getActiveProject().getId();
    const list = document.getElementById(id);
    const buttonProject = list.querySelector("button[data-role='btn-project']");
    buttonProject.classList.add("activeProject");
  }

  toggleHideDisplay(element) {
    element.classList.toggle("is-hidden");
  }

  toggleToDoLayout(article) {
    article.classList.toggle("card-todo");
    article.classList.toggle("card-todo-expanded");
  }
}

export { DOMHandler };
