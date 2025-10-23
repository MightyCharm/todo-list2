import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.css";

// note for later: allow only the creation of one instance of this class
class ProjectManager {
  constructor() {
    this.default = new Project("Default");
    this.activeProject = this.default;
    this.projects = [];
    this.projects.push(this.default);
  }

  addProject(name) {
    const project = new Project(name);
    this.activeProject = project;
    this.projects.push(project);
    console.log(`Project "${name} was added.`);
  }

  removeProject(id) {
    if (id === this.default.id) {
      console.log("You cannot delete the default project.");
      return;
    }
    this.projects = this.projects.filter((project) => project.id !== id);
    this.activeProject = this.default;
    console.log("Project was removed. Project default was set as active");
  }

  switchActiveProject(id) {
    const project = this.projects.find((project) => project.id === id);
    if (!project) {
      console.log("Project was not found.");
      return;
    }
    this.activeProject = project;
    console.log("switch project successful");
  }

  getProjects() {
    return this.projects;
  }

  getActiveProject() {
    return this.activeProject;
  }

  getDefaultProject() {
    return this.default;
  }
}

class Project {
  constructor(name, id) {
    this.name = name;
    this.todos = [];
    if (id === undefined) {
      this.id = self.crypto.randomUUID();
    } else {
      this.id = id;
    }
  }

  addToDo(title, description, dueDate, priority) {
    const todo = new ToDo(title, description, dueDate, priority);
    this.todos.push(todo);
    return todo.id;
  }

  removeToDo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    console.log("todo was removed.");
  }

  getToDos() {
    return this.todos;
  }

  toggleComplete(id) {
    const todo = this.todos.find((todo) => todo.id === id);
    if(!todo) {
      console.log("todo not found");
      return undefined
    }
    todo.done = !todo.done;
  }

  updateToDo(id) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      return undefined;
    }
    const properties = ["title", "description", "dueDate", "priority"];

    properties.forEach((property) => {
      const answer = prompt(`Enter new ${property}`);
      if (answer !== null) {
        const trimmedAnswer = answer.trim();
        if (trimmedAnswer.length > 0) {
          if (property === "priority") {
            if (answer === "low" || answer === "normal" || answer === "high") {
              todo[property] = trimmedAnswer;
              console.log(`${property} was updated.`);
            }
          } else {
            todo[property] = trimmedAnswer;
            console.log(`${property} was updated.`);
          }
        }
      }
    });
  }

  getToDo(id) {
    // should return todo
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      return undefined;
    }
    return todo;
  }
}

class ToDo {
  constructor(title, description, dueDate, priority, id) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = false;
    if (id === undefined) {
      this.id = self.crypto.randomUUID();
    } else {
      this.id = id;
    }
  }
}

const projectManager = new ProjectManager();
projectManager.addProject("Chores");
projectManager.addProject("Homework");
projectManager.addProject("Friends");
// console.log(projectManager.getProjects());
// console.log(projectManager.getActiveProject());
// console.log(projectManager.getDefaultProject().name);
projectManager.removeProject(projectManager.getActiveProject().id);
// console.log(projectManager.getProjects());
// console.log(projectManager.getActiveProject());

// simulating a button click for now, button is clicked and id is send to method

const projectDefault = projectManager.getDefaultProject();
projectManager.switchActiveProject(projectManager.getProjects()[1].id);
const projectChores = projectManager.getActiveProject();
projectManager.switchActiveProject(projectManager.getProjects()[2].id);
const projectHomework = projectManager.getActiveProject();

console.log(projectDefault.name);
console.log(projectChores.name);
console.log(projectHomework.name);

const idTodo_1 = projectDefault.addToDo(
  "Meet with Kevin",
  "Kevin called, its urgent, we meet in the city at cafe Vertigo",
  "1.5.25",
  "normal"
);

const idTodo_2 = projectDefault.addToDo(
  "Call Grandpa",
  "Grandpa asked about the books i ordered, Should call him back ASAP.",
  "3.6.25",
  "high"
);

const idTodo_3 = projectDefault.addToDo(
  "Birthday Susanne",
  "Still need to find a present.",
  "22.6.25",
  "normal"
);

// console.log(JSON.parse(JSON.stringify(projectManager.getProjects())));
// console.log("before")
projectDefault.removeToDo(idTodo_2);
// console.log("after")
// console.log(projectManager.getProjects());

const defaultToDos = projectDefault.getToDos(); // get all todos, so i can select one an get id
console.log(defaultToDos);
const idToDo = defaultToDos[1].id; // get id of an todo in project default
console.log(projectDefault.getToDo(idToDo)); // use id to check if the correct todo is return

// projectDefault.updateToDo(idToDo); // use id to change todo
// console.log(projectDefault.getToDo(idToDo)); // check if changes are saved

projectDefault.toggleComplete(idToDo);
console.log(projectDefault.getToDo(idToDo));
