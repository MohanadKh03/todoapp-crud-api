import { Request, Response } from "express"
import { UserService } from "../services/user.service"
import { IUser } from "../models/User"


export class UserController{
    static getAllUsers(req: Request,res: Response){
        UserService.getAllUsers()
            .then((users) => {
                res.status(200).json(users)
            })
            .catch((error) => {
                res.status(500).json({"message": "Error message!"})
            })
    }
    static getUserById(req: Request,res: Response){
        let id: Number = parseInt(req.params.id)
        UserService.getUserById(id)
            .then((user) => {
                if(user)
                    res.status(200).json(user)
                res.status(404).json({"message": "User not found!"})
            })
            .catch((error) => {
                res.status(500).json({"message": "Some random error message!"})
            })
    }
    static addNewUser(req: Request,res: Response){
        let user: IUser = req.body
        UserService.createUser(user)
            .then((user) => {
                res.status(200).json(user)
            })
            .catch((error) => {
                if(error.name == "Validation Error"){
                    const errors: Record<string, any> = {};
                    Object.keys(error.errors).forEach((key) => {
                        errors[key] = error.errors[key].message;
                    });
                    res.status(400).send({"message ": errors});
                }
                res.status(500).json({"message": "Some random error!"})
            })
    }
}