import express from 'express';

const router = express.Router();
import {todoController} from '../controller/todo-controller.js';

router.get("/create", todoController.forwardToCreateTodo);
router.get("/", todoController.showTodoList);
router.post("/", todoController.createOrUpdateTodo);
router.get("/:id/", todoController.showTodo);
router.post("/:id/", todoController.mapPostToDelete);
router.delete("/:id/", todoController.deleteTodo);

export const todoRoutes = router;
