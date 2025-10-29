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
    icon.classList.add("fas", "fa-plus-circle");

    button.textContent = "NEW";

    button.appendChild(icon);
    list.appendChild(button);
    this.projectList.appendChild(list);
  }

  renderAddToDoButton() {
    const button = document.createElement("button");
    const icon = document.createElement("i");

    button.id = "btn-add-todo";
    button.classList.add("btn-add-todo");
    icon.classList.add("fas", "fa-plus-circle");

    button.textContent = "New";

    button.appendChild(icon);
    this.containerToDos.appendChild(button);
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

    btnConfirm.appendChild(iconConfirm);
    btnCancel.appendChild(iconCancel);
    list.appendChild(input);
    list.appendChild(btnConfirm);
    list.appendChild(btnCancel);

    this.projectList.appendChild(list);
  }

  renderToDoForm() {
    this.removeElement("btn-add-todo");

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

    this.containerToDos.appendChild(article);
  }

  renderToDo(idToDo) {
    this.removeElement("card-create-todo");
    console.log("-----> idToDo" + idToDo)
    const project = this.projectManager.getActiveProject();
    console.log(project);
    const todo = project.getToDo(idToDo);
    console.log(todo);
    console.log(todo.id)

    const article = document.createElement("article");
    const pDueDate = document.createElement("p");
    const pTitle = document.createElement("p");
    const checkDone = document.createElement("input");
    const selectPriority = document.createElement("select");
    const optionLow = document.createElement("option");
    const optionNormal = document.createElement("option");
    const optionHigh = document.createElement("option");
    const pDescription = document.createElement("p");
    const btnTrash = document.createElement("button");
    const iconTrash = document.createElement("i");

    article.id = todo.id;
    article.classList.add("card", "card-todo");
    pDueDate.classList.add("todo-dueDate");
    pTitle.classList.add("todo-title");
    checkDone.id = `checkbox-done-${todo.id}`;
    checkDone.classList.add("todo-done");
    checkDone.type = "checkbox";
    checkDone.name = "done";
    checkDone.value = "done";
    selectPriority.id = `select-priority-${todo.id}`;
    selectPriority.classList.add("todo-priority");
    selectPriority.name = "priority";
    pDescription.classList.add("todo-description", "is-hidden");
    btnTrash.id = `btn-todo-trash-${todo.id}`;
    btnTrash.classList.add("btn-todo-trash");
    iconTrash.classList.add("fas", "fa-trash");

    pDueDate.textContent = `Due: ${todo.dueDate}`;
    pTitle.textContent = todo.title;
    optionLow.value = "low";
    optionLow.textContent = "LOW";
    optionNormal.value = "normal";
    optionNormal.textContent = "NORMAL";
    optionHigh.value = "high";
    optionHigh.textContent = "HIGH";
    pDescription.textContent = todo.description;

    selectPriority.appendChild(optionLow);
    selectPriority.appendChild(optionNormal);
    selectPriority.appendChild(optionHigh);
    btnTrash.appendChild(iconTrash);

    article.appendChild(pDueDate);
    article.appendChild(selectPriority);
    article.appendChild(checkDone);
    article.appendChild(pTitle);
    article.appendChild(pDescription);
    article.appendChild(btnTrash);

    this.containerToDos.appendChild(article);
  }

  cancelProjectForm() {
    this.removeElement("li-project-name");
    this.renderAddProjectButton();
  }

  cancelToDoForm() {
    this.removeElement("card-create-todo");
    this.renderAddToDoButton();
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

  createProject() {
    const userInput = document.getElementById("input-project-name").value;
    const cleanedInput = userInput.trim();
    if (cleanedInput.length > 0) {
      // create project
      this.projectManager.addProject(cleanedInput);
      this.renderProject();
    } else {
      console.log("Please enter valid Project Name");
    }
  }

  renderProject() {
    const project = this.projectManager.getActiveProject();
    this.removeElement("li-project-name");

    const list = document.createElement("li");
    const button = document.createElement("button");

    list.classList.add("li-project");
    button.id = project.getId();
    button.classList.add("btn-project");
    button.textContent = project.getName();

    list.appendChild(button);
    this.projectList.appendChild(list);
  }

  removeElement(id) {
    const element = document.getElementById(id);
    if (element) {
      element.remove();
      console.log(`element: ${element} was removed`);
    }
  }

  getIsFormOpen() {
    return this.#isFormOpen;
  }

  setIsFormOpen() {
    this.#isFormOpen = !this.#isFormOpen;
  }
}

export { DOMHandler };