import express from 'express';
import { UserController } from "../controllers/user.controller"

const userRouters = express.Router();

userRouters.post('/', UserController.addNewUser);

userRouters.get('/', UserController.getAllUsers);

userRouters.get('/:id', UserController.getUserById);


export default userRouters;