class ToDo {
  constructor(title, description, dueDate, priority, done = false, id) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = done;
    if (id === undefined) {
      this.id = self.crypto.randomUUID();
    } else {
      this.id = id;
    }
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  setTitle(updatedTitle) {
    this.title = updatedTitle;
  }

  getDescription() {
    return this.description;
  }

  setDescription(updatedDescription) {
    this.description = updatedDescription;
  }

  getPriority() {
    return this.priority;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  getDueDate() {
    return this.dueDate;
  }

  setDueDate(updatedDueDate) {
    this.dueDate = updatedDueDate;
  }

  setDone(value) {
    this.done = value;
  }

  getDone() {
    return this.done;
  }
}

export { ToDo };
