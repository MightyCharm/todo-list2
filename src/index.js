import { ProjectManager } from "./project-manager.js";

import { initialSetup, createAddProject, createAddToDo } from "./dom.js";
import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.css";

// function initialSetup() {
//   const projectDefault = projectManager.getActiveProject();
//   renderNewProject(projectDefault);
//   createAddProject();
//   createAddToDo();
// }

function addToDo(title, description, dueDate, priority) {
  const project = projectManager.getActiveProject();
  project.addToDo(title, description, dueDate, priority);
  console.log(projectManager.getActiveProject());
}

const projectManager = new ProjectManager();
initialSetup(projectManager);
createAddProject(projectManager);
createAddToDo(projectManager);
