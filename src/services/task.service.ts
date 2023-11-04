import { Task } from "../types/task";
import { DummyTasks } from "../repositories/task.repository";
import { DummyUsers } from "../repositories/user.repository";

function getAllTasks() : Promise<Array<Task>>{
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(DummyTasks)
        }, 1000)
    })
}

function getTasksByUserId(userId: number) : Promise<Array<Task>>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const tasks: Array<Task> = DummyTasks.filter((task) => task.userId === userId);
            resolve(tasks)
        }, 1000);
        })
}

function addNewTask(task: Task) : Promise<string> {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            //TODO handle all the task validations

            if (!task || DummyUsers.find((user) => task.userId === user.id) == null)
                reject('Invalid task data')
            DummyTasks.push(task)
            resolve("Task pushed successfully!")
        }, 1000);
    })
}

export {getAllTasks,getTasksByUserId,addNewTask}