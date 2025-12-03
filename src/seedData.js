function createSeedData(projectManager, domHandler) {
  console.log("checkLocalStorage");
  const PROJECT_NAME = "Tutorial";
  const LOCAL_STORAGE = projectManager.getLocalStorage();

  if (LOCAL_STORAGE.length <= 1 && LOCAL_STORAGE[0].todos.length === 0) {
    const project = createSeedProject(projectManager, domHandler, PROJECT_NAME);

    const todos = [
      {
        title: "Hello World!",
        description:
          "Create Projects and Todos. Everything will be saved in your Browser. But don't forget, the Default Project cannot be deleted.",
        dueDate: "2026-06-07",
        priority: "normal",
        done: false,
      },
      {
        title: "Create a new Project",
        description: 'Click the "New +" button above, to create a new Project.',
        dueDate: "2026-06-07",
        priority: "normal",
        done: false,
      },
      {
        title: "Add your first task",
        description:
          'Click the "New +" button at the bottom, to create a new to-do.',
        dueDate: "2026-06-07",
        priority: "normal",
        done: false,
      },
      {
        title: "Mark a task as done",
        description:
          "Check the box next to a task to mark it complete - try it with this one!",
        dueDate: "2026-06-07",
        priority: "high",
        done: false,
      },
      {
        title: "Expand todo to see description",
        description:
          "Click on one of your todos, to expand them and see the description.",
        dueDate: "2026-06-07",
        priority: "normal",
        done: false,
      },
      {
        title: "Delete Project and ToDos",
        description:
          "You can delete every Project and Todo using the Kebab Button or Trash Icon on Todo.",
        dueDate: "2026-06-07",
        priority: "normal",
        done: false,
      },
    ];

    todos.forEach((todo) => {
      createSeedToDo(domHandler, project, todo);
    });

    projectManager.setLocalStorage();
  }
}

function createSeedProject(projectManager, domHandler, name) {
  projectManager.addProject(name);
  domHandler.createProject(projectManager.getActiveProject());
  const project = projectManager.getActiveProject();
  domHandler.highlightActiveProject();
  return project;
}

function createSeedToDo(domHandler, project, todo) {
  const id = project.addToDo({
    title: todo.title,
    description: todo.description,
    dueDate: todo.dueDate,
    priority: todo.priority,
    done: false,
  });

  domHandler.renderToDo(id);
}

export { createSeedData };
