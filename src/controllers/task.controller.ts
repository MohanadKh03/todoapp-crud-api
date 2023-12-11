// import { getAllTasks,getTasksByUserId,addNewTask } from "../services/task.service"
// import { Task } from "../types/task";

import { Request, Response } from "express"
import { ITask } from "../models/toDo"
import { TaskService } from "../services/task.service"
import mongoose,{ ObjectId, isValidObjectId } from "mongoose"
import { ApiResponse } from "../utils/api.response"



export class TaskController{
    public static async getAllTasks(req: Request,res: Response){
        let response: ApiResponse = await TaskService.getAllTasks()
        if(response.body)
            res.status(200).json(response)
        else
            res.status(500).json({body:null,message: "Error while retreiving tasks!"})
    }
    public static async getTasksByUserId(req: Request,res: Response){
        let userId: string = req.params.userId
        if(!isValidObjectId(req.params.userId))
            res.status(400).json({body: null,message: "Id is not valid!"})
        else{
            let response: ApiResponse = await TaskService.getTasksByUserId(userId)
            if(response.body)
                res.status(200).json(response)
            else
                res.status(500).json(response)
        }
    }
    public static async addNewTask(req: Request,res: Response){
        let task: ITask = req.body
        try{
            let response: ApiResponse = await TaskService.createTask(task)
            if(response.body)
                res.status(200).json(response)
            else
                res.status(404).json(response)
        }catch(error: any){
            if(error.name == "ValidationError"){
                const errors: Record<string, string> = {};
                Object.keys(error.errors).forEach((key) => {
                    errors[key] = error.errors[key].message;
                });
                res.status(400).json({body: errors , message: "Validation Error!"})
            }
            res.status(500).json({body: null,message: "Error while creating task!"})
        }
    }
}

