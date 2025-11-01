import { ProjectManager } from "./project-manager.js";
import { DOMHandler } from "./dom.js";
import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.css";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("main-container");
  const projectList = document.getElementById("project-list");
  const containerToDos = document.getElementById("container-todos");
  const btnAddToDo = document.getElementById("btn-add-todo");

  const projectManager = new ProjectManager();
  const domHandler = new DOMHandler(
    projectList,
    containerToDos,
    btnAddToDo,
    projectManager
  );

  domHandler.initialSetup();
  domHandler.highlightActiveProject();
  domHandler.renderAddProjectButton();

  container.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    let list; // to grab parent list element
    let article; // to grab parent article element
    let id; // to grab id
    if (!button) {
      return;
    }

    const role = button.dataset.role;
    switch (role) {
      case "btn-add-project":
        console.log("btn-add-project");
        if (domHandler.getIsFormOpen()) return;
        domHandler.setIsFormOpen();
        domHandler.renderProjectForm();
        break;

      case "btn-confirm-project":
        console.log("btn-confirm-project");
        const validationProject = domHandler.validationInputProject();
        if (validationProject.check) {
          projectManager.addProject(validationProject.name);
          domHandler.setIsFormOpen();
          domHandler.createProject();
          domHandler.highlightActiveProject();
          domHandler.renderAddProjectButton();
          domHandler.removeToDos();
        }
        break;

      case "btn-cancel-project":
        console.log("btn-cancel-project");
        domHandler.setIsFormOpen();
        domHandler.cancelProjectForm();
        break;

      case "btn-add-todo":
        console.log("btn-add-todo");
        if (domHandler.getIsFormOpen()) return;
        domHandler.setIsFormOpen();
        domHandler.renderToDoForm();
        domHandler.hideBtnAddToDo();
        break;

      case "btn-confirm-todo":
        console.log("btn-confirm-todo");
        const validationToDo = domHandler.validateInputToDo();
        if (validationToDo.check) {
          console.log(validationToDo.inputs)
          domHandler.setIsFormOpen();
          const title = validationToDo.inputs.title;
          const description = validationToDo.inputs.description;
          const dueDate = validationToDo.inputs.dueDate;
          const priority = validationToDo.inputs.priority;
          const project = projectManager.getActiveProject();
          const idToDo = project.addToDo(
            title,
            description,
            dueDate,
            priority,
            project
          );
          console.log(project);
          domHandler.renderToDo(idToDo);
          domHandler.displayBtnAddToDo();
        }
        break;

      case "btn-cancel-todo":
        console.log("btn-cancel-todo");
        domHandler.setIsFormOpen();
        domHandler.cancelToDoForm();
        domHandler.displayBtnAddToDo();
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
        console.log("remove single todo now");
        const article = event.target.closest("article");
        id = article.id;
        // project.removeToDo(id);
        const project = projectManager.getActiveProject();
        project.removeToDo(id);
        domHandler.removeElement(id);    
        break;
      default:
        console.log("Something went wrong. switch statement, index.js");
    }
    console.log(projectManager.getActiveProject().getToDos());
  });
});
