import mongoose , {mongo}from "mongoose";

export interface ITask{
    title: string,
    description: string,
    userId: string
}

const toDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,"title field is required!"],
        maxLength: [50,"Length cannot exceed 50!"]
    },
    description: {
        type: String,
        maxLength: [200,"description cannot exceed 200 letters!"]
    },
    userId: mongoose.Schema.Types.ObjectId
})

const Task = mongoose.model<ITask>("Task",toDoSchema)

export default Task