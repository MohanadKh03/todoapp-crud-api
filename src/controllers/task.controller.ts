// import { getAllTasks,getTasksByUserId,addNewTask } from "../services/task.service"
// import { Task } from "../types/task";

import { Request, Response } from "express"
import { ITask } from "../models/toDo"
import { TaskService } from "../services/task.service"
import mongoose,{ ObjectId, isValidObjectId } from "mongoose"



export class TaskController{
    static getAllTasks(req: Request,res: Response){
        TaskService.getAllTasks()
            .then((tasks: ITask[]) => {
                res.status(200).json({message: "Retreived tasks successfully!" ,data: tasks})
            })
            .catch((error: Error) => {
                res.status(500).json({"message": "Error message!"})
            })
    }
    static getTasksByUserId(req: Request,res: Response){
        if(!isValidObjectId(req.params.userId))
            res.status(400).json({"message": "Id is not valid!"})
        else{
            const id: string = req.params.userId 
            TaskService.getTasksByUserId(id)
                .then((tasks: ITask[] | null) => {                    
                    if(tasks)
                        res.status(200).json({message: "Retreived tasks successfully!",data: tasks})
                    else
                        res.status(404).json({"message": "User does not exist!"})
                })
                .catch((error) => {
                    res.status(500).json({"message": "Some random error message!"})
                })
        }
    }
    static addNewTask(req: Request,res: Response){
        let task: ITask = req.body
        TaskService.createUser(task)
            .then((task) => {
                res.status(200).json({message: "Created Successfully!",
                                        data: task})
            })
            .catch((error) => {
                if(error == null)
                    res.status(404).json({message: "Could not find the user you assigned to this task!"})
                else if(error.name == "Validation Error"){
                    const errors: Record<string, string> = {};
                    Object.keys(error.errors).forEach((key) => {
                        errors[key] = error.errors[key].message;
                    });
                    res.status(400).send({"message ": errors});
                }
                else if (error.code === 11000 || error.code === 11001){
                    const duplicateField = Object.keys(error.keyPattern)[0];
                    res.status(400).send({ error: `${duplicateField} already exists!` });
                }
                else
                //condition for all errors ??
                    res.status(500).json({"message": error.message})
            })
    }
}

// async function getTasksController (req: Request,res: Response){
//     try{
//         const tasks = await getAllTasks();
//         res.status(200).json(tasks);
//     }
//     catch(error: any) {
//         res.status(500).json({Message: error.message});
//     }
// }

// async function getTaskByUserIdController (req: Request,res: Response) {
//     try{
//         const userId = parseInt(req.params.userId,10)
//         const tasks: Array<Task> = await getTasksByUserId(userId)
//         res.status(200).json(tasks)
//     }
//     catch(error: any) {
//         res.status(500).json({Message: error.message})
//     }
// }

// async function addNewTaskController (req: Request,res: Response) {
//     try{
//         const newTask = req.body as Task
//         const message: string = await addNewTask(newTask)
//         res.status(200).json({Message: message})
//     }
//     catch(error: any){
//         res.status(500).json({Message: error})
//     }
// }

// export {getTasksController,getTaskByUserIdController,addNewTaskController}