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

  addToDo({title, description, dueDate, priority}) {
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
    if (!todo) {
      console.log("todo not found");
      return undefined;
    }
    todo.done = !todo.done;
  }


  updateToDo(id, inputs) {
    const todo = this.todos.find((todo) => todo.id === id);
    if(!todo) {
      console.log("todo not found.");
      return undefined;
    }
    todo.setDueDate(inputs.dueDate);
    todo.setPriority(inputs.priority);
    todo.setTitle(inputs.title);
    todo.setDescription(inputs.description);
  }


  updateToDo2(id) {
    console.log("here you are id: " + id);
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

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
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

export { Project };