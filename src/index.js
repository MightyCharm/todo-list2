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
  const projectDefault = projectManager.getActiveProject();
  createNewProject(projectDefault);
  createAddProject();
  createAddToDo();
}

function validateInput() {
  const date = document.getElementById("create-todo-date");
  const priority = document.getElementById("create-todo-priority");
  const done = document.getElementById("create-todo-done");
  const title = document.getElementById("input-title");
  const description = document.getElementById("textarea-description");

  const inputDate = date.value;
  const inputPriority = priority.value;
  const inputDone = done.checked;
  const inputTitle = title.value.trim();
  const inputDescription = description.value.trim();

  console.log(`date: ${inputDate}  length: ${inputDate.length}`);
  console.log(`priority: ${inputPriority} length: ${inputPriority.length}`);
  console.log(`done: ${inputDone} length: ${inputDone.length}`);
  console.log(`title ${inputTitle} length: ${inputTitle.length}`);
  console.log(`description: ${inputDescription} length: ${inputDescription.length}`);

  // good values: create todo
  if(inputDate && inputTitle && inputDescription) {
    console.log("data good...create todo| remove input todo, add New + button again");
    const project = projectManager.getActiveProject();
    console.log(`active project: ${project.name}`);
    return true;
  }
  console.log("Input is missing something, do nothing for now");  
  return false;

}

const projectManager = new ProjectManager();
initialSetup();

export { getProjectName, validateInput };