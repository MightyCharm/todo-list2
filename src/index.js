import { ProjectManager } from "./project-manager.js";
import { DOMHandler } from "./dom.js";
import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.css";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("main-container");
  const projectList = document.getElementById("project-list");
  const containerToDos = document.getElementById("container-todos");

  const projectManager = new ProjectManager();
  const domHandler = new DOMHandler(
    projectList,
    containerToDos,
    projectManager
  );
  
  domHandler.initialSetup();
  domHandler.highlightActiveProject();
  domHandler.renderAddProjectButton();
  domHandler.renderAddToDoButton();
  container.addEventListener("click", (event) => {
    const element = event.target.closest("button");
    if (!element) {
      return;
    }
    const role = element.dataset.role;
    const id = element.id;

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
          domHandler.setIsFormOpen();
          domHandler.createProject(validationProject.name);
          domHandler.highlightActiveProject();
          domHandler.renderAddProjectButton();
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
        break;
      case "btn-confirm-todo":
        console.log("btn-confirm-todo");
        const validationToDo = domHandler.validateInputToDo();
        if (validationToDo.check) {
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

          domHandler.renderToDo(idToDo);
          domHandler.renderAddToDoButton();
        }
        break;
      case "btn-cancel-todo":
        console.log("btn-cancel-todo");
        domHandler.setIsFormOpen();
        domHandler.cancelToDoForm();
        break;
      case "btn-project":
        console.log("btn-project");
        projectManager.switchActiveProject(id);
        domHandler.highlightActiveProject();
        break;
      default:
        console.log("Something went wrong. switch statement, index.js");
    }
  });
});
