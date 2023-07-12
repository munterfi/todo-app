import {todoStore} from '../services/todo-store.js'
import {getProgressAndState, sortAndFilterTodos} from '../utils/todo-list-helpers.js'

export class TodoController {

    showTodoList = async (req, res) => {
        const todos = await todoStore.all() || [];
        const {
            orderBy, orderDescending, filterCompleted, darkMode
        } = req.userSettings;
        const sortedAndFilteredTodos = sortAndFilterTodos(todos, orderBy, orderDescending, filterCompleted);
        const {progress, state} = getProgressAndState(todos);
        res.render("todo-list", {
            data: sortedAndFilteredTodos,
            orderBy: orderBy,
            orderDescending: orderDescending,
            filterCompleted: filterCompleted,
            darkMode: darkMode,
            logo: "📝",
            title: "Todos",
            state: state,
            progress: progress,
            version: process.env.npm_package_version
        });
    };

    forwardToCreateTodo = async (req, res) => {
        const todos = await todoStore.all() || [];
        const {progress, state} = getProgressAndState(todos);
        res.render("todo-create", {
            today: new Date().toISOString().split("T")[0],
            darkMode: req.userSettings.darkMode,
            logo: "➕",
            title: "Add Todo",
            state: state,
            progress: progress,
            version: process.env.npm_package_version
        });
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
        const todos = await todoStore.all() || [];
        const {progress, state} = getProgressAndState(todos);
        const todo = await todoStore.get(req.params.id);
        if (!todo) {
            res.status(404).render("404", {
                ressourceId: req.params.id,
                darkMode: req.userSettings.darkMode,
                logo: "❌",
                title: "404 Not Found",
                state: state,
                progress: progress,
                version: process.env.npm_package_version
            });
            return;
        }
        res.render("todo-edit", {
            data: todo,
            date: todo.dueDate.toISOString().split("T")[0],
            importanceIsSet5: Boolean(todo.importance === 5),
            importanceIsSet4: Boolean(todo.importance === 4),
            importanceIsSet3: Boolean(todo.importance === 3),
            importanceIsSet2: Boolean(todo.importance === 2),
            importanceIsSet1: Boolean(todo.importance === 1),
            darkMode: req.userSettings.darkMode,
            logo: "✏️",
            title: "Edit Todo",
            state: state,
            progress: progress,
            version: process.env.npm_package_version
        });
    };

    mapPostToDelete = async (req, res) => {
        await todoStore.delete(req.params.id)
        res.redirect("/todos");
    };

    deleteTodo = async (req, res) => {
        res.json(await todoStore.delete(req.params.id)); // TODO should return 402 if not ok
    };
}

export const todoController = new TodoController();
