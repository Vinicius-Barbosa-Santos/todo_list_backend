const TaskModel = require('../models/task.model')

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

            if (!task) {
                this.response.status(404).send('Essa tarefa não foi encontrada!')
            }

            this.response.status(200).send(task)
        } catch (err) {
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
            this.response.status(500).send(err)
        }
    }

    async delete() {
        try {
            const { id } = this.request.params

            const taskToDelete = await TaskModel.findById(id)

            if (!taskToDelete) {
                return this.response.status(404).send("Essa Tarefa não foi encontrada!")
            }

            const deletedTask = await TaskModel.findByIdAndDelete(id)

            this.response.status(200).send(deletedTask)
        } catch (err) {
            this.response.status(500).send(err)
        }
    }
}

module.exports = TaskController