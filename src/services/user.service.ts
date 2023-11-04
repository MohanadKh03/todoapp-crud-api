import { User } from "../types/user";
import { DummyUsers } from "../repositories/user.repository";


function getAllUsers() : Promise<Array<User>>{
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(DummyUsers)
        }, 1000)
    })
}

function getUserById(id: number) : Promise<User>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = DummyUsers.find((user) => user.id === id);
            if(user)
                resolve(user);
            else
                reject(new Error(`User with id ${id} not found!`))
        }, 1000);
        })
}

function addNewUser(user: User) : Promise<string>{
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            //TODO handle all the user validations
            if (!user || DummyUsers.find((dummyUser) => dummyUser.id === user.id) != null) 
                reject('Invalid user data');
            DummyUsers.push(user)
            resolve("User pushed successfully!")
        }, 1000);
    })
}
export {getAllUsers,getUserById,addNewUser}