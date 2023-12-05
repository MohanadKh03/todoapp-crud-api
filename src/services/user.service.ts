import User, { IUser } from "../models/User";
import { ObjectId } from "mongoose";
import { UserRepository } from "../repositories/user.repository";

export class UserService{

    public static createUser(user: IUser): Promise<IUser>{
        return new Promise((resolve,reject) => {
            UserRepository.createUser(user)
                .then((createdUser: IUser) => {
                    resolve(createdUser)
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }

    public static getAllUsers() : Promise<IUser[]>{
        return new Promise((resolve,reject) => {
            UserRepository.getAllUsers()
                .then((foundUsers) => {
                    resolve(foundUsers)
                })
                .catch((error) => {
                    console.error('Error creating user:', error.message);
                    reject(error);
                });
        })
    }

    public static getUserById(id: string) : Promise<IUser | null>{
        return new Promise((resolve,reject) => {
            UserRepository.getUserById(id)
                .then((user) => {
                    resolve(user ? user : null)
                    console.log("USER GOTTEN IN SERVICE !");
                })
                .catch((error) => {
                    console.error('Error creating user:', error.message);
                    reject(error);
                });
        })
    }

}

// function getAllUsers() : Promise<Array<User>>{
//     return new Promise((resolve,reject) => {
//         setTimeout(() => {
//             resolve(DummyUsers)
//         }, 1000)
//     })
// }

// function getUserById(id: number) : Promise<User>{
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const user = DummyUsers.find((user) => user.id === id);
//             if(user)
//                 resolve(user);
//             else
//                 reject(new Error(`User with id ${id} not found!`))
//         }, 1000);
//         })
// }

// function addNewUser(user: User) : Promise<string>{
//     return new Promise((resolve,reject) => {
//         setTimeout(() => {
//             //TODO handle all the user validations
//             if (!user || DummyUsers.find((dummyUser) => dummyUser.id === user.id) != null) 
//                 reject('Invalid user data');
//             DummyUsers.push(user)
//             resolve("User pushed successfully!")
//         }, 1000);
//     })
// }
// export {getAllUsers,getUserById,addNewUser}