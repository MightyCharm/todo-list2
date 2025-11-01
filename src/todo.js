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

  getPriority() {
    return this.priority;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  getId() {
    return this.id;
  }
}

export { ToDo };