class DOMHandler {
  #isFormOpen = false;
  #activeKebab = null;

  constructor(
    projectList,
    containerProjectBtn,
    containerToDos,
    projectManager,
  ) {
    this.projectList = projectList;
    this.containerProjectBtn = containerProjectBtn;
    this.containerToDos = containerToDos;
    this.projectManager = projectManager;
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
    input.maxLength = "40";
    input.required = true;
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
  }

  renderToDoForm() {
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

    article.id = "card-create-todo";
    article.classList.add("card");
    article.classList.add("card-create-todo");

    inputDate.id = "create-todo-date";
    inputDate.classList.add("create-todo-date");
    inputDate.type = "date";
    inputDate.required = true;

    selectPriority.id = "create-todo-priority";
    selectPriority.classList.add("create-todo-priority");
    selectPriority.name = "create-todo-priority";
    optionLow.value = "low";
    optionLow.textContent = "Low";
    optionNormal.value = "normal";
    optionNormal.textContent = "Normal";
    optionHigh.value = "high";
    optionHigh.textContent = "High";

    checkboxDone.id = "edit-todo-checkbox";
    checkboxDone.type = "checkbox";
    checkboxDone.classList.add("edit-todo-checkbox");
    checkboxDone.setAttribute("data-role", "checkbox-edit-todo");

    divTitle.classList.add("create-todo-title");
    labelTitle.htmlFor = "input-title";
    labelTitle.textContent = "Title";
    inputTitle.id = "input-title";
    inputTitle.classList.add("input-title");
    inputTitle.type = "text";
    inputTitle.required = true;

    divDescription.classList.add("create-todo-description");
    labelDescription.htmlFor = "textarea-description";
    labelDescription.textContent = "Description";
    textareaDescription.id = "textarea-description";
    textareaDescription.classList.add("textarea-description");
    textareaDescription.rows = "3";
    textareaDescription.maxLength = "100";
    textareaDescription.required = true;

    divButtons.classList.add("create-todo-buttons");
    buttonConfirm.classList.add("btn-confirm-create-todo");
    buttonConfirm.setAttribute("data-role", "btn-confirm-create-todo");
    buttonCancel.classList.add("btn-cancel-create-todo");
    buttonCancel.setAttribute("data-role", "btn-cancel-create-todo");
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
    selectPriority.value = "normal";
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
    const done = document.getElementById("edit-todo-checkbox");
    const title = document.getElementById("input-title");
    const description = document.getElementById("textarea-description");

    const inputDate = date.value;
    const inputPriority = priority.value;
    const inputDone = done?.checked || false;
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
          done: inputDone,
        },
      };
    }
    console.log("Input is missing something, do nothing for now");
    return { check: false };
  }

  validateInputEditToDo(article) {
    const date = article.querySelector(".edit-input-dueDate");
    const priority = article.querySelector(".todo-priority");
    const checkboxDone = article.querySelector(".todo-done");
    const title = article.querySelector(".input-title-edit");
    const description = article.querySelector(".textarea-edit-todo");

    const inputDate = date.value;
    const inputPriority = priority.value;
    const inputCheckboxDone = checkboxDone?.checked || false;
    const inputTitle = title.value.trim();
    const inputDescription = description.value.trim();

    console.log(
      `dueDate:${inputDate} priority:${inputPriority} done:${inputCheckboxDone} title:${inputTitle} description:${inputDescription}`,
    );
    // good values: create todo
    if (inputDate && inputTitle.length > 0 && inputDescription.length > 0) {
      return {
        check: true,
        inputs: {
          title: inputTitle,
          description: inputDescription,
          dueDate: inputDate,
          priority: inputPriority,
          done: inputCheckboxDone,
        },
      };
    }
    console.log("Input is missing something, do nothing for now");
    return { check: false };
  }

  renderEditToDo(article, todo) {
    article.classList.remove("card-todo", "card-todo-expanded");
    article.classList.add("card-todo-editing");
    const trashButton = article.querySelector(".todo-btn-trash");
    trashButton.remove();

    const pDate = article.querySelector(".todo-dueDate");
    const pTitle = article.querySelector(".todo-title");
    const pDescription = article.querySelector(".todo-description");

    const inputDate = document.createElement("input");
    inputDate.required = true;

    const divTitle = document.createElement("div");
    const labelTitle = document.createElement("label");
    const inputTitle = document.createElement("input");
    inputTitle.required = true;

    const divDescription = document.createElement("div");
    const labelDescription = document.createElement("label");
    const textareaDescription = document.createElement("textarea");
    textareaDescription.required = true;

    const divButtons = document.createElement("div");
    const buttonConfirm = document.createElement("button");
    const buttonCancel = document.createElement("button");
    const iconConfirm = document.createElement("i");
    const iconCancel = document.createElement("i");

    inputDate.classList.add("edit-input-dueDate");
    inputDate.name = "input-dueDate-edit";

    divTitle.classList.add("edit-div-title");
    labelTitle.htmlFor = `${article.id}-input-title-edit`;
    labelTitle.textContent = "Title";
    inputTitle.id = `${article.id}-input-title-edit`;
    inputTitle.classList.add("input-title-edit");

    divDescription.classList.add("edit-div-description");
    labelDescription.htmlFor = `${article.id}-textarea-description-edit`;
    labelDescription.textContent = "Description";
    textareaDescription.id = `${article.id}-textarea-description-edit`;
    textareaDescription.classList.add("textarea-edit-todo");

    inputDate.type = "date";
    inputTitle.type = "text";

    divButtons.classList.add("todo-div-edit-btns");
    buttonConfirm.classList.add("btn-confirm-edit-todo");
    buttonConfirm.setAttribute("data-role", "btn-confirm-edit-todo");
    buttonCancel.classList.add("btn-cancel-edit-todo");
    buttonCancel.setAttribute("data-role", "btn-cancel-edit-todo");
    iconConfirm.classList.add("fas", "fa-check", "fa-lg");
    iconCancel.classList.add("fas", "fa-times", "fa-lg");

    inputDate.value = todo.getDueDate();
    inputTitle.value = todo.getTitle();
    textareaDescription.value = todo.getDescription();

    divTitle.appendChild(labelTitle);
    divTitle.appendChild(inputTitle);

    divDescription.appendChild(labelDescription);
    divDescription.appendChild(textareaDescription);

    pDate.replaceWith(inputDate);
    pTitle.replaceWith(divTitle);
    pDescription.replaceWith(divDescription);

    buttonConfirm.appendChild(iconConfirm);
    buttonCancel.appendChild(iconCancel);
    divButtons.appendChild(buttonConfirm);
    divButtons.appendChild(buttonCancel);

    article.appendChild(divButtons);
  }

  createProject(activeProject) {
    this.renderProject(activeProject);
  }

  renderAllProjects(projects) {
    projects.forEach((project) => {
      this.renderProject(project);
    });
  }

  renderProject(project) {
    this.removeElement("li-project-name");
    // const project = this.projectManager.getActiveProject();
    const projectId = project.id;
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

  renderToDo(idToDo, nextSibling = null) {
    console.log("renderToDo");
    if (!nextSibling) {
      this.removeElement("card-create-todo");
    }

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
    const liKebabEdit = document.createElement("li");
    const liKebabDelete = document.createElement("li");
    const btnKebabEdit = document.createElement("button");
    const btnKebabDelete = document.createElement("button");

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
    checkDone.checked = todo.done;

    divKebab.classList.add("todo-div-kebab");
    btnKebab.classList.add("btn-kebab-menu");
    btnKebab.dataset.role = "btn-kebab-menu";
    iconKebab.classList.add("fas", "fa-ellipsis-v");
    ulKebab.classList.add("kebab-menu-list", "is-hidden");
    btnKebabEdit.classList.add("btn-kebab-edit");
    btnKebabEdit.setAttribute("data-role", "btn-kebab-edit");
    btnKebabEdit.textContent = "Edit";
    btnKebabDelete.classList.add("btn-kebab-delete");
    btnKebabDelete.textContent = "Delete";
    btnKebabDelete.setAttribute("data-role", "btn-kebab-delete");

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

    liKebabEdit.appendChild(btnKebabEdit);
    liKebabDelete.appendChild(btnKebabDelete);
    ulKebab.appendChild(liKebabEdit);
    ulKebab.appendChild(liKebabDelete);
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

    //====================
    this.updateLineThrough(pTitle, todo.done);
    //====================

    this.containerToDos.insertBefore(article, nextSibling);
  }

  renderActiveProjectToDos() {
    console.log("renderActiveProjectToDos()");
    const project = this.projectManager.getActiveProject();
    console.log(project);
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

  setIsFormOpen(state) {
    this.#isFormOpen = state;
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

  handleKebabClick(ulKebab) {
    if (this.#activeKebab === ulKebab) {
      this.toggleHideDisplay(this.#activeKebab);
      this.#activeKebab = null;
      return;
    }
    if (this.#activeKebab) {
      this.toggleHideDisplay(this.#activeKebab);
    }

    this.#activeKebab = ulKebab;
    this.toggleHideDisplay(this.#activeKebab);
  }

  handleOutsideClick(target) {
    const isKebabButton = target.closest(".btn-kebab-menu");
    const isInsideKebab = target.closest(".todo-div-kebab");
    if (isKebabButton || isInsideKebab) return;
    if (this.#activeKebab) {
      this.toggleHideDisplay(this.#activeKebab);
      this.#activeKebab = null;
    }
  }

  closeKebabMenu() {
    if (this.#activeKebab) {
      this.toggleHideDisplay(this.#activeKebab);
      this.#activeKebab = null;
    }
  }

  updateLineThrough(title, isChecked) {
    if (isChecked) {
      title.classList.add("checked");
      return;
    }
    title.classList.remove("checked");
  }
}

export { DOMHandler };
