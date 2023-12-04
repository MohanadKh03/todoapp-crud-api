import express from 'express'
import usersRouter from './routes/user.router'
// import taskRouters from './routes/task.router'
import mongoose, { mongo } from "mongoose";

const app = express()
app.use(express.json())

console.log("HERE ROUTERS")
app.use('/users',usersRouter)
// app.use('/tasks',taskRouters)

const PORT = 1234

const url = 'mongodb://root:password@localhost:27017/?authSource=admin';


mongoose.connect(url).then(() =>{
    console.log("DB connected successfully!")
})

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}!`)
})