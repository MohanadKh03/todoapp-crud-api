import Task from "../models/toDo"
import { ITask } from "../models/toDo"
// export const DummyTasks = [
//     {
//         id : 1,
//         title: "task 1 dummy title",
//         description: "task 1 dummy description",
//         userId: 1
//     },
//     {
//         id : 2,
//         title: "task 2 dummy title",
//         description: "task 2 dummy description",
//         userId: 1
//     },
//     {
//         id : 3,
//         title: "task 3 dummy title",
//         description: "task 3 dummy description",
//         userId: 2
//     },
//     {
//         id : 4,
//         title: "task 3 dummy title",
//         description: "task 3 dummy description",
//         userId: 2
//     }
// ]
export class TaskRepository{
    public static createTask(task: ITask): Promise<ITask> {
        return new Promise((resolve, reject) => {
          Task.create(task)
            .then((createdTask: ITask) => {
              console.log('Task created successfully');
              resolve(createdTask);
            })
            .catch((error: Error) => {
              console.error('Error name: ' , error.name);
              console.error('Error creating task: ', error.message);
              reject(error); 
            });
        });
      }

     public static getAllTasks(): Promise<ITask[]>{
        return new Promise((resolve, reject) => {
            Task.find()
              .then((foundTasks) => {
                console.log('Users retreived successfully');
                resolve(foundTasks as ITask[]);
              })
              .catch((error) => {
                console.error('Error while getting users: ', error.message);
                reject(error); // Re-throw the error to propagate it to the calling code
              });
          });
    }

    public static getTasksByUserId(userId: string): Promise<ITask[]>{
        return new Promise((resolve, reject) => {
            Task.find({userId : userId})
              .then((tasks) => {
                console.log('Tasks retreived successfully');
                resolve(tasks as ITask[]);
              })
              .catch((error) => {
                console.error('Error while getting user: ', error.message);
                reject(error); // Re-throw the error to propagate it to the calling code
              });
          });
    }
}