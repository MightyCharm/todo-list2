import { ProjectManager } from "./project-manager.js";
import {
  initialSetup,
  renderAddProjectButton,
  renderAddToDoButton,
  renderProjectForm,
  renderToDoForm,
  cancelProjectForm,
  cancelToDoForm,
  validateInputToDo,
  createProject,
  renderToDo,
} from "./dom.js";
import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.css";

const container = document.getElementById("main-container");

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
      renderProjectForm(projectManager);
      break;
    case "btn-confirm-project":
      createProject(projectManager);
      renderAddProjectButton(projectManager);
      break;
    case "btn-cancel-project":
      cancelProjectForm(projectManager);
      break;
    case "btn-add-todo":
      renderToDoForm(projectManager);
      break;
    case "btn-confirm-todo":
      const validation = validateInputToDo();
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

        renderToDo(projectManager, idToDo);
        renderAddToDoButton(projectManager);
      }
      break;
    case "btn-cancel-todo":
      cancelToDoForm(projectManager);
      break;
    default:
      console.log("Something went wrong. switch statement, index.js");
  }
});

const projectManager = new ProjectManager();
initialSetup(projectManager);
renderAddProjectButton(projectManager);
renderAddToDoButton(projectManager);
