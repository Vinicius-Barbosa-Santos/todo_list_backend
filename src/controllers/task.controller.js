const AppError = require('../utils/app.errors')
const TaskModel = require('../models/task.model')

class TaskController {
    async create(request, response) {
        try {
            const newTask = await TaskModel(request.body)

            await newTask.save()

            return response.status(201).send(newTask)
        } catch (err) {
            throw new AppError('Erro do Servidor')
        }
    }

    async getAll(request, response) {
        try {
            const getTasks = await TaskModel.find({})

            return response.status(200).send(getTasks)
        } catch (err) {
            throw new AppError('Erro do Servidor')
        }
    }

    async getById(request, response) {
        const { id } = request.params

        const taskById = await TaskModel.findById(id)

        if (!taskById) {
             throw new AppError('Não achou o item!')
        }

        return response.send(taskById)
    }

    async delete(request, response) {
        try {
            const { id } = request.params

            const taskToDelete = await TaskModel.findById(id)

            if (!taskToDelete) {
                 throw new AppError('Não achou o item!')
            }

            const deleteTask = await TaskModel.findByIdAndDelete(taskToDelete)

            return response.status(200).send(deleteTask)
        } catch (err) {
            throw new AppError('Erro do Servidor')
        }
    }

    async update(request, response) {
        try {
            const { id } = request.params
            const taskData = request.body

            const taskToUpdate = await TaskModel.findById(id)

            if (!taskToUpdate) {
                throw new AppError('Erro do Servidor')
            }

            const allowedUpdates = ['isCompleted']
            const requestedUpdates = Object.keys(taskData)

            for (const update of requestedUpdates) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = taskData[update]
                } else {
                    throw new AppError('Um ou mais campos não são editáveis')
                }
            }

            await taskToUpdate.save()
            return response.status(200).send(taskToUpdate)
        } catch (err) {
            throw new AppError('Erro do Servidor')
        }
    }
}

module.exports = TaskController