import {todoStore} from '../services/todo-store.js'

export class TodoController {

    showTodoList = async (req, res) => {
        const todos = await todoStore.all() || [];

        const {
            orderBy,
            orderDescending,
            filterCompleted,
            darkMode
          } = req.userSettings;

        const sortedAndFilteredTodos = sortAndFilterTodos(
        todos,
        orderBy,
        orderDescending,
        filterCompleted
        );
    
        res.render("todo-list", {
        data: sortedAndFilteredTodos,
        filterCompleted: filterCompleted,
        darkMode: darkMode
        });
    };

    forwardToCreateTodo = async (req, res) => {
        res.render("todo-create", {darkMode: req.userSettings.darkMode});
    };

    createOrUpdateTodo = async (req, res) => {
        // check if only overview
        if (req.body.overviewButton) {
            res.redirect("todos");
            return;
        }
        // create or update
        const dueDate = req.body.date === "" ? new Date() : new Date(req.body.date);
        const importance = Number(req.body.importance);
        const description = req.body.description;
        const title = req.body.title;
        const state = req.body.state === 'on' ? 'DONE' : 'OPEN';
        let todo = null;
        if (req.body.todoId) {
            // existing entry, update
            const todoId = req.body.todoId;
            const updatedFields = {
                title, dueDate, importance, description, state
            };
            todo = await todoStore.update(todoId, updatedFields);
        } else {
            // create new entry
            todo = await todoStore.add(title, dueDate, importance, description);
        }
        // check if action and overview
        if (req.body.createAndOverviewButton || req.body.updateAndOverviewButton) {
            res.redirect("todos");
            return;
        }
        // stay on page
        res.redirect("todos/" + todo._id);
    }

    showTodo = async (req, res) => {
        const todo = await todoStore.get(req.params.id);
        if (!todo) {
          res.status(404).render("404", {ressourceId: req.params.id, darkMode: req.userSettings.darkMode});
          return;
        }
        res.render("todo-edit", {data: todo, darkMode: req.userSettings.darkMode});
    };

    mapPostToDelete = async (req, res) => {
      await todoStore.delete(req.params.id)
      res.redirect("/todos");
    };

    deleteTodo = async (req, res) => {
        res.json(await todoStore.delete(req.params.id)); // TODO should return 402 if not ok
    };
}

const sortAndFilterTodos = (todos, orderBy, descending, filterCompleted) => {
    todos = todos.filter((todo) => todo.state !== "DELETED");

    if (filterCompleted) {
      todos = todos.filter((todo) => todo.state === "OPEN");
    }
  
    switch (orderBy) {
      case "title":
        todos.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "dueDate":
        todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        break;
      case "createdDate":
        todos.sort((a, b) => a.createdDate - b.createdDate);
        break;
      case "importance":
        todos.sort((a, b) => b.importance - a.importance);
        break;
      default:
        break;
    }
  
    if (descending) {
      todos.reverse();
    }
  
    return todos;
  };

export const todoController = new TodoController();
