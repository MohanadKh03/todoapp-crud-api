import express from 'express';
import {TaskController} from "../controllers/task.controller"

const taskRouters = express.Router();

taskRouters.get('/', TaskController.getAllTasks);
taskRouters.get('/:userId', TaskController.getTasksByUserId);
taskRouters.post('', TaskController.addNewTask);

export default taskRouters;