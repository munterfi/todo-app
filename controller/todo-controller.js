import {todoStore} from '../services/todo-store.js'

export class TodoController {

    getTodos = async (req, res) => {
        // res.json((await todoStore.all() || []))
        res.render("todo-list", {data: await todoStore.all() || [], dark: true});
    };

    forwardCreate = async (req, res) => {
        res.render("todo-create", {dark: true});
    };

    createTodo = async (req, res) => {
        const dueDate = req.body.date === "" ? new Date() : new Date(req.body.date);
        const todo = await todoStore.add(req.body.title, dueDate, Number(req.body.importance), req.body.description);
        res.redirect("todos/" + todo._id);
    };

    showTodo = async (req, res) => {
        const todo = await todoStore.get(req.params.id);
        res.render("todo-edit", {data: todo, dark: true});
    };

    deleteTodo = async (req, res) => {
        res.json(await todoStore.delete(req.params.id)); // TODO should return 402 if not ok
    };
}

export const todoController = new TodoController();
