import { Request, Response } from "express"
import { getAllUsers,getUserById,addNewUser } from "../services/user.service"
import { User } from "../types/user"

async function getUsersController(req: Request,res: Response){
    try{
        const users = await getAllUsers()
        res.status(200).json(users)
    }
    catch(error: any) {
        res.status(500).json({Message: error.message})
    }
}

async function getUserByIdController (req: Request,res: Response) {
    try{
        const id = parseInt(req.params.id,10)
        const user: User = await getUserById(id)
        res.status(200).json(user)
    }
    catch(error: any) {
        res.status(500).json({Message: error.message})
    }
}

async function addNewUserController (req: Request,res: Response) {
    try{
        const newUser = req.body as User
        const message: string = await addNewUser(newUser)
        res.status(200).json({Message: message})
    }
    catch(error: any){
        res.status(500).json({Message: error.message})
    }
}

export {getUsersController,getUserByIdController,addNewUserController}