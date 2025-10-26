import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { ProjectManager } from "./project-manager.js"
import { createAddProject, createNewProject, createAddToDo } from "./dom.js";

// gets/checks user input for new project and calls function to create new
function getProjectName() {
  const userInput = document.getElementById("input-project-name").value;
  const cleanedInput = userInput.trim();
  if(cleanedInput.length > 0) {
    const project = projectManager.addProject(userInput);
    createNewProject(project);
    
  } else {
    console.log("Please enter valid Project Name");
  }
}

function initialSetup() {
  console.log("hello");
  createAddProject();
  createAddToDo();
}

const projectManager = new ProjectManager();
initialSetup();

export { getProjectName };