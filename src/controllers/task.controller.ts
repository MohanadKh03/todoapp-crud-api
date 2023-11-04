import { Request, Response } from "express"
import { getAllTasks,getTasksByUserId,addNewTask } from "../services/task.service"
import { Task } from "../types/task";

async function getTasksController (req: Request,res: Response){
    try{
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    }
    catch(error: any) {
        res.status(500).json({Message: error.message});
    }
}

async function getTaskByUserIdController (req: Request,res: Response) {
    try{
        const userId = parseInt(req.params.userId,10)
        const tasks: Array<Task> = await getTasksByUserId(userId)
        res.status(200).json(tasks)
    }
    catch(error: any) {
        res.status(500).json({Message: error.message})
    }
}

async function addNewTaskController (req: Request,res: Response) {
    try{
        const newTask = req.body as Task
        const message: string = await addNewTask(newTask)
        res.status(200).json({Message: message})
    }
    catch(error: any){
        res.status(500).json({Message: error})
    }
}

export {getTasksController,getTaskByUserIdController,addNewTaskController}