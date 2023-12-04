import User from "../models/User"
import { IUser } from "../models/User"


export class UserRepository{
    public static createUser(user: IUser): Promise<IUser> {
        return new Promise((resolve, reject) => {
          User.create(user)
            .then((createdUser) => {
              console.log('User created successfully');
              resolve(createdUser as IUser);
            })
            .catch((error) => {
              console.error('Error creating user: ', error.message);
              reject(error); // Re-throw the error to propagate it to the calling code
            });
        });
      }

    public static getAllUsers(): Promise<IUser[]>{
        return new Promise((resolve, reject) => {
            User.find()
              .then((foundUsers) => {
                console.log('Users retreived successfully');
                resolve(foundUsers as IUser[]);
              })
              .catch((error) => {
                console.error('Error while getting users: ', error.message);
                reject(error); // Re-throw the error to propagate it to the calling code
              });
          });
    }

    public static getUserById(id: Number): Promise<IUser>{
        return new Promise((resolve, reject) => {
            User.findById(id)
              .then((user) => {
                console.log('User retreived successfully');
                resolve(user as IUser);
              })
              .catch((error) => {
                console.error('Error while getting user: ', error.message);
                reject(error); // Re-throw the error to propagate it to the calling code
              });
          });
    }
}
