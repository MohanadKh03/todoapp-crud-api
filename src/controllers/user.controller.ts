import { Request, Response } from "express"
import { UserService } from "../services/user.service"
import { IUser } from "../models/User"
import mongoose,{ ObjectId, isValidObjectId } from "mongoose"


export class UserController{
    static getAllUsers(req: Request,res: Response){
        UserService.getAllUsers()
            .then((users: IUser[]) => {
                res.status(200).json({data: users})
            })
            .catch((error: Error) => {
                res.status(500).json({"message": "Error message!"})
            })
    }
    static getUserById(req: Request,res: Response){
        if(!isValidObjectId(req.params.id))
            res.status(400).json({"message": "Id is not valid!"})
        else{
            const id: string = req.params.id 
            UserService.getUserById(id)
                .then((user: IUser | null) => {                    
                    if(user)
                        res.status(200).json({message: "User retreived successfully!",data:user})
                    else
                        res.status(404).json({"message": "User not found!"})
                })
                .catch((error) => {
                    res.status(500).json({"message": "Some random error message!"})
                })
        }
    }
    static addNewUser(req: Request,res: Response){
        let user: IUser = req.body
        UserService.createUser(user)
            .then((user) => {
                res.status(200).json({message: "Created Successfully!",
                                        data: user})
            })
            .catch((error) => {
                if(error.name == "Validation Error"){
                    const errors: Record<string, string> = {};
                    Object.keys(error.errors).forEach((key) => {
                        errors[key] = error.errors[key].message;
                    });
                    res.status(400).send({"message ": errors});
                }
                else if (error.code === 11000 || error.code === 11001){
                    const duplicateField = Object.keys(error.keyPattern)[0];
                    res.status(400).send({ error: `${duplicateField} already exists!` });
                }
                else
                //condition for all errors ??
                    res.status(500).json({"message": error.message})
            })
    }
}