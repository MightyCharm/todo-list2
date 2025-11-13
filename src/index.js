import { ProjectManager } from "./project-manager.js";
import { DOMHandler } from "./dom.js";
import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.css";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("main-container");
  const projectList = document.getElementById("project-list");
  const containerProjectBtn = document.getElementById(
    "container-add-project-btn"
  );
  const containerToDos = document.getElementById("container-todos");
  const btnAddProject = document.getElementById("btn-add-project");
  const btnAddToDo = document.getElementById("btn-add-todo");

  const projectManager = new ProjectManager();
  const domHandler = new DOMHandler(
    projectList,
    containerProjectBtn,
    containerToDos,
    projectManager
  );

  domHandler.initialSetup();
  domHandler.highlightActiveProject();

  container.addEventListener("click", (event) => {
    domHandler.handleOutsideClick(event.target);
    const role = event.target.closest("[data-role]")?.dataset.role; 
    console.log(role);
    let list; // to grab parent list element
    let id; // to grab id
    let project;
    let todo;
    let article;
    if (!role) {
      return;
    }
    switch (role) {
      
      case "btn-add-project":
        console.log(role);
        if (domHandler.getIsFormOpen()) return;
        domHandler.setIsFormOpen(true);
        domHandler.renderProjectForm();
        domHandler.toggleHideDisplay(btnAddProject);
        break;

      case "btn-confirm-project":
        console.log("btn-confirm-project");
        const validationProject = domHandler.validationInputProject();
        if (validationProject.check) {
          projectManager.addProject(validationProject.name);
          domHandler.setIsFormOpen(false);
          domHandler.createProject();
          domHandler.highlightActiveProject();
          domHandler.toggleHideDisplay(btnAddProject);
          domHandler.removeToDos();
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
        const validationCreateToDoForm = domHandler.validateInputToDo();
        if (validationCreateToDoForm.check) {
          domHandler.setIsFormOpen(false);
          const project = projectManager.getActiveProject();
          const idToDo = project.addToDo(validationCreateToDoForm.inputs);
          domHandler.renderToDo(idToDo);
          domHandler.toggleHideDisplay(btnAddToDo);
        }
        break;

      case "btn-cancel-todo":
        console.log("btn-cancel-todo");
        domHandler.setIsFormOpen(false);
        domHandler.cancelToDoForm();
        domHandler.toggleHideDisplay(btnAddToDo);
        break;

      case "btn-confirm-edit-todo":
        console.log("btn-confirm-edit-todo");
        domHandler.setIsFormOpen(false);
        article = event.target.closest("article");
        const validateEditToDoInput = domHandler.validateInputEditToDo(article);
        if (validateEditToDoInput.check) {
          id = article.id;
          project = projectManager.getActiveProject();
          project.updateToDo(id, validateEditToDoInput.inputs);
          // grab sibling so newly render todo can be inserted in same spot as before
          const nextSibling = article.nextSibling;
          domHandler.removeElement(id);
          domHandler.renderToDo(id, nextSibling);
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
        const removed = projectManager.removeProject(list.id);
        if (removed) {
          domHandler.removeElement(list.id);
          domHandler.highlightActiveProject();
          domHandler.removeToDos();
          domHandler.renderActiveProjectToDos();
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
        break;

      case "btn-kebab-menu":
        console.log("btn-kebab-menu");
        if (domHandler.getIsFormOpen()) return;
        article = event.target.closest("article");
        const ulKebab = article.querySelector(".kebab-menu-list");
        domHandler.handleKebabClick(ulKebab);
        break;

      case "btn-kebab-edit":
        console.log("btn-kebab-edit");
        if (domHandler.getIsFormOpen()) return;
        domHandler.setIsFormOpen(true);
        article = event.target.closest("article");
        id = article.id;
        console.log(id);
        project = projectManager.getActiveProject();
        todo = project.getToDo(id);
        domHandler.renderEditToDo(article, todo);

        domHandler.closeKebabMenu(); // <-------------------------------------
        break;

      case "checkbox-todo":
        console.log("checkbox-todo");
        id = event.target.closest("article").id;
        project = projectManager.getActiveProject();
        todo = project.getToDo(id);
        todo.setDone(event.target.checked);
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
        const description = article.querySelector(".todo-description");
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
    const selectPriority = event.target.closest("select");
    if (!selectPriority) return;
    let role = selectPriority.dataset.role;
    switch (role) {
      case "select-priority":
        console.log("Inside case priority");
        const project = projectManager.getActiveProject();
        const id = event.target.closest("article").id;
        const todo = project.getToDo(id);
        todo.setPriority(selectPriority.value);
        break;
      default:
        console.log("default case change event.");
    }
    console.log(projectManager.getActiveProject().getToDos());
  });
});
