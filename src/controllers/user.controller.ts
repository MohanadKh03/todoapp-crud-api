import { Request, Response } from "express"
import { UserService } from "../services/user.service"
import { IUser } from "../models/User"
import mongoose,{ ObjectId, isValidObjectId } from "mongoose"
import { ApiResponse } from "../utils/api.response"


export class UserController{
    static async getAllUsers(req: Request,res: Response){
        try{
            const response: ApiResponse = await UserService.getAllUsers()
            res.status(200).json(response)
        }catch(error){
            res.status(500).json({body: null,message: "Error while retreiving users!"})
        }
    }
    static async getUserById(req: Request,res: Response){
        if(!isValidObjectId(req.params.id))
            res.status(400).json({body:null,message: "Id is not valid!"})
        else{
            const id: string = req.params.id 
            try{
                const response: ApiResponse = await UserService.getUserById(id)
                if(response.body)
                    res.status(200).json(response)
                else
                    res.status(404).json({body: null,message: "User not found!"})
            }catch(error){
                res.status(500).json({body: null,message: "Error while retreiving user!"})
            }
            
        }
    }
    static async addNewUser(req: Request,res: Response){
        let user: IUser = req.body
        try{
            let response: ApiResponse = await UserService.createUser(user)
            res.status(200).json(response)
        }catch(error: any) {
            console.log(error);
            if(error.name == "ValidationError"){
                const errors: Record<string, string> = {};
                Object.keys(error.errors).forEach((key) => {
                    errors[key] = error.errors[key].message;
                });
                res.status(400).json({body: errors,message : "Validation Error!"});
            }
            else if (error.code === 11000 || error.code === 11001){
                const duplicateField = Object.keys(error.keyPattern)[0];
                res.status(400).json({body: duplicateField,message: "Field(s) already exists!"});
            }
            else
                res.status(500).json({body: null,message: "Error while creating user!"})
        }
    }
}