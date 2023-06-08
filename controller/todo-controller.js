import {todoStore} from '../services/todo-store.js'

export class TodoController {

    getTodos = async (req, res) => {
        res.json((await todoStore.all() || []))
    };

    createTodo = async (req, res) => {
        res.json(await todoStore.add(req.body.name));
    };

    showTodo = async (req, res) => {
        res.json(await todoStore.get(req.params.id));
    };

    deleteTodo = async (req, res) => {
        res.json(await todoStore.delete(req.params.id)); // TODO should return 402 if not ok
    };
}

export const todoController = new TodoController();
