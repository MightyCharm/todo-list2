import { Project} from "./project.js"
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

export { ProjectManager };