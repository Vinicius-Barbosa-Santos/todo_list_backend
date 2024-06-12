const Router = require('express')

const routes = Router()
const taskRoutes = require('./task.routes')

routes.use('/tasks', taskRoutes)

module.exports = routes