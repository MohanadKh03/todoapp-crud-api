import express from 'express'
import usersRouter from './routes/user.router'
import taskRouters from './routes/task.router'

const app = express()
app.use(express.json())

app.use('/users',usersRouter)
app.use('/tasks',taskRouters)

const PORT = 1234

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}!`)
})