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
  console.log("=>" + domHandler.isFormOpen);
  container.addEventListener("click", (event) => {
    const element = event.target.closest("button");
    if (!element) {
      return;
    }
    const id = element.id;
    console.log(id);
    switch (id) {
      case "btn-add-project":
        if (domHandler.getIsFormOpen()) return;
        domHandler.setIsFormOpen();
        domHandler.renderProjectForm();
        break;
      case "btn-confirm-project":
        domHandler.setIsFormOpen();
        domHandler.createProject();
        domHandler.renderAddProjectButton();
        break;
      case "btn-cancel-project":
        domHandler.setIsFormOpen();
        domHandler.cancelProjectForm();
        break;
      case "btn-add-todo":
        if (domHandler.getIsFormOpen()) return;
        domHandler.setIsFormOpen();
        domHandler.renderToDoForm();
        break;
      case "btn-confirm-todo":
        const validation = domHandler.validateInputToDo();
        if (validation.check) {
          domHandler.setIsFormOpen();
          const title = validation.inputs.title;
          const description = validation.inputs.description;
          const dueDate = validation.inputs.dueDate;
          const priority = validation.inputs.priority;
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
        domHandler.setIsFormOpen();
        domHandler.cancelToDoForm();
        break;
      default:
        console.log("Something went wrong. switch statement, index.js");
    }
  });

  domHandler.initialSetup();
  domHandler.renderAddProjectButton();
  domHandler.renderAddToDoButton();
});
