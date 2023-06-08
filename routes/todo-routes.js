import express from 'express';

const router = express.Router();
import {todoController} from '../controller/todo-controller.js';

router.get("/create", todoController.forwardCreate);
router.get("/", todoController.getTodos);
router.post("/", todoController.createTodo);
router.get("/:id/", todoController.showTodo);
router.delete("/:id/", todoController.deleteTodo);

export const todoRoutes = router;
