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
    return project;
  }

  reconstructProjects(data) {
    data.forEach((item) => {
      const project = new Project(item.name, item.id);
      // reconstruct todos
      item.todos.forEach((todoData) => {
        project.addToDo(todoData);
      });
      this.projects.push(project);
      if (project.getId() === DEFAULT_PROJECT_ID) {
        this.activeProject = project;
        this.default = project;
      }
    });
  }

  removeProject(id) {
    if (id === this.default.id) {
      return false;
    }
    this.projects = this.projects.filter((project) => project.id !== id);
    if (this.activeProject.getId() === id) {
      this.activeProject = this.default;
    }
    return true;
  }

  switchActiveProject(id) {
    const project = this.projects.find((project) => project.id === id);
    if (!project) {
      return;
    }
    this.activeProject = project;
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
    const data = this.getProjects();
    localStorage.setItem("projects", JSON.stringify(data));
  }

  getLocalStorage() {
    const data = localStorage.getItem("projects");
    if (data) {
      return JSON.parse(data);
    }
    return [];
  }

  createDefaultProject() {
    this.default = new Project("Default", DEFAULT_PROJECT_ID);
    this.activeProject = this.default;
    this.projects.push(this.default);
  }

  getProjectById(id) {
    return this.projects.find((project) => project.id === id);
  }
}

export { ProjectManager, DEFAULT_PROJECT_ID };
