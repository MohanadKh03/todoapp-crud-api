// import { Task } from "../types/task";
// import { DummyTasks } from "../repositories/task.repository";
// import { DummyUsers } from "../repositories/user.repository";

import { ITask } from "../models/toDo";
import { IUser } from "../models/User";
import { TaskRepository } from "../repositories/task.repository";
import { ApiResponse } from "../utils/api.response";
import { UserService } from "./user.service";


export class TaskService{

    public static async createTask(task: ITask): Promise<ApiResponse>{
        const user: IUser|null = await (await UserService.getUserById(task.userId)).body
        if(user){
            const createdTask = await TaskRepository.createTask(task)
            return { body: createdTask , message: "Task created successfully!"}
        }
        return {body: null,message: "Cannot assign a task to a non-existing user!"} 
    }

    public static async getAllTasks() : Promise<ApiResponse>{
        try{
            const tasks = await TaskRepository.getAllTasks()
            return { body: tasks, message: "Tasks retreived successfully!"}
        }catch(error: any){
            return {body: null , message: "Error while retreiving tasks!"}
        }
    }

    public static async getTasksByUserId(userId: string) : Promise<ApiResponse>{
        let user : IUser | null = await (await UserService.getUserById(userId)).body
        if(user){
            const tasks = await TaskRepository.getTasksByUserId(userId)
            return { body: tasks , message: "Task created successfully!"}
        }
        return {body: null,message: "Cannot retreive tasks for a non-existing user!"} 
    }

}
