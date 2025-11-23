import { ProjectManager, DEFAULT_PROJECT_ID } from "./project-manager.js";
import { DOMHandler } from "./dom.js";
import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.css";

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

  // New implemented block, does check and load data inside localStorage
  // load data
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
    let id;
    let project;
    let todo;
    let article;
    let title;
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
        break;

      case "btn-confirm-project":
        console.log("btn-confirm-project");
        // validationProject = domHandler.validationInputProject();
        list = event.target.closest("li");
        validationProject = domHandler.validateForms(list);
        if (validationProject.check) {
          projectManager.addProject(validationProject.inputs.name);
          domHandler.setIsFormOpen(false);
          domHandler.createProject(projectManager.getActiveProject());
          domHandler.highlightActiveProject();
          domHandler.toggleHideDisplay(btnAddProject);
          domHandler.removeToDos();

          projectManager.setLocalStorage();
        }
        break;

      case "btn-cancel-project":
        console.log("btn-cancel-project");
        domHandler.setIsFormOpen(false);
        domHandler.cancelProjectForm();
        domHandler.toggleHideDisplay(btnAddProject);
        break;

      case "btn-add-todo":
        console.log("btn-add-todo");
        if (domHandler.getIsFormOpen()) return;
        domHandler.setIsFormOpen(true);
        domHandler.renderToDoForm();
        domHandler.toggleHideDisplay(btnAddToDo);
        break;

      case "btn-confirm-create-todo":
        console.log("btn-confirm-create-todo");
        article = event.target.closest("article");
        validationCreateToDoForm = domHandler.validateForms(article);

        if (validationCreateToDoForm.check) {
          domHandler.setIsFormOpen(false);
          const project = projectManager.getActiveProject();
          const idToDo = project.addToDo(validationCreateToDoForm.inputs);
          domHandler.renderToDo(idToDo);
          domHandler.toggleHideDisplay(btnAddToDo);
          projectManager.setLocalStorage();
        } else {
          article = event.target.closest("article");
          domHandler.showValidationErrors(article, validationCreateToDoForm);
        }
        break;

      case "btn-cancel-create-todo":
        console.log("btn-cancel-todo");
        domHandler.setIsFormOpen(false);
        domHandler.cancelToDoForm();
        domHandler.toggleHideDisplay(btnAddToDo);
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
          const nextSibling = article.nextSibling;
          domHandler.removeElement(id);
          domHandler.renderToDo(id, nextSibling);

          projectManager.setLocalStorage();
        }
        break;

      case "btn-cancel-edit-todo":
        console.log("btn-cancel-edit-todo");
        domHandler.setIsFormOpen(false);
        article = event.target.closest("article");
        id = article.id;
        project = projectManager.getActiveProject();
        todo = project.getToDo(id);
        domHandler.removeElement(id);
        domHandler.renderToDo(id);
        break;

      case "btn-project":
        console.log("btn-project");
        list = event.target.closest("li");
        id = list.id;
        projectManager.switchActiveProject(id);
        domHandler.highlightActiveProject();
        domHandler.removeToDos();
        domHandler.renderActiveProjectToDos();
        break;

      case "btn-trash-project":
        console.log("btn-trash-project");
        list = event.target.closest("li");
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
        console.log("btn-kebab-menu");
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
        break;

      case "checkbox-todo":
        //==============================================
        console.log("checkbox-todo");
        article = event.target.closest("article");
        title = article.querySelector(".todo-title");
        domHandler.updateLineThrough(title, event.target.checked);
        //==============================================
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
        console.log("Inside case priority");
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
    const role = event.target.dataset.role;
    switch (role) {
      // hide span invalid if user enters something into input field
      case "create-todo-input-date":
      case "create-todo-input-title":
      case "create-todo-input-description":
        article = event.target.closest("article");
        domHandler.hideSpanValidationError(article, role);
        break;
    }
  });

  container.addEventListener("focusout", (event) => {
    console.log("blur event");
    let article;
    const role = event.target.dataset.role;
    console.log(role);
    switch (role) {
      case "create-todo-input-date":
      case "create-todo-input-title":
      case "create-todo-input-description":
        console.log("here we are");
        break;
    }
  });

  /*
    case "btn-confirm-create-todo":
        console.log("btn-confirm-create-todo");
        validationCreateToDoForm = domHandler.validateInputToDo();
        if (validationCreateToDoForm.check) {
          domHandler.setIsFormOpen(false);
          const project = projectManager.getActiveProject();
          const idToDo = project.addToDo(validationCreateToDoForm.inputs);
          domHandler.renderToDo(idToDo);
          domHandler.toggleHideDisplay(btnAddToDo);

          projectManager.setLocalStorage();
        } else {
          article = event.target.closest("article");
          domHandler.showValidationErrors(article, validationCreateToDoForm);
        }
        break;
  */
  // add new eventlistner for blur event
  // need functionality for hide/show span invalids if user looses focus
  // feat(ui): re-show validation error on blur for todo creation
});
