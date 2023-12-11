import Task from "../models/toDo"
import { ITask } from "../models/toDo"

export class TaskRepository{

    public static async createTask(task:ITask): Promise<ITask> {
        const createdTask: ITask = await Task.create(task)
        return createdTask
    }

     public static async getAllTasks(): Promise<ITask[]>{
        const tasks: ITask[] = await Task.find()
        return tasks
    }

    public static async getTasksByUserId(userId: string): Promise<ITask[]>{
        const tasks: ITask[] = await Task.find({userId: userId})
        return tasks
    }
}