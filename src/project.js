import { ToDo } from "./todo.js";

class Project {
  constructor(name, id) {
    this.name = name;
    if (id === undefined) {
      this.id = self.crypto.randomUUID();
    } else {
      this.id = id;
    }
    this.todos = [];
  }

  addToDo({ title, description, dueDate, priority, done, id }) {
    const todo = new ToDo(title, description, dueDate, priority, done, id);
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
    if (!todo) {
      console.log("todo not found");
      return undefined;
    }
    todo.done = !todo.done;
  }

  updateToDo(id, inputs) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      console.log("todo not found.");
      return undefined;
    }
    todo.setDueDate(inputs.dueDate);
    todo.setPriority(inputs.priority);
    todo.setDone(inputs.done);
    todo.setTitle(inputs.title);
    todo.setDescription(inputs.description);
  }

  getName() {
    return this.name;
  }

  setName(newName) {
    this.name = newName;
  }

  getId() {
    return this.id;
  }

  getToDo(id) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      return undefined;
    }
    return todo;
  }
}

export { Project };
