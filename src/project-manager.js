import { Project } from "./project.js";

const DEFAULT_PROJECT_ID = "default-project-DP";

class ProjectManager {
  constructor() {
    this.activeProject;
    this.projects = [];
  }

  addProject(name) {
    const project = new Project(name);
    this.activeProject = project;
    this.projects.push(project);
    console.log(`Project "${name}" was added.`);
    return project;
  }

  reconstructProjects(data) {
    data.forEach((item) => {
      const project = new Project(item.name, item.id);
      // reconstruct todos
      item.todos.forEach((todoData) => {
        console.log(todoData);
        project.addToDo(todoData);
      });
      this.projects.push(project);
      if (project.getId() === DEFAULT_PROJECT_ID) {
        this.activeProject = project;
        this.default = project;
      }
      // console.log(`Project "${item.name}" was reconstructed from data.`);
    });
  }

  removeProject(id) {
    if (id === this.default.id) {
      console.log("You cannot delete the default project.");
      return false;
    }
    this.projects = this.projects.filter((project) => project.id !== id);
    if (this.activeProject.getId() === id) {
      console.log("Project was removed. Project default was set as active");
      this.activeProject = this.default;
    }
    return true;
  }

  switchActiveProject(id) {
    console.log(this.projects);
    const project = this.projects.find((project) => project.id === id);
    if (!project) {
      console.log("Project couldn't be switched.");
      return;
    }
    this.activeProject = project;
    console.log(`switch to project ${project.getName()} successful`);
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

  setLocalStorage() {
    console.log("setLocalStorage");
    const data = this.getProjects();
    localStorage.setItem("projects", JSON.stringify(data));
  }

  getLocalStorage() {
    console.log("getLocalStorage");
    const data = localStorage.getItem("projects");
    if (data) {
      return JSON.parse(data);
    }
    return []; // before: return this.project;
  }

  createDefaultProject() {
    console.log("createDefaultProject");
    this.default = new Project("Default", DEFAULT_PROJECT_ID);
    this.activeProject = this.default;
    this.projects.push(this.default);
  }
}

export { ProjectManager, DEFAULT_PROJECT_ID };
