const express = require('express')

const dotenv = require('dotenv')
const connectToDatabase = require('./src/database/mongoose.database')

const TaskModel = require('./src/models/task.model')

dotenv.config()
const app = express()

connectToDatabase()

app.get('/tasks', async (request, response) => {

    const tasks = await TaskModel.find({})
    response.status(200).send(tasks)
})

const PORT = 3000

app.listen(3000, () => console.log(`Server is listening on ${PORT}`))