class DOMHandler {
  #isFormOpen = false;
  #activeKebab = null;

  static validationMessages = {
    projectName: "Invalid Name",
    date: "Invalid Date",
    title: "Invalid Title",
    description: "Invalid Description",
  };

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

    this.isCreateProject = false;
    this.isEditProject = false;
    this.isCreateToDo = false;
    this.isEditToDo = false;
  }

  updateButtonStates(article = null) {
    console.log("updateButtonState()");
    console.log(`isCreateProject: ${this.isCreateProject}`);
    console.log(`isEditProject: ${this.isEditProject}`);
    console.log(`isCreateToDo: ${this.isCreateToDo}`);
    console.log(`isEditToDo: ${this.isEditToDo}`);
    const btnAddProject = document.getElementById("btn-add-project");
    const kebabProjects = document.querySelectorAll(".btn-kebab-menu-project");
    const btnAddToDo = document.getElementById("btn-add-todo");
    const todoPriority = document.querySelectorAll(".todo-priority");
    const todoCheckboxDone = document.querySelectorAll(".todo-done");
    const kebabToDos = document.querySelectorAll(".btn-kebab-menu");
    const trashToDos = document.querySelectorAll(".todo-btn-trash");

    // reset elements
    if (btnAddProject) {
      btnAddProject.disabled = false;
    }
    if (kebabProjects) {
      kebabProjects.forEach((btn) => (btn.disabled = false));
    }
    if (btnAddToDo) {
      btnAddToDo.disabled = false;
    }
    if (todoPriority) {
      todoPriority.forEach((element) => (element.disabled = false));
    }
    if (todoCheckboxDone) {
      todoCheckboxDone.forEach((checkbox) => {
        checkbox.disabled = false;
        checkbox.classList.remove("checkbox-disabled");
      });
    }
    if (kebabToDos) {
      kebabToDos.forEach((btn) => (btn.disabled = false));
    }
    if (trashToDos) {
      trashToDos.forEach((btn) => (btn.disabled = false));
    }
    // disable elements if project create form is open
    if (
      this.isCreateProject ||
      this.isEditProject ||
      this.isCreateToDo ||
      this.isEditToDo
    ) {
      console.log("isCreateProject");
      if (btnAddProject) {
        btnAddProject.disabled = true;
      }
      if (kebabProjects) {
        kebabProjects.forEach((btn) => (btn.disabled = true));
      }
      if (btnAddToDo) {
        btnAddToDo.disabled = true;
      }
      if (todoPriority) {
        todoPriority.forEach((element) => (element.disabled = true));
      }
      if (todoCheckboxDone) {
        todoCheckboxDone.forEach((checkbox) => {
          checkbox.disabled = true;
          checkbox.classList.add("checkbox-disabled");
        });
      }
      if (kebabToDos) {
        kebabToDos.forEach((btn) => (btn.disabled = true));
      }
      if (trashToDos) {
        trashToDos.forEach((btn) => (btn.disabled = true));
      }
    }

    if (article) {
      const priority = article.querySelector(".todo-priority");
      const checkboxDone = article.querySelector(".todo-done");
      priority.disabled = false;
      checkboxDone.disabled = false;
      checkboxDone.classList.remove("checkbox-disabled");
    }
  }

  renderProjectForm() {
    this.removeElement("li-add-project");

    const list = document.createElement("li");
    const input = document.createElement("input");
    const spanInvalid = document.createElement("span");
    const btnConfirm = document.createElement("button");
    const btnCancel = document.createElement("button");
    const iconConfirm = document.createElement("i");
    const iconCancel = document.createElement("i");

    list.id = "li-project-name";
    list.setAttribute("data-form", "create-project-container");
    input.id = "input-project-name";
    input.classList.add("input-project-name");
    input.type = "text";
    input.maxLength = "40";
    input.required = true;
    input.setAttribute("data-role", "input-create-project");
    spanInvalid.classList.add("create-project-span", "invalid");
    spanInvalid.setAttribute("data-role", "input-create-project-span");
    spanInvalid.textContent = DOMHandler.validationMessages.projectName;
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
    list.appendChild(spanInvalid);
    list.appendChild(btnConfirm);
    list.appendChild(btnCancel);

    this.projectList.appendChild(list);
  }

  cancelProjectForm() {
    const createProject = document.getElementById("li-project-name");
    if (createProject) {
      console.log("project form is open, remove it now");
      this.removeElement(createProject.id);
    }
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
    spanDate.classList.add("create-todo-date-span", "invalid");
    spanDate.textContent = DOMHandler.validationMessages.date;
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
    inputTitle.maxLength = "50";
    inputTitle.setAttribute("data-role", "create-todo-input-title");
    spanTitle.classList.add("create-todo-title-span", "invalid");
    spanTitle.textContent = DOMHandler.validationMessages.title;
    spanTitle.setAttribute("data-role", "create-todo-input-title-span");

    divDescription.classList.add("create-todo-description");
    labelDescription.htmlFor = "textarea-description";
    labelDescription.textContent = "Description";
    textareaDescription.id = "textarea-description";
    textareaDescription.classList.add("textarea-description");
    textareaDescription.rows = "3";
    textareaDescription.maxLength = "200";
    textareaDescription.required = true;
    textareaDescription.setAttribute(
      "data-role",
      "create-todo-input-description",
    );
    // spanDescription.id = "create-todo-description-span";
    spanDescription.classList.add("create-todo-description-span", "invalid");
    spanDescription.textContent = DOMHandler.validationMessages.description;
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

    const divKebab = this.createKebabMenu("todo");

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
  // i implemented html, next i have to update css and the layout,
  // after that, i have to add functionality
  renderEditToDo(article, todo) {
    article.classList.remove("card-todo", "card-todo-expanded");
    article.classList.add("card-todo-edit");
    article.setAttribute("data-form", "edit-todo-container");
    const trashButton = article.querySelector(".todo-btn-trash");
    const kebabMenu = article.querySelector(".todo-div-kebab");
    if (trashButton) {
      trashButton.remove();
    }
    if (kebabMenu) {
      kebabMenu.remove();
    }

    const pDate = article.querySelector(".todo-dueDate");
    const pTitle = article.querySelector(".todo-title");
    const pDescription = article.querySelector(".todo-description");

    const divDate = document.createElement("div");
    const inputDate = document.createElement("input");
    const spanDate = document.createElement("span");

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

    divDate.classList.add("edit-todo-div-date");
    inputDate.classList.add("edit-input-dueDate");
    inputDate.name = "input-dueDate-edit";
    inputDate.setAttribute("data-role", "edit-todo-input-date");
    inputDate.required = true;
    spanDate.classList.add("edit-todo-date-span", "invalid");
    spanDate.textContent = DOMHandler.validationMessages.date;
    spanDate.setAttribute("data-role", "edit-todo-input-date-span");

    divTitle.classList.add("edit-div-title");
    labelTitle.htmlFor = `${article.id}-input-title-edit`;
    labelTitle.textContent = "Title";
    inputTitle.id = `${article.id}-input-title-edit`;
    inputTitle.classList.add("input-title-edit");
    inputTitle.setAttribute("data-role", "edit-todo-input-title");
    inputTitle.required = true;
    spanTitle.classList.add("edit-todo-title-span", "invalid");
    spanTitle.textContent = DOMHandler.validationMessages.title;
    spanTitle.setAttribute("data-role", "edit-todo-input-title-span");

    divDescription.classList.add("edit-div-description");
    labelDescription.htmlFor = `${article.id}-textarea-description-edit`;
    labelDescription.textContent = "Description";
    textareaDescription.id = `${article.id}-textarea-description-edit`;
    textareaDescription.classList.add("textarea-edit-todo");
    textareaDescription.setAttribute(
      "data-role",
      "edit-todo-input-description",
    );
    textareaDescription.required = true;
    spanDescription.classList.add("edit-todo-description-span", "invalid");
    spanDescription.textContent = DOMHandler.validationMessages.description;
    spanDescription.setAttribute(
      "data-role",
      "edit-todo-input-description-span",
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

    divDate.appendChild(inputDate);
    divDate.appendChild(spanDate);

    divTitle.appendChild(labelTitle);
    divTitle.appendChild(inputTitle);
    divTitle.appendChild(spanTitle);

    divDescription.appendChild(labelDescription);
    divDescription.appendChild(textareaDescription);
    divDescription.appendChild(spanDescription);

    // pDate.replaceWith(inputDate);
    pDate.replaceWith(divDate);
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

  renderProject(project, nextSibling = null) {
    this.removeElement("li-project-name");
    const projectId = project.id;
    const projects = this.projectManager.getProjects();
    const checkForProject = projects.find(
      (project) => project.id === projectId,
    );
    if (checkForProject) {
      this.removeElement(checkForProject.id);
    }

    const defaultProjectId = this.projectManager.getDefaultProject().getId();
    const list = document.createElement("li");
    const buttonProject = document.createElement("button");
    const divKebab = this.createKebabMenu("project");

    list.id = project.getId();
    list.classList.add("li-project");
    buttonProject.classList.add("btn-project");
    buttonProject.setAttribute("data-role", "btn-project");
    buttonProject.textContent = project.getName();

    list.appendChild(buttonProject);
    list.appendChild(divKebab);
    // if next sibling, then the call comes from edit mode and project must be
    // inserted where it was
    if (nextSibling) {
      this.projectList.insertBefore(list, nextSibling);
      // project is new, append to the end of container
    } else {
      this.projectList.appendChild(list);
    }

    if (projectId === defaultProjectId) {
      divKebab.classList.add("kebab-disabled");
    }
  }

  renderEditProject(list) {
    console.log("renderEditProject()");
    const btnProject = list.querySelector(".btn-project");
    const divKebab = list.querySelector(".project-div-kebab");
    const input = document.createElement("input");
    const btnConfirm = document.createElement("button");
    const iconConfirm = document.createElement("i");
    const btnCancel = document.createElement("button");
    const iconCancel = document.createElement("i");
    const spanInvalid = document.createElement("span");

    list.classList.add("li-project-edit");
    list.setAttribute("data-form", "edit-project-container");
    input.id = `${list.id}-input`;
    input.classList.add("input-project-edit");
    input.setAttribute("data-role", "input-edit-project");
    input.value = btnProject.textContent;
    input.required = true;
    btnConfirm.classList.add("btn-confirm-project-edit");
    btnConfirm.setAttribute("data-role", "btn-confirm-edit-project");
    btnCancel.classList.add("btn-cancel-project-edit");
    btnCancel.setAttribute("data-role", "btn-cancel-edit-project");
    iconConfirm.classList.add("fas", "fa-check", "fa-lg");
    iconCancel.classList.add("fas", "fa-times", "fa-lg");
    spanInvalid.textContent = DOMHandler.validationMessages.projectName;
    spanInvalid.classList.add("edit-project-span", "invalid");
    spanInvalid.setAttribute("data-role", "input-edit-project-span");

    btnProject.replaceWith(input);
    btnConfirm.appendChild(iconConfirm);
    btnCancel.appendChild(iconCancel);
    list.insertBefore(btnConfirm, divKebab);
    list.insertBefore(btnCancel, divKebab);
    list.appendChild(spanInvalid);
  }

  createKebabMenu(context) {
    const divKebab = document.createElement("div");
    const btnKebab = document.createElement("button");
    const iconKebab = document.createElement("i");
    const ulKebab = document.createElement("ul");
    const liKebabEdit = document.createElement("li");
    //=======================0
    const liDivider = document.createElement("li");
    const hr = document.createElement("hr");
    hr.classList.add("dropdown-divider");
    liDivider.appendChild(hr);
    //===========================
    const liKebabDelete = document.createElement("li");
    const btnKebabEdit = document.createElement("button");
    const btnKebabDelete = document.createElement("button");
    if (context === "todo") {
      divKebab.classList.add("todo-div-kebab");
      btnKebab.classList.add("btn-kebab-menu");
      btnKebab.dataset.role = "btn-kebab-menu";
      ulKebab.classList.add("kebab-menu-list", "is-hidden");
      btnKebabEdit.classList.add("btn-kebab-edit");
      btnKebabEdit.setAttribute("data-role", "btn-kebab-edit");
      btnKebabDelete.classList.add("btn-kebab-delete");
      btnKebabDelete.setAttribute("data-role", "btn-kebab-delete");
    } else if (context === "project") {
      divKebab.classList.add("project-div-kebab");
      btnKebab.classList.add("btn-kebab-menu-project");
      btnKebab.dataset.role = "btn-kebab-menu-project";
      ulKebab.classList.add("kebab-menu-list-project", "is-hidden");
      btnKebabEdit.classList.add("btn-kebab-edit-project");
      btnKebabEdit.setAttribute("data-role", "btn-kebab-menu-project-edit");
      btnKebabDelete.classList.add("btn-kebab-delete-project");
      btnKebabDelete.setAttribute("data-role", "btn-kebab-menu-project-delete");
    }
    iconKebab.classList.add("fas", "fa-ellipsis-v");
    btnKebabEdit.textContent = "Edit";
    btnKebabDelete.textContent = "Delete";

    liKebabEdit.appendChild(btnKebabEdit);
    liKebabDelete.appendChild(btnKebabDelete);
    ulKebab.appendChild(liKebabEdit);
    //================0
    ulKebab.appendChild(liDivider);
    //==================
    ulKebab.appendChild(liKebabDelete);
    btnKebab.appendChild(iconKebab);
    divKebab.appendChild(btnKebab);
    divKebab.appendChild(ulKebab);

    return divKebab;
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
    console.log(ulKebab);
    console.log(this.#activeKebab === ulKebab);
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
    const isKebabButton = target.closest(".btn-kebab-menu-project");
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
        errors: {
          name: !checkName.result,
        },
      };
    } else if (role === "edit-project-container") {
      name = parent.querySelector(".input-project-edit");
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
        errors: {
          name: !checkName.result,
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
    const role = element.dataset.role;
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
      case "input-edit-project":
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

  showFormErrorsOnSubmit(element, validationForm) {
    console.log("showFormErrorsOnSubmit()");
    let dataForm = element.dataset.form;
    let spanInvalidDate;
    let spanInvalidTitle;
    let spanInvalidDescription;
    let spanInvalidProjectName;
    let spanInvalidProjectNameEdit;
    // check if article is the window for todo creation
    if (dataForm === "create-todo-container") {
      spanInvalidDate = element.querySelector(".create-todo-date-span");
      spanInvalidTitle = element.querySelector(".create-todo-title-span");
      spanInvalidDescription = element.querySelector(
        ".create-todo-description-span",
      );
    } else if (dataForm === "edit-todo-container") {
      spanInvalidDate = element.querySelector(".edit-todo-date-span");
      spanInvalidTitle = element.querySelector(".edit-todo-title-span");
      spanInvalidDescription = element.querySelector(
        ".edit-todo-description-span",
      );
    } else if (dataForm === "create-project-container") {
      spanInvalidProjectName = element.querySelector(".create-project-span");

      spanInvalidProjectName.classList.remove("is-visible");
      if (validationForm.errors.name) {
        spanInvalidProjectName.classList.add("is-visible");
      }

      return;
    } else if (dataForm === "edit-project-container") {
      spanInvalidProjectNameEdit = element.querySelector(".edit-project-span");

      spanInvalidProjectNameEdit.classList.remove("is-visible");
      if (validationForm.errors.name) {
        spanInvalidProjectNameEdit.classList.add("is-visible");
      }
      return;
    }

    // safety guard, if something is missing
    if (
      !validationForm.errors ||
      !spanInvalidDate ||
      !spanInvalidTitle ||
      !spanInvalidDescription
    )
      return;

    spanInvalidDate.classList.remove("is-visible");
    spanInvalidTitle.classList.remove("is-visible");
    spanInvalidDescription.classList.remove("is-visible");

    if (validationForm.errors.date) {
      spanInvalidDate.classList.add("is-visible");
    }
    if (validationForm.errors.title) {
      spanInvalidTitle.classList.add("is-visible");
    }
    if (validationForm.errors.description) {
      spanInvalidDescription.classList.add("is-visible");
    }
  }

  showFieldErrorOnBlur(article, inputElement, inputValidation) {
    console.log("showFieldErrorOnBlur()");
    const role = `${inputElement.dataset.role}-span`;
    const span = article.querySelector(`[data-role="${role}"]`);
    if (span) {
      span.classList.remove("is-visible");
      if (!inputValidation.result) {
        span.classList.add("is-visible");
      }
    }
  }

  hideSpanValidationError(element, role) {
    console.log("hideSpanValidationError");
    let spanInvalid = element.querySelector(`[data-role="${role}-span"]`);
    if (spanInvalid) {
      spanInvalid.classList.remove("is-visible");
    }
  }

  scrollFormIntoView(idForm) {
    setTimeout(() => {
      const form = document.getElementById(idForm);
      if (form) {
        form.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 50);
  }
}

export { DOMHandler };
