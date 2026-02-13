import { ProjectManager, DEFAULT_PROJECT_ID } from "./project-manager.js";
import { DOMHandler } from "./dom.js";
import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { createSeedData } from "./seedData.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("main-container");
  const projectList = document.getElementById("project-list");
  const containerProjectBtn = document.getElementById(
    "container-add-project-btn",
  );
  const containerToDos = document.getElementById("container-todos");
  const btnAddProject = document.getElementById("btn-add-project");
  const btnAddToDo = document.getElementById("btn-add-todo");

  const projectManager = new ProjectManager();
  const domHandler = new DOMHandler(
    projectList,
    containerProjectBtn,
    containerToDos,
    projectManager,
  );
  // check and load data inside localStorage
  const data = projectManager.getLocalStorage();
  // check if default projects is present
  const checkForDefault = data.some(
    (project) => project.id === DEFAULT_PROJECT_ID,
  );
  // if no default project was present
  if (!checkForDefault) {
    projectManager.createDefaultProject();
    projectManager.setLocalStorage();
  }
  projectManager.reconstructProjects(data);
  domHandler.renderAllProjects(projectManager.getProjects());
  domHandler.highlightActiveProject();
  domHandler.renderActiveProjectToDos();

  createSeedData(projectManager, domHandler);

  container.addEventListener("click", (event) => {
    domHandler.handleOutsideClick(event.target);
    const role = event.target.closest("[data-role]")?.dataset.role;
    let validationProject;
    let validationCreateToDoForm;
    let validateEditToDoInput;
    let removedProject;
    let ulKebab;
    let description;
    let list;
    let existingEditForm;
    let id;
    let project;
    let todo;
    let article;
    let title;
    let nextSibling;
    if (!role) {
      return;
    }
    switch (role) {
      case "btn-add-project":
        console.log("btn-add-project");
        if (domHandler.getIsFormOpen()) return;
        domHandler.setIsFormOpen(true);
        domHandler.renderProjectForm();
        domHandler.toggleHideDisplay(btnAddProject);
        domHandler.isCreateProject = true;
        domHandler.updateButtonStates();
        domHandler.scrollFormIntoView("li-project-name");
        break;
      case "btn-confirm-project":
        console.log("btn-confirm-project");
        list = event.target.closest("li");
        validationProject = domHandler.validateForms(list);
        if (validationProject.check) {
          domHandler.setIsFormOpen(false);
          projectManager.addProject(validationProject.inputs.name);
          domHandler.createProject(projectManager.getActiveProject());
          domHandler.highlightActiveProject();
          domHandler.toggleHideDisplay(btnAddProject);
          domHandler.removeToDos();
          projectManager.setLocalStorage();

          domHandler.isCreateProject = false;
          domHandler.updateButtonStates();
        } else {
          domHandler.showFormErrorsOnSubmit(list, validationProject);
        }
        break;

      case "btn-cancel-project":
        console.log("btn-cancel-project");
        domHandler.setIsFormOpen(false);
        domHandler.cancelProjectForm();
        domHandler.toggleHideDisplay(btnAddProject);

        domHandler.isCreateProject = false;
        domHandler.updateButtonStates();
        break;

      case "btn-confirm-edit-project":
        console.log("btn-confirm-edit-project");
        list = event.target.closest("li");
        id = list.id;
        nextSibling = list.nextSibling;
        validationProject = domHandler.validateForms(list);
        if (validationProject.check) {
          domHandler.setIsFormOpen(false);
          project = projectManager.getProjectById(id);
          project.setName(validationProject.inputs.name);
          projectManager.setLocalStorage();
          domHandler.renderProject(project, nextSibling);
          domHandler.highlightActiveProject();

          domHandler.isEditProject = false;
          domHandler.updateButtonStates();
        } else {
          domHandler.showFormErrorsOnSubmit(list, validationProject);
        }

        break;
      case "btn-cancel-edit-project":
        console.log("btn-cancel-edit-project");
        domHandler.setIsFormOpen(false);
        list = event.target.closest("li");
        nextSibling = list.nextSibling;
        id = list.id;
        project = projectManager.getProjectById(id);
        domHandler.renderProject(project, nextSibling);
        domHandler.highlightActiveProject();

        domHandler.isEditProject = false;
        domHandler.updateButtonStates();
        break;

      case "btn-add-todo":
        console.log("btn-add-todo");
        if (domHandler.getIsFormOpen()) return;
        domHandler.setIsFormOpen(true);
        domHandler.renderToDoForm();
        domHandler.toggleHideDisplay(btnAddToDo);
        domHandler.isCreateToDo = true;
        domHandler.updateButtonStates();
        domHandler.scrollFormIntoView("card-create-todo");
        break;

      case "btn-confirm-create-todo":
        console.log("btn-confirm-create-todo");
        article = event.target.closest("article");
        validationCreateToDoForm = domHandler.validateForms(article);

        if (validationCreateToDoForm.check) {
          domHandler.setIsFormOpen(false);
          project = projectManager.getActiveProject();
          id = project.addToDo(validationCreateToDoForm.inputs);
          domHandler.renderToDo(id);
          domHandler.toggleHideDisplay(btnAddToDo);
          projectManager.setLocalStorage();
          domHandler.isCreateToDo = false;
          domHandler.updateButtonStates();
        } else {
          domHandler.showFormErrorsOnSubmit(article, validationCreateToDoForm);
        }
        break;

      case "btn-cancel-create-todo":
        console.log("btn-cancel-create-todo");
        domHandler.setIsFormOpen(false);
        domHandler.cancelToDoForm();
        domHandler.toggleHideDisplay(btnAddToDo);

        domHandler.isCreateToDo = false;
        domHandler.updateButtonStates();
        break;

      case "btn-confirm-edit-todo":
        console.log("btn-confirm-edit-todo");
        domHandler.setIsFormOpen(false);
        article = event.target.closest("article");
        validateEditToDoInput = domHandler.validateForms(article);

        if (validateEditToDoInput.check) {
          id = article.id;
          project = projectManager.getActiveProject();
          project.updateToDo(id, validateEditToDoInput.inputs);
          // grab sibling so newly render todo can be inserted in same spot as before
          nextSibling = article.nextSibling;
          domHandler.removeElement(id);
          domHandler.renderToDo(id, nextSibling);
          projectManager.setLocalStorage();

          domHandler.isEditToDo = false;
          domHandler.updateButtonStates();
        } else {
          domHandler.showFormErrorsOnSubmit(article, validateEditToDoInput);
        }
        break;

      case "btn-cancel-edit-todo":
        console.log("btn-cancel-edit-todo");
        domHandler.setIsFormOpen(false);
        article = event.target.closest("article");
        id = article.id;
        project = projectManager.getActiveProject();
        todo = project.getToDo(id);
        nextSibling = article.nextSibling;
        domHandler.removeElement(id);
        domHandler.renderToDo(id, nextSibling);

        domHandler.isEditToDo = false;
        domHandler.updateButtonStates();
        break;

      case "btn-project":
        console.log("btn-project");
        if (domHandler.getIsFormOpen()) {
          domHandler.setIsFormOpen(false);
          domHandler.cancelProjectForm();

          existingEditForm = document.querySelector(".li-project-edit");
          if (existingEditForm) {
            nextSibling = existingEditForm.nextSibling;
            id = existingEditForm.id;
            project = projectManager.getProjectById(id);
            domHandler.renderProject(project, nextSibling);
          }

          if (btnAddToDo.classList.contains("is-hidden")) {
            domHandler.toggleHideDisplay(btnAddToDo);
          }
          if (btnAddProject.classList.contains("is-hidden")) {
            domHandler.toggleHideDisplay(btnAddProject);
          }
        }
        list = event.target.closest("li");
        id = list.id;
        projectManager.switchActiveProject(id);
        domHandler.highlightActiveProject();
        domHandler.removeToDos();
        domHandler.renderActiveProjectToDos();

        // reset button state
        domHandler.isCreateProject = false;
        domHandler.isEditProject = false;
        domHandler.isCreateToDo = false;
        domHandler.isEditToDo = false;
        domHandler.updateButtonStates();
        break;

      case "btn-trash-todo":
      case "btn-kebab-delete":
        console.log("btn-trash-todo");
        id = event.target.closest("article").id;
        project = projectManager.getActiveProject();
        project.removeToDo(id);
        domHandler.removeElement(id);
        domHandler.closeKebabMenu();

        projectManager.setLocalStorage();
        break;

      case "btn-kebab-menu":
        if (domHandler.getIsFormOpen()) return;
        article = event.target.closest("article");
        ulKebab = article.querySelector(".kebab-menu-list");
        domHandler.handleKebabClick(ulKebab);
        break;

      case "btn-kebab-edit":
        console.log("btn-kebab-edit");
        if (domHandler.getIsFormOpen()) return;
        domHandler.setIsFormOpen(true);
        article = event.target.closest("article");
        id = article.id;
        project = projectManager.getActiveProject();
        todo = project.getToDo(id);
        domHandler.renderEditToDo(article, todo);
        domHandler.closeKebabMenu();

        domHandler.isEditToDo = true;
        domHandler.updateButtonStates(article);
        break;

      case "btn-kebab-menu-project":
        console.log("btn-kebab-menu-project");
        if (domHandler.getIsFormOpen()) return;
        list = event.target.closest("li");
        ulKebab = list.querySelector(".kebab-menu-list-project");
        domHandler.handleKebabClick(ulKebab);
        break;

      case "btn-kebab-menu-project-edit":
        console.log("btn-kebab-menu-project-edit");
        if (domHandler.getIsFormOpen()) return;
        domHandler.setIsFormOpen(true);
        list = event.target.closest("li[id]");
        domHandler.renderEditProject(list);
        domHandler.isEditProject = true;
        domHandler.updateButtonStates();
        break;

      case "btn-kebab-menu-project-delete":
        console.log("btn-kebab-menu-project-delete");
        list = event.target.closest("li[id]");
        console.log(list);
        id = list.id;
        // removed prevents the deletion of default project
        removedProject = projectManager.removeProject(list.id);
        if (removedProject) {
          domHandler.removeElement(list.id);
          domHandler.highlightActiveProject();
          domHandler.removeToDos();
          domHandler.renderActiveProjectToDos();
          projectManager.setLocalStorage();
        }
        break;

      case "checkbox-todo":
        console.log("checkbox-todo");
        article = event.target.closest("article");
        title = article.querySelector(".todo-title");
        domHandler.updateLineThrough(title, event.target.checked);
        id = article.id;
        project = projectManager.getActiveProject();
        todo = project.getToDo(id);
        todo.setDone(event.target.checked);

        projectManager.setLocalStorage();
        break;

      case "checkbox-edit-todo":
        console.log("checkbox-edit-todo");
        article = event.target.closest("article");
        id = article.dataset.currentToDoId;
        project = projectManager.getActiveProject();
        todo = project.getToDo(id);
        todo.setDone(event.target.checked);
        break;

      case "expand-todo":
        console.log("expand-todo");
        if (
          domHandler.isCreateProject ||
          domHandler.isEditProject ||
          domHandler.isCreateToDo ||
          domHandler.isEditToDo
        )
          return;
        article = event.target.closest("article");
        description = article.querySelector(".todo-description");
        if (description) {
          // if todo is in edit mode, description is not there anymore
          domHandler.toggleToDoLayout(article);
          domHandler.toggleHideDisplay(description);
        }
        break;

      default:
        console.log("default case click event.");
    }
  });

  container.addEventListener("change", (event) => {
    let project;
    let id;
    let todo;
    const selectPriority = event.target.closest("select");

    if (!selectPriority) return;
    let role = selectPriority.dataset.role;
    switch (role) {
      case "select-priority":
        console.log("select-priority");
        project = projectManager.getActiveProject();
        id = event.target.closest("article").id;
        todo = project.getToDo(id);
        todo.setPriority(selectPriority.value);
        projectManager.setLocalStorage();
        break;
      default:
        console.log("default case change event.");
    }
    // console.log(projectManager.getActiveProject().getToDos());
  });

  container.addEventListener("input", (event) => {
    let article;
    let list;
    const role = event.target.dataset.role;
    switch (role) {
      // hide span invalid if user enters something into input field
      case "create-todo-input-date":
      case "edit-todo-input-date":
      case "create-todo-input-title":
      case "edit-todo-input-title":
      case "create-todo-input-description":
      case "edit-todo-input-description":
        article = event.target.closest("article");
        domHandler.hideSpanValidationError(article, role);
        break;
      case "input-create-project":
        list = event.target.closest("li");
        domHandler.hideSpanValidationError(list, role);
        break;
      case "input-edit-project":
        console.log("here we are ma boi");
        list = event.target.closest("li");
        domHandler.hideSpanValidationError(list, role);
        break;
    }
  });

  // if user loses focus on input field
  container.addEventListener("focusout", (event) => {
    const role = event.target.dataset.role;
    let validationInput;
    let article;
    let li;
    let inputElement;
    // console.log(role);
    switch (role) {
      case "create-todo-input-date":
      case "edit-todo-input-date":
      case "create-todo-input-title":
      case "edit-todo-input-title":
      case "create-todo-input-description":
      case "edit-todo-input-description":
        inputElement = event.target;
        article = inputElement.closest("article");
        validationInput = domHandler.validateInput(inputElement);

        domHandler.showFieldErrorOnBlur(article, inputElement, validationInput);
        break;

      case "input-create-project":
      case "input-edit-project":
        inputElement = event.target;
        li = inputElement.closest("li");
        validationInput = domHandler.validateInput(inputElement);

        domHandler.showFieldErrorOnBlur(li, inputElement, validationInput);
        break;
    }
  });
});
