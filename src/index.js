import { ProjectManager } from "./project-manager.js";
import {
  initialSetup,
  createAddProject,
  createAddToDo,
  createInputProject,
  createProject,
  cancelInputProject,
  createInputToDo,
  validateInputToDo,
  renderToDo,
  cancelInputToDo,
} from "./dom.js";
import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.css";

const container = document.getElementById("main-container");

container.addEventListener("click", (event) => {
  // console.log(event.target.closest("button"));
  const element = event.target.closest("button");
  if(!element) {
    return;
  }
  const id = element.id;
  console.log(id)
  switch (id) {
    case "btn-add-project":
      createInputProject(projectManager);
      break;
    case "btn-confirm-project":
      createProject(projectManager);
      createAddProject(projectManager);
      break;
    case "btn-cancel-project":
      cancelInputProject(projectManager);
      break;
    case "btn-add-todo":
      createInputToDo(projectManager);
      break;
    case "btn-confirm-todo":
      const validation = validateInputToDo();
      if (validation.check) {
        const title = validation.inputs.title;
        const description = validation.inputs.description;
        const dueDate = validation.inputs.dueDate;
        const priority = validation.inputs.priority;
        const project = projectManager.getActiveProject();
        const idToDo = project.addToDo(title, description, dueDate, priority, project);

        renderToDo(projectManager, idToDo);
        createAddToDo(projectManager);
      }
      break;
    case "btn-cancel-todo":
      cancelInputToDo(projectManager);
      break;
    default:
      console.log("Something went wrong. switch statement, index.js");
  }
});

const projectManager = new ProjectManager();
initialSetup(projectManager);
createAddProject(projectManager);
createAddToDo(projectManager);