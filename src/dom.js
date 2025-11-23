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
    list.setAttribute("data-form", "create-project-container");
    input.id = "input-project-name";
    input.type = "text";
    input.maxLength = "40";
    input.required = true;
    input.setAttribute("data-role", "input-create-project");
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

    const divDate = document.createElement("div");
    const inputDate = document.createElement("input");
    const spanDate = document.createElement("span");

    const selectPriority = document.createElement("select");
    const optionLow = document.createElement("option");
    const optionNormal = document.createElement("option");
    const optionHigh = document.createElement("option");

    const divTitle = document.createElement("div");
    const labelTitle = document.createElement("label");
    const inputTitle = document.createElement("input");
    const spanTitle = document.createElement("span");

    const divDescription = document.createElement("div");
    const labelDescription = document.createElement("label");
    const textareaDescription = document.createElement("textarea");
    const spanDescription = document.createElement("span");

    const divButtons = document.createElement("div");
    const buttonConfirm = document.createElement("button");
    const buttonCancel = document.createElement("button");
    const iconConfirm = document.createElement("i");
    const iconCancel = document.createElement("i");

    article.id = "card-create-todo";
    article.classList.add("card");
    article.classList.add("card-create-todo");
    article.setAttribute("data-form", "create-todo-container");

    divDate.classList.add("create-todo-div-date");
    inputDate.id = "create-todo-date";
    inputDate.classList.add("create-todo-date");
    inputDate.type = "date";
    inputDate.required = true;
    inputDate.setAttribute("data-role", "create-todo-input-date");
    spanDate.id = "create-todo-date-span";
    spanDate.classList.add("create-todo-date-span", "invalid");
    spanDate.textContent = "Invalid";
    spanDate.setAttribute("data-role", "create-todo-input-date-span");

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
    inputTitle.required = true;
    inputTitle.setAttribute("data-role", "create-todo-input-title");
    spanTitle.id = "create-todo-title-span";
    spanTitle.classList.add("create-todo-title-span", "invalid");
    spanTitle.textContent = "Invalid";
    spanTitle.setAttribute("data-role", "create-todo-input-title-span");

    divDescription.classList.add("create-todo-description");
    labelDescription.htmlFor = "textarea-description";
    labelDescription.textContent = "Description";
    textareaDescription.id = "textarea-description";
    textareaDescription.classList.add("textarea-description");
    textareaDescription.rows = "3";
    textareaDescription.maxLength = "100";
    textareaDescription.required = true;
    textareaDescription.setAttribute(
      "data-role",
      "create-todo-input-description",
    );
    spanDescription.id = "create-todo-description-span";
    spanDescription.classList.add("create-todo-description-span", "invalid");
    spanDescription.textContent = "Invalid";
    spanDescription.setAttribute(
      "data-role",
      "create-todo-input-description-span",
    );

    divButtons.classList.add("create-todo-buttons");
    buttonConfirm.classList.add("btn-confirm-create-todo");
    buttonConfirm.setAttribute("data-role", "btn-confirm-create-todo");
    buttonCancel.classList.add("btn-cancel-create-todo");
    buttonCancel.setAttribute("data-role", "btn-cancel-create-todo");
    iconConfirm.classList.add("fas", "fa-check", "fa-lg");
    iconCancel.classList.add("fas", "fa-times", "fa-lg");

    divDate.appendChild(inputDate);
    divDate.appendChild(spanDate);

    selectPriority.appendChild(optionLow);
    selectPriority.appendChild(optionNormal);
    selectPriority.appendChild(optionHigh);

    divTitle.appendChild(labelTitle);
    divTitle.appendChild(inputTitle);
    divTitle.appendChild(spanTitle);

    divDescription.appendChild(labelDescription);
    divDescription.appendChild(textareaDescription);
    divDescription.appendChild(spanDescription);

    buttonConfirm.appendChild(iconConfirm);
    buttonCancel.appendChild(iconCancel);
    divButtons.appendChild(buttonConfirm);
    divButtons.appendChild(buttonCancel);
    article.appendChild(divDate);
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

  renderEditToDo(article, todo) {
    article.classList.remove("card-todo", "card-todo-expanded");
    article.classList.add("card-todo-editing");
    article.setAttribute("data-form", "edit-todo-container");
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
    inputDate.setAttribute("data-role", "edit-todo-input-date");
    divTitle.classList.add("edit-div-title");
    labelTitle.htmlFor = `${article.id}-input-title-edit`;
    labelTitle.textContent = "Title";
    inputTitle.id = `${article.id}-input-title-edit`;
    inputTitle.classList.add("input-title-edit");
    inputTitle.setAttribute("data-role", "edit-todo-input-title");

    divDescription.classList.add("edit-div-description");
    labelDescription.htmlFor = `${article.id}-textarea-description-edit`;
    labelDescription.textContent = "Description";
    textareaDescription.id = `${article.id}-textarea-description-edit`;
    textareaDescription.classList.add("textarea-edit-todo");
    textareaDescription.setAttribute(
      "data-role",
      "edit-todo-input-description",
    );

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

    this.updateLineThrough(pTitle, todo.done);
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

  // can be called from normal mode or edit mode, in edit mode there is no title p element, instead input element
  updateLineThrough(title, isChecked) {
    if (!title) return;
    if (isChecked) {
      title.classList.add("checked");
      return;
    }
    title.classList.remove("checked");
  }

  validateForms(parent) {
    console.log("validateForms()");
    const role = parent.dataset.form;
    let name;
    let date;
    let priority;
    let checkboxDone;
    let title;
    let description;

    if (role === "create-todo-container") {
      date = parent.querySelector("#create-todo-date");
      priority = parent.querySelector("#create-todo-priority");
      title = parent.querySelector("#input-title");
      description = parent.querySelector("#textarea-description");
    } else if (role === "edit-todo-container") {
      date = parent.querySelector(".edit-input-dueDate");
      priority = parent.querySelector(".todo-priority");
      checkboxDone = parent.querySelector(".todo-done");
      title = parent.querySelector(".input-title-edit");
      description = parent.querySelector(".textarea-edit-todo");
    } else if (role === "create-project-container") {
      name = parent.querySelector("#input-project-name");
      const checkName = this.validateInput(name);
      if (checkName.result) {
        return {
          check: true,
          inputs: {
            name: checkName.value,
          },
        };
      }
      return {
        check: false,
        inputs: {
          name: checkName.value,
        },
      };
    }
    const checkDate = this.validateInput(date);
    const priorityValue = priority.value;
    const doneValue = checkboxDone?.checked || false;
    const checkTitle = this.validateInput(title);
    const checkDescription = this.validateInput(description);

    if (checkDate.result && checkTitle.result && checkDescription.result) {
      return {
        check: true,
        inputs: {
          title: checkTitle.value,
          description: checkDescription.value,
          dueDate: checkDate.value,
          priority: priorityValue,
          done: doneValue,
        },
      };
    }
    console.log("Input is missing something, do nothing for now");
    return {
      check: false,
      errors: {
        date: !checkDate.result,
        title: !checkTitle.result,
        description: !checkDescription.result,
      },
    };
  }

  validateInput(element) {
    console.log("validateInput()");
    console.log(element);
    const role = element.dataset.role;
    console.log(role);
    let input;
    let obj = { result: "", value: "" };
    switch (role) {
      case "input-add-project":
        input = element.value.trim();
        obj.result = input === "" ? false : true;
        obj.value = input;
        break;
      case "create-todo-input-date":
      case "edit-todo-input-date":
        input = element.value;
        obj.result = input === "" ? false : true;
        obj.value = input;
        break;
      case "create-todo-input-title":
      case "edit-todo-input-title":
        input = element.value.trim();
        obj.result = input === "" ? false : true;
        obj.value = input;
        break;
      case "create-todo-input-description":
      case "edit-todo-input-description":
        input = element.value.trim();
        obj.result = input === "" ? false : true;
        obj.value = input;
        break;
      case "input-create-project":
        input = element.value.trim();
        obj.result = input === "" ? false : true;
        obj.value = input;
        break;
      default:
        console.log("Something went wrong. validateInput() (dom.js)");
        break;
    }
    return obj;
  }

  // show and hide span error elements if button confirm is clicked
  showValidationErrors(article, validationCreateToDoForm) {
    console.log("showValidationErrors()");
    // check if article is the window for todo creation
    if (article.id === "card-create-todo") {
      const spanInvalidDate = article.querySelector(".create-todo-date-span");
      const spanInvalidTitle = article.querySelector(".create-todo-title-span");
      const spanInvalidDescription = article.querySelector(
        ".create-todo-description-span",
      );

      // safety guard, if something is missing
      if (
        !validationCreateToDoForm.errors ||
        !spanInvalidDate ||
        !spanInvalidTitle ||
        !spanInvalidDescription
      )
        return;

      spanInvalidDate.classList.remove("is-visible");
      spanInvalidTitle.classList.remove("is-visible");
      spanInvalidDescription.classList.remove("is-visible");

      if (validationCreateToDoForm.errors.date) {
        spanInvalidDate.classList.add("is-visible");
      }
      if (validationCreateToDoForm.errors.title) {
        spanInvalidTitle.classList.add("is-visible");
      }
      if (validationCreateToDoForm.errors.description) {
        spanInvalidDescription.classList.add("is-visible");
      }
    }
  }

  // hides span error element of user enter something into input field
  hideSpanValidationError(article, role) {
    console.log("hideSpanValidationError");
    let spanInvalid = article.querySelector(`[data-role="${role}-span"]`);
    spanInvalid.classList.remove("is-visible");
  }
}

export { DOMHandler };
