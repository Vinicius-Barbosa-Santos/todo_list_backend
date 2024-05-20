const Router = require('express')

const routes = Router()

const TaskModel = require('../models/task.model')

routes.get('/', async (request, response) => {
    try {
        const tasks = await TaskModel.find({})
        response.status(200).send(tasks)
    } catch (err) {
        response.status(500).send(err)
    }
})

routes.get('/:id', async (request, response) => {
    try {
        const { id } = request.params

        const task = await TaskModel.findById(id)

        if (!task) {
            response.status(404).send('Essa tarefa não foi encontrada!')
        }

        response.status(200).send(task)
    } catch (err) {
        response.status(500).send(err)
    }
})

routes.post('/tasks', async (request, response) => {
    try {
        const newTask = new TaskModel(request.body)

        await newTask.save()

        response.status(201).send(newTask)
    } catch (err) {
        response.status(500).send(err)
    }
})

routes.patch('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const taskData = request.body

        const taskToUpdate = await TaskModel.findById(id)

        const allowedUpdates = ['isCompleted']
        const requestedUpdates = Object.keys(taskData)

        for (update of requestedUpdates) {
            if(allowedUpdates.includes(update)) {
                taskToUpdate[update] = taskData[update]
            } else {
                return response.status(500).send('Um ou mais campos não são editáveis')
            }
        }

        await taskToUpdate.save()
        return response.status(200).send(taskToUpdate)

    } catch (err) {
        response.status(500).send(err)
    }
})

routes.delete('/:id', async (request, response) => {
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

module.exports = routes