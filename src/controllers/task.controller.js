const TaskModel = require('../models/task.model')

const { notFoundError, objectIdCastError } = require('../errors/mongodb.errors');
const { default: mongoose } = require('mongoose');

class TaskController {
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }

    async getAll() {
        try {
            const tasks = await TaskModel.find({})
            this.response.status(200).send(tasks)
        } catch (err) {
            this.response.status(500).send(err)
        }
    }

    async getTasksById() {
        try {
            const { id } = this.request.params

            const task = await TaskModel.findById(id)

            if (!task) return notFoundError(this.response)

            this.response.status(200).send(task)
        } catch (err) {
            if(err instanceof mongoose.Error.CastError) {
                return objectIdCastError(this.response)
            }

            this.response.status(500).send(err)
        }
    }

    async create() {
        try {
            const newTask = new TaskModel(this.request.body)

            await newTask.save()

            this.response.status(201).send(newTask)
        } catch (err) {
            this.response.status(500).send(err)
        }
    }

    async update() {
        try {
            const { id } = this.request.params
            const taskData = this.request.body

            const taskToUpdate = await TaskModel.findById(id)

            if (!taskToUpdate) {
                return notFoundError(this.response)
            }

            const allowedUpdates = ['isCompleted']
            const requestedUpdates = Object.keys(taskData)

            for (const update of requestedUpdates) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = taskData[update]
                } else {
                    return this.response.status(500).send('Um ou mais campos não são editáveis')
                }
            }

            await taskToUpdate.save()
            return this.response.status(200).send(taskToUpdate)

        } catch (err) {
            if(err instanceof mongoose.Error.CastError) {
                return objectIdCastError(this.response)
            }

            this.response.status(500).send(err)
        }
    }

    async delete() {
        try {
            const { id } = this.request.params

            const taskToDelete = await TaskModel.findById(id)

            if (!taskToDelete) {
                return notFoundError(this.response)
            }

            const deletedTask = await TaskModel.findByIdAndDelete(id)

            this.response.status(200).send(deletedTask)
        } catch (err) {
            this.response.status(500).send(err)
        }
    }
}

module.exports = TaskController