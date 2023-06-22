import {todoStore} from '../services/todo-store.js'

export class TodoController {

    getTodos = async (req, res) => {
        // res.json((await todoStore.all() || []))
        res.render("todo-list", {data: await todoStore.all() || [], dark: true});
    };

    forwardCreate = async (req, res) => {
        res.render("todo-create", {dark: true});
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
        let todo = null;
        if (req.body.todoId) {
            // existing entry, update
            const todoId = req.body.todoId;
            const updatedFields = {
                title, dueDate, importance, description,
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
        res.render("todo-edit", {data: todo, dark: true});
    };

    deleteTodo = async (req, res) => {
        res.json(await todoStore.delete(req.params.id)); // TODO should return 402 if not ok
    };
}

export const todoController = new TodoController();
