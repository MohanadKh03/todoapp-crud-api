import { ObjectId } from "mongoose";
import User from "../models/User"
import { IUser } from "../models/User"


export class UserRepository{
    public static async createUser(user: IUser): Promise<IUser> {

        const createdUser: IUser = await User.create(user)
        return createdUser

        // return new Promise((resolve, reject) => {
        //   User.create(user)
        //     .then((createdUser: IUser) => {
        //       console.log('User created successfully');
        //       resolve(createdUser);
        //     })
        //     .catch((error: Error) => {
        //       console.error('Error name: ' , error.name);
        //       console.error('Error creating user: ', error.message);
        //       reject(error); 
        //     });
        // });
      }

     public static async getAllUsers(): Promise<IUser[]>{
        const users: IUser[] = await User.find()
        return users
        // return new Promise((resolve, reject) => {
        //     User.find()
        //       .then((foundUsers) => {
        //         console.log('Users retreived successfully');
        //         resolve(foundUsers as IUser[]);
        //       })
        //       .catch((error) => {
        //         console.error('Error while getting users: ', error.message);
        //         reject(error); // Re-throw the error to propagate it to the calling code
        //       });
        //   });
    }

    public static async getUserById(id: string): Promise<IUser | null>{

        const user: IUser | null = await User.findById(id)
        return user

        // return new Promise((resolve, reject) => {
        //     User.findById(id)
        //       .then((user) => {
        //         console.log('User retreived successfully');
        //         resolve(user as IUser);
        //       })
        //       .catch((error) => {
        //         console.error('Error while getting user: ', error.message);
        //         reject(error); // Re-throw the error to propagate it to the calling code
        //       });
        //   });
    }
}
