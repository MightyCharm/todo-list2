import { ProjectManager } from "./project-manager.js";
import { DOMHandler } from "./dom.js";
import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.css";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("main-container");
  const projectList = document.getElementById("project-list");
  const containerToDos = document.getElementById("container-todos");

  const domHandler = new DOMHandler(projectList, containerToDos);

  container.addEventListener("click", (event) => {
    // console.log(event.target.closest("button"));
    const element = event.target.closest("button");
    if (!element) {
      return;
    }
    const id = element.id;
    console.log(id);
    switch (id) {
      case "btn-add-project":
        domHandler.renderProjectForm(projectManager);
        break;
      case "btn-confirm-project":
        domHandler.createProject(projectManager);
        domHandler.renderAddProjectButton(projectManager);
        break;
      case "btn-cancel-project":
        domHandler.cancelProjectForm(projectManager);
        break;
      case "btn-add-todo":
        domHandler.renderToDoForm(projectManager);
        break;
      case "btn-confirm-todo":
        const validation = domHandler.validateInputToDo();
        if (validation.check) {
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

          domHandler.renderToDo(projectManager, idToDo);
          domHandler.renderAddToDoButton(projectManager);
        }
        break;
      case "btn-cancel-todo":
        domHandler.cancelToDoForm(projectManager);
        break;
      default:
        console.log("Something went wrong. switch statement, index.js");
    }
  });

  const projectManager = new ProjectManager();
  domHandler.initialSetup(projectManager);
  domHandler.renderAddProjectButton(projectManager);
  domHandler.renderAddToDoButton(projectManager);
});