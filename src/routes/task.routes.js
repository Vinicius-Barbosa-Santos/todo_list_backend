const Router = require('express')

const taskRoutes = Router()
const TaskController = require('../controllers/task.controller')
const taskController = new TaskController()

taskRoutes.post('/', taskController.create)
taskRoutes.get('/', taskController.getAll)
taskRoutes.get('/:id', taskController.getById)
taskRoutes.patch('/:id', taskController.update)
taskRoutes.delete('/:id', taskController.delete)

module.exports = taskRoutes