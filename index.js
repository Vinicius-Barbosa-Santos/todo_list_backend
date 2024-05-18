const express = require('express')

const dotenv = require('dotenv')
const connectToDatabase = require('./src/database/mongoose.database')

const TaskModel = require('./src/models/task.model')

dotenv.config()
const app = express()
app.use(express.json())


connectToDatabase()

app.get('/tasks', async (request, response) => {
    try {
        const tasks = await TaskModel.find({})
        response.status(200).send(tasks)
    } catch (err) {
        response.status(500).send(err)
    }
})

app.get('/tasks/:id', async (request, response) => {
    try {
        const { id } = request.params

        const task = await TaskModel.findById(id)

        if(!task) {
            response.status(404).send('Essa tarefa não foi encontrada!')
        }

        response.status(200).send(task)
    } catch (err) {
        response.status(500).send(err)
    }
})

app.post('/tasks', async (request, response) => {
    try {
        const newTask = new TaskModel(request.body)

        await newTask.save()

        response.status(201).send(newTask)
    } catch (err) {
        response.status(500).send(err)
    }
})

app.delete('/tasks/:id', async (request, response) => {
    try {
        const { id } = request.params

        const taskToDelete = await TaskModel.findById(id)

        if (!taskToDelete) {
            return response.status(404).send("Essa Tarefa não foi encontrada!")
        }

        const deletedTask = await TaskModel.findByIdAndDelete(id)

        response.status(200).send(deletedTask)
    } catch (err) {
        response.status(500).send(err)
    }
})

const PORT = 3000

app.listen(3000, () => console.log(`Server is listening on ${PORT}`))