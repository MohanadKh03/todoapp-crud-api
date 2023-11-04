import express from 'express';
import {getTasksController,getTaskByUserIdController,addNewTaskController}
        from "../controllers/task.controller"

const taskRouters = express.Router();

taskRouters.get('/', getTasksController);
taskRouters.get('/:userId', getTaskByUserIdController);
taskRouters.post('', addNewTaskController);

export default taskRouters;