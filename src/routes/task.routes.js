const Router = require('express')

const TaskController = require('../controllers/task.controller')

const routes = Router()

routes.get('/', async(request, response) => {
    return new TaskController(request, response).getAll()
})

routes.get('/:id', async (request, response) => {
    return new TaskController(request, response).getTasksById()
})

routes.post('/', async (request, response) => {
    return new TaskController(request, response).create()
})

routes.patch('/:id', async (request, response) => {
    return new TaskController(request, response).update()
})

routes.delete('/:id', async (request, response) => {
    return new TaskController(request, response).delete()
})

module.exports = routes