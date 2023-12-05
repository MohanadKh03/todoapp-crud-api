// import { Task } from "../types/task";
// import { DummyTasks } from "../repositories/task.repository";
// import { DummyUsers } from "../repositories/user.repository";

import { ITask } from "../models/toDo";
import { TaskRepository } from "../repositories/task.repository";
import { UserService } from "./user.service";


export class TaskService{

    public static createUser(task: ITask): Promise<ITask | null>{
        return new Promise((resolve,reject) => {
            UserService.getUserById(task.userId)
                .then((user) => {
                    if(!user)
                        reject(null)
                    else{
                        TaskRepository.createTask(task)
                        .then((createdUser: ITask) => {
                            resolve(createdUser)
                        })
                        .catch((error) => {
                            reject(error);
                        });
                    }
                })
                .catch((error) => {
                    reject(error)
                })
            
        })
    }

    public static getAllTasks() : Promise<ITask[]>{
        return new Promise((resolve,reject) => {
            TaskRepository.getAllTasks()
                .then((foundTasks) => {
                    resolve(foundTasks)
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }

    public static getTasksByUserId(userId: string) : Promise<ITask[] | null>{
        return new Promise((resolve,reject) => {
            UserService.getUserById(userId)
                .then((user) => {
                    if(!user)
                        resolve(null)
                    TaskRepository.getTasksByUserId(userId)
                    .then((tasks) => {
                        resolve(tasks)
                    })
                    .catch((error) => {
                        console.error('Error creating user:', error.message);
                        reject(error);
                    });
                })
                .catch((error) => {
                    console.error('Error creating user:', error.message);
                    reject(error);
                })
            
        })
    }

}

// function getAllTasks() : Promise<Array<Task>>{
//     return new Promise((resolve,reject) => {
//         setTimeout(() => {
//             resolve(DummyTasks)
//         }, 1000)
//     })
// }

// function getTasksByUserId(userId: number) : Promise<Array<Task>>{
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const tasks: Array<Task> = DummyTasks.filter((task) => task.userId === userId);
//             resolve(tasks)
//         }, 1000);
//         })
// }

// function addNewTask(task: Task) : Promise<string> {
//     return new Promise((resolve,reject) => {
//         setTimeout(() => {
//             //TODO handle all the task validations

//             if (!task || DummyUsers.find((user) => task.userId === user.id) == null)
//                 reject('Invalid task data')
//             DummyTasks.push(task)
//             resolve("Task pushed successfully!")
//         }, 1000);
//     })
// }

// export {getAllTasks,getTasksByUserId,addNewTask}