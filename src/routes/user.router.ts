import express from 'express';
import {getUsersController,getUserByIdController,addNewUserController}
        from "../controllers/user.controller"

const userRouters = express.Router();

userRouters.get('/', getUsersController);
userRouters.get('/:id', getUserByIdController);
userRouters.post('', addNewUserController);

export default userRouters;