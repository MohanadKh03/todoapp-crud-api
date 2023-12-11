import User, { IUser } from "../models/User";
import { ObjectId } from "mongoose";
import { UserRepository } from "../repositories/user.repository";
import { ApiResponse } from "../utils/api.response";

export class UserService{

    public static async createUser(user: IUser): Promise<ApiResponse>{
        const createdUser = await UserRepository.createUser(user)
        return { body: createdUser , message: "User created successfully!"}
        // return new Promise((resolve,reject) => {
        //     UserRepository.createUser(user)
        //         .then((createdUser: IUser) => {
        //             resolve(createdUser)
        //         })
        //         .catch((error) => {
        //             reject(error);
        //         });
        // })
    }

    public static async getAllUsers() : Promise<ApiResponse>{
        const users = await UserRepository.getAllUsers()
        return { body: users , message: "Users retreived successfully!"}
        // return new Promise((resolve,reject) => {
        //     UserRepository.getAllUsers()
        //         .then((foundUsers) => {
        //             resolve(foundUsers)
        //         })
        //         .catch((error) => {
        //             console.error('Error creating user:', error.message);
        //             reject(error);
        //         });
        // })
    }

    public static async getUserById(id: string) : Promise<ApiResponse>{
        const user: IUser|null = await UserRepository.getUserById(id)
        return {body: user, message: "User retreived successfully!"}
        // return new Promise((resolve,reject) => {
        //     UserRepository.getUserById(id)
        //         .then((user) => {
        //             resolve(user ? user : null)
        //             console.log("USER GOTTEN IN SERVICE !");
        //         })
        //         .catch((error) => {
        //             console.error('Error creating user:', error.message);
        //             reject(error);
        //         });
        // })
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