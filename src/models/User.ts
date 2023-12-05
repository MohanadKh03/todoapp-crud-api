import mongoose, { mongo } from "mongoose";

export interface IUser{
    name: String,
    email: String,
    phoneNumber: String
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,"Name field is required!"],
    },
    email: {
        type: String,
        required:[true,"Email field is required!"],
        unique: [true,"This email already exists!"],
        //TODO : email format
    },
    phoneNumber: {
        type: String,
        required: [true,"Phone Number field is required!"],
        unique: [true,"This phone number already exists!"],
        maxLength: [14,"Phone number cannot exceed 14!"],
    }
});

const User = mongoose.model<IUser>("User",UserSchema)


export default User