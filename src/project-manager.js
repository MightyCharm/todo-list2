import { Project } from "./project.js";
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
    console.log(`Project "${name}" was added.`);
    return project;
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
    console.log("Project was removed.")
    return true;
  }

  switchActiveProject(id) {
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
}

export { ProjectManager };
